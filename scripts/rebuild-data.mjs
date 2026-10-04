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

const FEATURED_CODES = ["SA", "US", "CN", "DE", "IN", "JP", "GB", "AE", "FR", "KR", "BR", "CA", "AU", "ZA", "TR", "ID", "MX"];

const EXTRA_ALIASES = {
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
  BO: { aliases: ["bolivia"] },
  BN: { aliases: ["brunei"] },
  CD: { aliases: ["dr congo", "democratic republic of the congo"] },
  CG: { aliases: ["republic of the congo", "congo brazzaville"] },
  CI: { aliases: ["ivory coast", "cote d'ivoire"] },
  CV: { aliases: ["cape verde"] },
  CZ: { aliases: ["czech republic"] },
  FM: { aliases: ["micronesia"] },
  LA: { aliases: ["laos"] },
  MD: { aliases: ["moldova"] },
  MM: { aliases: ["burma"] },
  MK: { aliases: ["north macedonia", "macedonia"] },
  PS: { aliases: ["palestine", "palestinian territories"] },
  RU: { aliases: ["russia"] },
  SZ: { aliases: ["eswatini", "swaziland"] },
  SY: { aliases: ["syria"] },
  TL: { aliases: ["east timor", "timor leste"] },
  TZ: { aliases: ["tanzania"] },
  VE: { aliases: ["venezuela"] },
  VN: { aliases: ["vietnam"] },
};

const INDICATOR_IDS = prev.indicators.map((i) => i.id);
const INDICATORS = prev.indicators.map((indicator) => {
  if (indicator.id === "FR.INR.RINR") {
    return { ...indicator, plain: "A lending rate after inflation, where the World Bank publishes a latest observation." };
  }
  return indicator;
});
const HISTORY_IDS = ["NY.GDP.MKTP.KD.ZG", "FP.CPI.TOTL.ZG"];
const WORLD_BANK_SOURCE_KEY = "worldBankWdi";
const IMF_WEO_SOURCE_KEY = "imfWEO";
const IMF_WEO_FALLBACKS = {
  "FP.CPI.TOTL.ZG": "PCPIPCH",
  "BN.CAB.XOKA.GD.ZS": "BCA_NGDPD",
};
let ISO3_TO_ISO2 = {};

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

async function fetchJsonStandard(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  const body = await response.text();
  let json = null;
  try { json = JSON.parse(body); } catch { /* caller validates the response shape */ }
  return { status: response.status, body, json };
}

async function mapLimit(items, limit, mapper) {
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

async function wbCountryIndicator(codes, indicatorId, { mrv, mrnev, perPage = 200 } = {}) {
  const recent = mrnev != null ? `mrnev=${mrnev}` : `mrv=${mrv == null ? 1 : mrv}`;
  const url = `https://api.worldbank.org/v2/country/all/indicator/${indicatorId}?format=json&${recent}&per_page=${perPage}`;
  const res = await fetchJsonStandard(url);
  if (res.status !== 200 || !Array.isArray(res.json) || !res.json[1]) {
    throw new Error(`WB fail ${indicatorId} ${res.status} ${url} ${String(res.body).slice(0, 200)}`);
  }
  const allowed = new Set(codes);
  return res.json[1].filter((row) => allowed.has(iso2FromRow(row)));
}

function iso2FromRow(row) {
  // World Bank country.id is ISO2 for countries
  const id = row.country && row.country.id;
  if (id && id.length === 2) return id.toUpperCase();
  return ISO3_TO_ISO2[row.countryiso3code] || null;
}

async function worldBankCountries() {
  const url = "https://api.worldbank.org/v2/country?format=json&per_page=400";
  const res = await fetchJsonStandard(url);
  if (res.status !== 200 || !Array.isArray(res.json) || !Array.isArray(res.json[1])) {
    throw new Error(`World Bank country list failed ${res.status}`);
  }
  const rows = res.json[1].filter((row) => {
    return row.region && row.region.id !== "NA" && row.iso2Code && row.iso2Code.length === 2;
  });
  return rows.map((row) => {
    const code = row.iso2Code.toUpperCase();
    const configured = EXTRA_ALIASES[code];
    const aliases = configured ? configured.aliases : [];
    return {
      code,
      iso3: row.id,
      name: row.name.trim(),
      aliases,
      region: row.region.value.trim(),
      incomeLevel: row.incomeLevel && row.incomeLevel.value !== "Not classified" ? row.incomeLevel.value.trim() : null,
      capitalCity: row.capitalCity ? row.capitalCity.trim() : null,
    };
  }).sort((a, b) => a.name.localeCompare(b.name, "en"));
}

async function main() {
  const countries = await worldBankCountries();
  const ALL_CODES = countries.map((country) => country.code);
  ISO3_TO_ISO2 = Object.fromEntries(countries.map((country) => [country.iso3, country.code]));
  const report = {
    countryCount: countries.length,
    missingAllValues: [],
    fallbackCounts: {},
    fxDate: null,
    sar: false,
    calendarRefreshed: false,
  };

  // --- Snapshot series ---
  const series = {};
  for (const id of INDICATOR_IDS) {
    series[id] = {};
    for (const code of ALL_CODES) series[id][code] = null; // placeholder
  }

  await mapLimit(INDICATOR_IDS, 3, async (id) => {
    process.stderr.write(`snapshot ${id}\n`);
    const rows = await wbCountryIndicator(ALL_CODES, id, { mrnev: 1, perPage: 1000 });
    for (const row of rows) {
      const code = iso2FromRow(row);
      if (!code || !ALL_CODES.includes(code)) continue;
      const year = String(row.date);
      const value = row.value == null ? null : String(row.value);
      const existing = series[id][code];
      if (existing && existing.value != null && Number(existing.date) >= Number(year)) continue;
      series[id][code] = {
        date: year,
        value,
        sourceKey: value == null ? null : WORLD_BANK_SOURCE_KEY,
        sourceSeries: id,
        status: value == null ? "unavailable" : "source-observation",
        checkedSourceKeys: [WORLD_BANK_SOURCE_KEY],
      };
    }
    for (const code of ALL_CODES) {
      if (!series[id][code]) {
        series[id][code] = {
          date: null,
          value: null,
          sourceKey: null,
          sourceSeries: id,
          status: "unavailable",
          checkedSourceKeys: [WORLD_BANK_SOURCE_KEY],
        };
      }
    }
    await sleep(120);
  });

  // Fill only definition-compatible gaps from the IMF World Economic Outlook.
  // WEO values are conservatively labelled as estimates and never replace a WDI value.
  const fallbackMaxYear = new Date().getUTCFullYear() - 1;
  let imfWeoRelease = null;
  await mapLimit(Object.entries(IMF_WEO_FALLBACKS), 2, async ([indicatorId, imfSeries]) => {
    process.stderr.write(`fallback ${indicatorId} <- IMF ${imfSeries}\n`);
    const url = `https://www.imf.org/external/datamapper/api/v2/${imfSeries}`;
    const res = await fetchJsonStandard(url);
    const values = res.json && res.json.values && res.json.values[imfSeries];
    const metadata = res.json && res.json.indicators && res.json.indicators[imfSeries];
    if (res.status !== 200 || !values || !metadata) {
      throw new Error(`IMF WEO fail ${imfSeries} ${res.status} ${url}`);
    }
    imfWeoRelease = imfWeoRelease || metadata.source || "World Economic Outlook";
    let filled = 0;
    for (const country of countries) {
      const observation = series[indicatorId][country.code];
      if (observation.value != null) continue;
      observation.checkedSourceKeys = [...new Set([...(observation.checkedSourceKeys || []), IMF_WEO_SOURCE_KEY])];
      const byYear = values[country.iso3] || {};
      const years = Object.keys(byYear)
        .filter((year) => Number(year) <= fallbackMaxYear && byYear[year] != null && Number.isFinite(Number(byYear[year])))
        .sort((a, b) => Number(b) - Number(a));
      if (!years.length) continue;
      const year = years[0];
      series[indicatorId][country.code] = {
        date: year,
        value: String(byYear[year]),
        sourceKey: IMF_WEO_SOURCE_KEY,
        sourceSeries: imfSeries,
        status: "estimate",
        checkedSourceKeys: observation.checkedSourceKeys,
      };
      filled += 1;
    }
    report.fallbackCounts[indicatorId] = { source: IMF_WEO_SOURCE_KEY, series: imfSeries, filled };
  });

  // Keep every individual country/economy in the World Bank directory, including those with no values.
  for (const code of ALL_CODES) {
    const hasAnyValue = INDICATOR_IDS.some((id) => series[id][code] && series[id][code].value != null);
    if (!hasAnyValue) report.missingAllValues.push(code);
  }

  const keptCodes = ALL_CODES;

  // --- History ---
  const history = {};
  await mapLimit(HISTORY_IDS, 2, async (id) => {
    history[id] = {};
    process.stderr.write(`history ${id}\n`);
    // mrv=20 to have spare nulls; we keep up to 15 non-null years
    const rows = await wbCountryIndicator(keptCodes, id, { mrv: 20, perPage: 10000 });
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
  });

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
    featuredCountryCodes: FEATURED_CODES.filter((code) => keptCodes.includes(code)),
    categories: prev.categories,
    indicators: INDICATORS,
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
    sourceCatalog: {
      [WORLD_BANK_SOURCE_KEY]: {
        publisher: "World Bank",
        dataset: "World Development Indicators",
        label: "World Bank WDI",
        url: "https://api.worldbank.org/v2",
        termsUrl: "https://www.worldbank.org/en/about/legal/terms-of-use-for-datasets",
        updateCadence: "Varies by indicator and reporting economy",
        geography: "217 individual countries and economies; aggregate regions and income groups excluded",
        units: "Indicator-specific",
        missingBehavior: "The build requests mrnev=1, the most recent non-empty World Bank observation; an absent result remains unavailable.",
        retrievedAt: builtAt,
      },
      [IMF_WEO_SOURCE_KEY]: {
        publisher: "International Monetary Fund",
        dataset: imfWeoRelease || "World Economic Outlook",
        label: "IMF WEO",
        url: "https://www.imf.org/external/datamapper/api/",
        termsUrl: "https://www.imf.org/en/about/copyright-and-terms",
        updateCadence: "Twice yearly, normally April and September/October",
        geography: "IMF WEO countries and economies; availability varies by indicator",
        units: "Indicator-specific; only same-unit percentage fallbacks are enabled",
        missingBehavior: "The newest numeric value no later than the prior calendar year is used only when WDI has no non-empty observation.",
        retrievedAt: builtAt,
      },
    },
    fallbackPolicy: {
      maxImfYear: fallbackMaxYear,
      mappings: Object.entries(IMF_WEO_FALLBACKS).map(([indicatorId, sourceSeries]) => ({
        indicatorId,
        sourceKey: IMF_WEO_SOURCE_KEY,
        sourceSeries,
        status: "estimate",
        rule: "Use only when World Bank mrnev=1 returns no numeric observation.",
      })),
    },
    sources: {
      countryList: "World Bank Countries API v2 (individual countries/economies; aggregate regions and income groups excluded)",
      worldBank: "World Bank World Development Indicators API v2 (format=json, mrnev=1 for snapshot; history for GDP growth and inflation)",
      imfWEO: `${imfWeoRelease || "World Economic Outlook"} via IMF DataMapper API v2; enabled only for definition-compatible missing values and labelled as estimates`,
      fx: "Frankfurter / European Central Bank reference rates",
      calendar: "Forex Factory weekly JSON (nfs.faireconomy.media), snapshot only",
    },
  };

  const out = `/* Embedded at build time from named public APIs. Source observations and IMF WEO estimates are labelled separately. */\nwindow.AF = ${JSON.stringify(AF, null, 2)};\n`;
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
