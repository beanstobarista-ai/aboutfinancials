import fs from "node:fs/promises";
import vm from "node:vm";

const context = { globalThis: {} };
vm.createContext(context);
vm.runInContext(await fs.readFile(new URL("../js/company-data.js", import.meta.url), "utf8"), context);
const db = context.globalThis.AFCompanyData;
const amazon = db.companies.AMZN;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sum(rows, key) {
  return rows.filter((row) => !row.total).reduce((total, row) => total + row[key], 0);
}

const totalSegment = amazon.segments.rows.find((row) => row.total);
assert(sum(amazon.segments.rows, "salesCurrent") === totalSegment.salesCurrent, "H1 2026 segment sales do not reconcile");
assert(sum(amazon.segments.rows, "salesPrior") === totalSegment.salesPrior, "H1 2025 segment sales do not reconcile");
assert(sum(amazon.segments.rows, "operatingIncomeCurrent") === totalSegment.operatingIncomeCurrent, "H1 2026 segment operating income does not reconcile");
assert(sum(amazon.segments.rows, "operatingIncomePrior") === totalSegment.operatingIncomePrior, "H1 2025 segment operating income does not reconcile");
assert(amazon.revenueMix.rows.reduce((total, row) => total + row.current, 0) === totalSegment.salesCurrent, "H1 2026 revenue groups do not reconcile");
assert(amazon.revenueMix.rows.reduce((total, row) => total + row.prior, 0) === totalSegment.salesPrior, "H1 2025 revenue groups do not reconcile");

const cash = Object.fromEntries(amazon.cashFlow.rows.map((row) => [row.name, row]));
assert(cash["Operating cash flow"].current - cash["Cash capital expenditure, net"].current === cash["Free cash flow"].current, "Current free cash flow does not reconcile");
assert(cash["Operating cash flow"].prior - cash["Cash capital expenditure, net"].prior === cash["Free cash flow"].prior, "Prior free cash flow does not reconcile");

const source = db.sources.amzn2026q2;
const response = await fetch(source.url, {
  headers: { "User-Agent": "AboutFinancials.com source verification" },
  signal: AbortSignal.timeout(45000)
});
if (!response.ok) throw new Error(`SEC filing request failed: ${response.status}`);
const filing = (await response.text())
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/\s+/g, " ");

function filingHas(label, value) {
  const wanted = Number(value).toLocaleString("en-US");
  let start = filing.indexOf(label);
  while (start !== -1) {
    if (filing.slice(start, start + 5000).includes(wanted)) return true;
    start = filing.indexOf(label, start + label.length);
  }
  return false;
}

const checks = [
  ["North America", 220320], ["International", 81986], ["AWS", 79819], ["Consolidated", 382125],
  ["North America", 17390], ["International", 3141], ["AWS", 30782], ["Consolidated", 51313],
  ["Online stores", 134686], ["Physical stores", 11579], ["Third-party seller services", 88358],
  ["Advertising services", 37052], ["Subscription services", 27157], ["Other", 3474],
  ["Net cash provided by (used in) operating activities", 161403],
  ["Purchases of property and equipment, net of proceeds from sales and incentives", 169007],
  ["Free cash flow", 7604],
  ["Total cash, cash equivalents, and marketable securities", 122988],
  ["Total face value of long-term debt", 132995],
  ["Present value of lease liabilities", 109771],
  ["AWS", 263750], ["Consolidated", 446046],
  ["Leases not yet commenced", 137214], ["Unconditional purchase obligations", 130065],
  ["Other commitments", 18366], ["Financing obligations, including interest", 11070],
  ["performance obligations", 496], ["Total other income (expense), net", 69062],
  ["Upward adjustments relating to equity investments in private companies", 62814],
  ["Net income", 92902]
];

for (const [label, value] of checks) {
  assert(filingHas(label, value), `Could not verify ${label}: ${value} in ${source.label}`);
}

console.log(`Verified ${checks.length} filing values and 8 internal reconciliations for Amazon.`);

