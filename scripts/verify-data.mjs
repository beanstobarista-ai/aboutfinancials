import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "js", "data.js");
const WORLD_BANK_ROOT = "https://api.worldbank.org/v2";
const CALENDAR_URL = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";

function loadData() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(DATA_FILE, "utf8"), context, {
    filename: DATA_FILE,
    timeout: 5_000,
  });
  if (!context.window.AF) throw new Error("js/data.js did not define window.AF");
  return context.window.AF;
}

async function fetchJson(url, attempt = 0) {
  let response;
  try {
    response = await fetch(url, {
      headers: { "User-Agent": "AboutFinancialsVerifier/1.0" },
      signal: AbortSignal.timeout(180_000),
    });
  } catch (error) {
    throw new Error(`Request failed for ${url}: ${error.message}`, { cause: error });
  }
  if ((response.status === 429 || response.status >= 500) && attempt < 3) {
    const retryAfter = Number(response.headers.get("retry-after"));
    const delay = Number.isFinite(retryAfter) && retryAfter > 0
      ? Math.min(retryAfter * 1000, 10_000)
      : 1000 * (attempt + 1);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchJson(url, attempt + 1);
  }
  const body = await response.text();
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    throw new Error(`${url} returned non-JSON content (${response.status})`);
  }
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return json;
}

function iso2(row) {
  const id = row?.country?.id;
  return typeof id === "string" && id.length === 2 ? id.toUpperCase() : null;
}

function sameValue(a, b) {
  if (a == null || b == null) return a == null && b == null;
  return String(a) === String(b);
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

async function worldBankRows(codes, indicatorId, query) {
  const url = `${WORLD_BANK_ROOT}/country/all/indicator/${indicatorId}?format=json&${query}`;
  const payload = await fetchJson(url);
  if (!Array.isArray(payload) || !Array.isArray(payload[1])) {
    throw new Error(`Unexpected World Bank response for ${indicatorId}`);
  }
  const allowed = new Set(codes);
  return payload[1].filter((row) => allowed.has(iso2(row)));
}

function eventKey(event) {
  return JSON.stringify({
    title: event.title || "",
    currency: event.country || event.currency || "",
    date: event.date || "",
    impact: event.impact || "",
    forecast: event.forecast == null ? "" : String(event.forecast),
    previous: event.previous == null ? "" : String(event.previous),
  });
}

function checkShape(AF, failures) {
  const codes = AF.countries.map((country) => country.code);
  const uniqueCodes = new Set(codes);
  if (uniqueCodes.size !== codes.length) failures.push("Duplicate country codes in AF.countries");
  if (!AF.builtAt || Number.isNaN(Date.parse(AF.builtAt))) failures.push("Invalid or missing AF.builtAt");

  for (const indicator of AF.indicators) {
    const records = AF.series[indicator.id];
    if (!records) {
      failures.push(`Missing series object for ${indicator.id}`);
      continue;
    }
    for (const code of codes) {
      const observation = records[code];
      if (!observation || !("date" in observation) || !("value" in observation)) {
        failures.push(`Missing observation shape for ${indicator.id}/${code}`);
      }
    }
  }
}

async function verifyCountryList(AF, failures, counts) {
  const url = `${WORLD_BANK_ROOT}/country?format=json&per_page=400`;
  const payload = await fetchJson(url);
  const rows = Array.isArray(payload) && Array.isArray(payload[1]) ? payload[1] : [];
  const individuals = rows.filter((row) => row.region?.id !== "NA" && row.iso2Code?.length === 2);
  const source = new Map(individuals.map((row) => [row.iso2Code.toUpperCase(), row]));
  if (AF.countries.length !== individuals.length) {
    failures.push(`Country directory count differs: stored ${AF.countries.length}, source ${individuals.length}`);
  }
  for (const country of AF.countries) {
    const row = source.get(country.code);
    if (!row) {
      failures.push(`Country directory entry ${country.code} is not an individual World Bank economy`);
      continue;
    }
    if (country.name !== row.name.trim() || country.iso3 !== row.id || country.region !== row.region.value.trim()) {
      failures.push(`Country directory metadata does not match World Bank for ${country.code}`);
      continue;
    }
    counts.countryList += 1;
  }
}

async function verifyWorldBank(AF, failures, warnings, counts) {
  const codes = AF.countries.map((country) => country.code);
  await mapLimit(AF.indicators, 3, async (indicator) => {
    const rows = await worldBankRows(codes, indicator.id, "mrv=1&per_page=500");

    const latest = new Map();
    for (const row of rows) {
      const code = iso2(row);
      if (code) latest.set(code, row);
    }

    for (const code of codes) {
      const stored = AF.series[indicator.id][code];
      const row = latest.get(code);
      if (!row) {
        failures.push(`World Bank returned no latest row for ${indicator.id}/${code}`);
        continue;
      }

      const currentDate = row.date == null ? null : String(row.date);
      const currentValue = row.value == null ? null : String(row.value);
      if (stored.date === currentDate && sameValue(stored.value, currentValue)) {
        counts.worldBank += 1;
        continue;
      }

      if (stored.date == null) {
        warnings.push(`${indicator.id}/${code} has no stored date; current source row is ${currentDate}`);
        continue;
      }

      const exactUrl = `${WORLD_BANK_ROOT}/country/${code}/indicator/${indicator.id}?format=json&date=${encodeURIComponent(stored.date)}&per_page=10`;
      const exactPayload = await fetchJson(exactUrl);
      const exactRows = Array.isArray(exactPayload) && Array.isArray(exactPayload[1]) ? exactPayload[1] : [];
      const exact = exactRows.find((candidate) => String(candidate.date) === String(stored.date));
      if (!exact || !sameValue(stored.value, exact.value == null ? null : String(exact.value))) {
        failures.push(`${indicator.id}/${code} does not match the World Bank row for ${stored.date}`);
      } else {
        counts.worldBank += 1;
        warnings.push(`${indicator.id}/${code} is source-valid but no longer matches the latest World Bank row`);
      }
    }
  });

  await mapLimit(Object.entries(AF.history || {}), 2, async ([indicatorId, countries]) => {
    const rows = await worldBankRows(codes, indicatorId, "mrv=20&per_page=10000");
    const source = new Map();
    for (const row of rows) {
      const code = iso2(row);
      if (code && row.value != null) source.set(`${code}/${row.date}`, String(row.value));
    }
    for (const [code, points] of Object.entries(countries)) {
      for (const point of points) {
        const value = source.get(`${code}/${point.year}`);
        if (value == null || !sameValue(value, point.value)) {
          failures.push(`History ${indicatorId}/${code}/${point.year} does not match World Bank`);
        } else {
          counts.history += 1;
        }
      }
    }
  });
}

async function verifyFx(AF, failures, counts) {
  const url = `https://api.frankfurter.app/${encodeURIComponent(AF.fx.date)}?from=${encodeURIComponent(AF.fx.base || "USD")}`;
  const source = await fetchJson(url);
  if (source.date !== AF.fx.date) failures.push(`Frankfurter returned ${source.date}, expected ${AF.fx.date}`);
  for (const [code, stored] of Object.entries(AF.fx.rates)) {
    const value = source.rates?.[code];
    if (value == null || !sameValue(stored.value, String(value))) {
      failures.push(`FX ${AF.fx.base}/${code} does not match Frankfurter for ${AF.fx.date}`);
    } else {
      counts.fx += 1;
    }
  }
}

async function verifyCalendar(AF, failures, warnings, counts) {
  let source;
  try {
    source = await fetchJson(CALENDAR_URL);
  } catch (error) {
    if (String(error.message).includes("(429)")) {
      warnings.push("Calendar source verification deferred because the weekly endpoint returned HTTP 429 after bounded retries");
      return;
    }
    throw error;
  }
  if (!Array.isArray(source)) {
    failures.push("Forex Factory weekly endpoint did not return an array");
    return;
  }
  const current = new Set(source.map(eventKey));
  const stored = new Set(AF.calendar.events.map(eventKey));
  const sourceDays = [...new Set(source.map((event) => String(event.date).slice(0, 10)))].sort();
  const storedWeek = AF.calendar.sourceWeek || [];
  const sameWeek = storedWeek[0] === sourceDays[0] && storedWeek[1] === sourceDays[sourceDays.length - 1];

  if (!sameWeek) {
    warnings.push(`Calendar snapshot covers ${storedWeek.join(" to ")}; current weekly file covers ${sourceDays[0]} to ${sourceDays[sourceDays.length - 1]}`);
    return;
  }
  for (const key of stored) {
    if (!current.has(key)) failures.push(`Calendar event does not match the current source file: ${key}`);
    else counts.calendar += 1;
  }
  if (stored.size !== current.size) {
    failures.push(`Calendar event count differs: stored ${stored.size}, source ${current.size}`);
  }
}

async function main() {
  const AF = loadData();
  const failures = [];
  const warnings = [];
  const counts = { countryList: 0, worldBank: 0, history: 0, fx: 0, calendar: 0 };

  checkShape(AF, failures);
  await Promise.all([
    verifyWorldBank(AF, failures, warnings, counts),
    verifyCountryList(AF, failures, counts),
    verifyFx(AF, failures, counts),
    verifyCalendar(AF, failures, warnings, counts),
  ]);

  console.log(JSON.stringify({
    dataset: {
      builtAt: AF.builtAt,
      countries: AF.countries.length,
      indicators: AF.indicators.length,
      fxDate: AF.fx.date,
      calendarWeek: AF.calendar.sourceWeek,
    },
    verifiedRecords: counts,
    warnings,
    failures,
  }, null, 2));

  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
