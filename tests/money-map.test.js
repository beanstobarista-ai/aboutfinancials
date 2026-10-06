// Node test for Money Map conversion maths, using a FIXED rates object (test fixture, not real rates).
// Run: node tests/money-map.test.js
"use strict";
const assert = require("assert");
const Core = require("../js/money-map-core.js");

const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b)), `${msg}: ${a} !== ${b}`);

// Fixture: EUR-based table. 1 EUR = 2 USD = 0.5 GBP = 200 JPY (made-up round numbers for arithmetic only).
const fixtureV1 = { amount: 1, base: "EUR", date: "2000-01-03", rates: { USD: 2, GBP: 0.5, JPY: 200 } };
const t1 = Core.normalizeRates(fixtureV1);
assert.strictEqual(t1.date, "2000-01-03");
assert.strictEqual(t1.rates.EUR, 1);

// v2 array shape normalises to the same table; bad rows are dropped, not guessed.
const fixtureV2 = [
  { date: "2000-01-03", base: "EUR", quote: "USD", rate: 2 },
  { date: "2000-01-03", base: "EUR", quote: "GBP", rate: 0.5 },
  { date: "2000-01-03", base: "EUR", quote: "JPY", rate: 200 },
  { date: "2000-01-03", base: "EUR", quote: "XXX", rate: -1 },
  { date: "2000-01-03", base: "USD", quote: "CAD", rate: 1.3 }
];
const t2 = Core.normalizeRates(fixtureV2);
assert.deepStrictEqual(t2.rates, { EUR: 1, USD: 2, GBP: 0.5, JPY: 200 });
assert.strictEqual(Core.normalizeRates({ error: "x" }), null);
assert.strictEqual(Core.normalizeRates([]), null);

// Basic conversions through EUR.
near(Core.convert(100, "EUR", "USD", t1), 200, "EUR->USD");
near(Core.convert(200, "USD", "EUR", t1), 100, "USD->EUR");
near(Core.convert(10, "GBP", "USD", t1), 40, "GBP->USD (10 GBP = 20 EUR = 40 USD)");
near(Core.convert(1000, "JPY", "GBP", t1), 2.5, "JPY->GBP (1000 JPY = 5 EUR = 2.5 GBP)");
near(Core.convert(123.45, "USD", "USD", t1), 123.45, "same currency");
assert.strictEqual(Core.convert(1, "USD", "SAR", t1), null, "missing rate returns null, no guess");

// Pegs derived through USD: SAR per EUR = 3.75 * 2 = 7.5.
const t = Core.applyPegs(t1, Core.PEGS);
near(t.rates.SAR, 3.75 * 2, "SAR peg via USD");
near(t.rates.AED, 3.6725 * 2, "AED peg via USD");
near(Core.convert(3.75, "SAR", "USD", t), 1, "3.75 SAR = 1 USD");
near(Core.convert(3.6725, "AED", "USD", t), 1, "3.6725 AED = 1 USD");
near(Core.convert(375, "SAR", "AED", t), 367.25, "375 SAR = 100 USD = 367.25 AED");
near(Core.convert(1, "BHD", "USD", t), 1 / 0.376, "BHD via peg");
assert.ok(Object.keys(t.pegged).every((c) => Core.PEGS.find((p) => p.code === c).url.startsWith("https://")), "every peg has a citation URL");
assert.ok(!Core.PEGS.some((p) => p.code === "KWD"), "KWD excluded (basket)");
// Pegs never applied without USD, and never override a published rate.
assert.strictEqual(Core.applyPegs({ base: "EUR", date: "d", rates: { EUR: 1, GBP: 0.5 } }, Core.PEGS).rates.SAR, undefined);
assert.strictEqual(Core.applyPegs({ base: "EUR", date: "d", rates: { EUR: 1, USD: 2, SAR: 9 } }, Core.PEGS).rates.SAR, 9);
assert.strictEqual(Core.applyPegs(t1, [{ code: "ABC", perUSD: 1 }]).rates.ABC, undefined, "peg without URL is ignored");

// Summary: assets/debts by currency and converted net worth.
const entries = [
  { name: "Savings", type: "asset", amount: 7500, currency: "SAR" },   // 1000 EUR
  { name: "Brokerage", type: "asset", amount: 400, currency: "USD" },  // 200 EUR
  { name: "Car loan", type: "debt", amount: 1500, currency: "SAR" },   // 200 EUR
  { name: "Card", type: "debt", amount: 50, currency: "GBP" },         // 100 EUR
  { name: "Mystery", type: "asset", amount: 99, currency: "XYZ" }      // no rate
];
const s = Core.summarize(entries, "EUR", t);
near(s.totals.assets, 1200, "assets in EUR");
near(s.totals.debts, 300, "debts in EUR");
near(s.totals.net, 900, "net worth in EUR");
assert.deepStrictEqual(s.missing, ["XYZ"]);
const sar = s.rows.find((r) => r.currency === "SAR");
near(sar.net, 6000, "SAR native net");
near(sar.netHome, 800, "SAR net in EUR");
assert.strictEqual(sar.share, null, "no shares while a currency is missing a rate");
const full = Core.summarize(entries.filter((e) => e.currency !== "XYZ"), "EUR", t);
near(full.rows.find((r) => r.currency === "SAR").share, 1000 / 1200, "SAR share of assets");
near(full.rows.find((r) => r.currency === "USD").share, 200 / 1200, "USD share of assets");
const gbp = s.rows.find((r) => r.currency === "GBP");
near(gbp.netHome, -100, "GBP net negative");

// Same position in USD: 900 EUR * 2 = 1800 USD.
near(Core.summarize(entries, "USD", t).totals.net, 1800, "net worth in USD");
// Same in SAR: 900 EUR * 7.5 = 6750 SAR.
near(Core.summarize(entries, "SAR", t).totals.net, 6750, "net worth in SAR");
// No rates: nothing converted, all missing, totals zero (UI shows dashes).
const none = Core.summarize(entries, "USD", null);
assert.strictEqual(none.converted, 1, "only USD (same as home) converts without rates");
assert.deepStrictEqual(none.missing, ["GBP", "SAR", "XYZ"]);

// Entry validation.
assert.strictEqual(Core.cleanEntry({ name: "", type: "asset", amount: 1, currency: "USD" }).ok, false);
assert.strictEqual(Core.cleanEntry({ name: "a", type: "asset", amount: -1, currency: "USD" }).ok, false);
assert.strictEqual(Core.cleanEntry({ name: "a", type: "loan", amount: 1, currency: "USD" }).ok, false);
assert.strictEqual(Core.cleanEntry({ name: "a", type: "debt", amount: "1,250.5", currency: "usd" }).entry.amount, 1250.5);

console.log("money-map tests: all passed");
