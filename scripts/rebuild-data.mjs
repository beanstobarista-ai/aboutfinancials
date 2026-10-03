import fs from "fs";
import https from "https";
import http from "http";
import os from "os";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OLD = fs.readFileSync(`${ROOT}/js/data.js`, "utf8");
const context = vm.createContext({ window: {} });
vm.runInContext(OLD, context, { filename: `${ROOT}/js/data.js`, timeout: 5000 });
const { window } = context;
const prev = window.AF;
const REPORT_DIR = path.join(os.tmpdir(), "aboutfinancials-fetch");
fs.mkdirSync(REPORT_DIR, { recursive: true });

const EXISTING = ["SA", "US", "CN", "DE", "IN", "JP", "GB"];
const ADD = ["AE", "FR", "KR", "BR", "CA", "AU", "ZA", "TR", "ID", "MX"];
const ALL_CODES = [...EXISTING, ...ADD];

const META = {
  SA: { name: "Saudi Arabia", aliases: ["saudi", "ksa", "riyadh"] },
  US: { name: "United States", aliases: ["usa", "america", "united states"] },
  CN: { name: "China", aliases: ["china", "chinese"] },
  DE: { name: "Germany", aliases: ["germany", "german"] },
  IN: { name: "India", aliases: ["india"] },
  JP: { name: "Japan", aliases: ["japan"] },
  GB: { name: "United Kingdom", aliases: ["uk", "britain", "united kingdom"] },
  AE: { name: "United Arab Emirates", aliases: ["uae", "emirates", "dubai", "abu dhabi"] },
  FR: { name: "France", aliases: ["france", "french"] },
  KR: { name: "South Korea", aliases: ["korea", "south korea", "republic of korea"] },
  BR: { name: "Brazil", aliases: ["brazil", "brasil"] },
  CA: { name: "Canada", aliases: ["canada"] },
  AU: { name: "Australia", aliases: ["australia"] },
  ZA: { name: "South Africa", aliases: ["south africa"] },
  TR: { name: "Türkiye", aliases: ["turkey", "turkiye", "türkiye"] },
  ID: { name: "Indonesia", aliases: ["indonesia"] },
  MX: { name: "Mexico", aliases: ["mexico"] },
};

const INDICATOR_IDS = prev.indicators.map((i) => i.id);
const HISTORY_IDS = ["NY.GDP.MKTP.KD.ZG", "FP.CPI.TOTL.ZG"];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(url, { headers: { "User-Agent": "AboutFinancialsLocal/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = new URL(res.headers.location, url).href;
        res.resume();
        return resolve(fetchJson(next));
      }
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        resolve({ status: res.statusCode, body, json: (() => { try { return JSON.parse(body); } catch { return null; } })() });
      });
    });
    req.on("error", reject);
    req.setTimeout(60000, () => { req.destroy(new Error("timeout " + url)); });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function wbCountryIndicator(codes, indicatorId, { mrv = 1, perPage = 200 } = {}) {
  const joined = codes.join(";");
  const url = `https://api.worldbank.org/v2/country/${joined}/indicator/${indicatorId}?format=json&mrv=${mrv}&per_page=${perPage}`;
  const res = await fetchJson(url);
  if (res.status !== 200 || !Array.isArray(res.json) || !res.json[1]) {
    throw new Error(`WB fail ${indicatorId} ${res.status} ${String(res.body).slice(0, 200)}`);
  }
  return res.json[1];
}

function iso2FromRow(row) {
  // World Bank country.id is ISO2 for countries
  const id = row.country && row.country.id;
  if (id && id.length === 2) return id.toUpperCase();
  // fallback via iso3
  const map3 = {
    SAU: "SA", USA: "US", CHN: "CN", DEU: "DE", IND: "IN", JPN: "JP", GBR: "GB",
    ARE: "AE", FRA: "FR", KOR: "KR", BRA: "BR", CAN: "CA", AUS: "AU", ZAF: "ZA",
    TUR: "TR", IDN: "ID", MEX: "MX",
  };
  return map3[row.countryiso3code] || null;
}

async function main() {
  const report = { added: [], failed: [], kept: [...EXISTING], fxDate: null, sar: false, calendarRefreshed: false };

  // --- Snapshot series ---
  const series = {};
  for (const id of INDICATOR_IDS) {
    series[id] = {};
    for (const code of ALL_CODES) series[id][code] = null; // placeholder
  }

  for (const id of INDICATOR_IDS) {
    process.stderr.write(`snapshot ${id}\n`);
    const rows = await wbCountryIndicator(ALL_CODES, id, { mrv: 1, perPage: 100 });
    const seen = new Set();
    for (const row of rows) {
      const code = iso2FromRow(row);
      if (!code || !ALL_CODES.includes(code)) continue;
      seen.add(code);
      // value may be null; still store year
      const year = String(row.date);
      const value = row.value == null ? null : String(row.value);
      series[id][code] = { date: year, value };
    }
    for (const code of ALL_CODES) {
      if (!series[id][code]) {
        // No row at all — store null observation without inventing a year
        series[id][code] = { date: null, value: null };
      }
    }
    await sleep(120);
  }

  // Decide which new countries to keep: World Bank returned at least one non-null across the indicator set, OR returned any row with a year
  const countries = [];
  for (const code of ALL_CODES) {
    const hasAnyRow = INDICATOR_IDS.some((id) => series[id][code] && series[id][code].date != null);
    const hasAnyValue = INDICATOR_IDS.some((id) => series[id][code] && series[id][code].value != null);
    if (EXISTING.includes(code)) {
      countries.push({ code, name: META[code].name, aliases: META[code].aliases });
      continue;
    }
    if (hasAnyRow || hasAnyValue) {
      countries.push({ code, name: META[code].name, aliases: META[code].aliases });
      report.added.push(code + (hasAnyValue ? "" : " (rows but all null)"));
    } else {
      report.failed.push(code);
      // strip from series
      for (const id of INDICATOR_IDS) delete series[id][code];
    }
  }

  const keptCodes = countries.map((c) => c.code);

  // --- History ---
  const history = {};
  for (const id of HISTORY_IDS) {
    history[id] = {};
    process.stderr.write(`history ${id}\n`);
    // mrv=20 to have spare nulls; we keep up to 15 non-null years
    const rows = await wbCountryIndicator(keptCodes, id, { mrv: 20, perPage: 500 });
    const byCode = {};
    for (const code of keptCodes) byCode[code] = [];
    for (const row of rows) {
      const code = iso2FromRow(row);
      if (!code || !byCode[code]) continue;
      if (row.value == null) continue;
      byCode[code].push({ year: String(row.date), value: String(row.value) });
    }
    for (const code of keptCodes) {
      // API returns newest first typically; sort ascending by year for charts
      const pts = byCode[code]
        .sort((a, b) => Number(a.year) - Number(b.year));
      // Keep the last 15 available (newest) after sort
      history[id][code] = pts.slice(-15);
    }
    await sleep(150);
  }

  // --- FX ---
  process.stderr.write("fx\n");
  const fxRes = await fetchJson("https://api.frankfurter.app/latest?from=USD");
  if (fxRes.status !== 200 || !fxRes.json || !fxRes.json.rates) {
    throw new Error("FX fetch failed " + fxRes.status);
  }
  const currRes = await fetchJson("https://api.frankfurter.app/currencies");
  const names = currRes.json || {};
  const majors = ["EUR", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"];
  const rates = {};
  for (const [code, value] of Object.entries(fxRes.json.rates)) {
    rates[code] = {
      value: String(value),
      name: names[code] || (prev.fx.rates[code] && prev.fx.rates[code].name) || code,
      group: majors.includes(code) ? "major" : "other",
    };
  }
  const sarRes = await fetchJson("https://api.frankfurter.app/latest?from=USD&to=SAR");
  report.sar = sarRes.status === 200 && sarRes.json && sarRes.json.rates && sarRes.json.rates.SAR;
  if (report.sar) {
    rates.SAR = {
      value: String(sarRes.json.rates.SAR),
      name: names.SAR || "Saudi riyal",
      group: "other",
    };
  }
  report.fxDate = fxRes.json.date;

  // --- Calendar (optional refresh) ---
  let calendar = prev.calendar;
  try {
    process.stderr.write("calendar\n");
    const calRes = await fetchJson("https://nfs.faireconomy.media/ff_calendar_thisweek.json");
    if (calRes.status === 200 && Array.isArray(calRes.json) && calRes.json.length) {
      const events = calRes.json.map((e) => ({
        title: e.title || "",
        currency: e.country || e.currency || "",
        date: e.date,
        impact: e.impact || "",
        forecast: e.forecast == null ? "" : String(e.forecast),
        previous: e.previous == null ? "" : String(e.previous),
      }));
      const days = [...new Set(events.map((e) => String(e.date).slice(0, 10)))].sort();
      calendar = {
        source: "Forex Factory public weekly calendar",
        url: "https://nfs.faireconomy.media/ff_calendar_thisweek.json",
        hasActual: false,
        sourceWeek: [days[0], days[days.length - 1]],
        events,
      };
      report.calendarRefreshed = true;
    }
  } catch (err) {
    process.stderr.write("calendar refresh failed: " + err.message + "\n");
  }

  // Built timestamps in Asia/Riyadh
  const now = new Date();
  const builtAt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hourCycle: "h23",
  }).format(now).replace(", ", "T") + "+03:00";
  // nicer label
  const labelParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Riyadh",
    hour: "numeric", minute: "2-digit", hourCycle: "h12",
    day: "numeric", month: "long", year: "numeric",
  }).formatToParts(now);
  const get = (t) => labelParts.find((p) => p.type === t)?.value;
  const builtAtLabel = `${get("hour")}:${get("minute")} ${get("dayPeriod")} on ${get("day")} ${get("month")} ${get("year")}`;

  // Prune series to kept codes only
  for (const id of INDICATOR_IDS) {
    const slim = {};
    for (const code of keptCodes) slim[code] = series[id][code];
    series[id] = slim;
  }

  const AF = {
    builtAt,
    builtAtLabel,
    countries,
    categories: prev.categories,
    indicators: prev.indicators,
    series,
    history,
    fx: {
      source: "Frankfurter API, European Central Bank reference rates",
      url: "https://api.frankfurter.app/latest?from=USD",
      base: "USD",
      amount: "1.0",
      date: fxRes.json.date,
      sarIncluded: !!report.sar,
      majors,
      rates,
    },
    calendar,
    sources: {
      worldBank: "World Bank World Development Indicators API v2 (format=json, mrv=1 for snapshot; history for GDP growth and inflation)",
      fx: "Frankfurter / European Central Bank reference rates",
      calendar: "Forex Factory weekly JSON (nfs.faireconomy.media), snapshot only",
    },
  };

  const out = `/* Embedded at build time from public APIs. Figures are copied from those responses, not estimated. */\nwindow.AF = ${JSON.stringify(AF, null, 2)};\n`;
  fs.writeFileSync(`${ROOT}/js/data.js`, out);
  fs.writeFileSync(path.join(REPORT_DIR, "report.json"), JSON.stringify(report, null, 2));

  // Quick counts for SA/US history
  const histCounts = {
    SA_gdp: AF.history["NY.GDP.MKTP.KD.ZG"].SA.length,
    SA_cpi: AF.history["FP.CPI.TOTL.ZG"].SA.length,
    US_gdp: AF.history["NY.GDP.MKTP.KD.ZG"].US.length,
    US_cpi: AF.history["FP.CPI.TOTL.ZG"].US.length,
  };
  fs.writeFileSync(path.join(REPORT_DIR, "hist.json"), JSON.stringify(histCounts, null, 2));
  console.log(JSON.stringify({ report, histCounts, countryCount: countries.length }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
