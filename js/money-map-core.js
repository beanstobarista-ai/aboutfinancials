/*
 * Money Map core: pure functions (no DOM), shared by the browser page and the Node test.
 *
 * Rate table shape: { base: "EUR", date: "YYYY-MM-DD", rates: { EUR: 1, USD: 1.12, ... }, source: {...} }
 * rates[X] = units of X per 1 EUR (ECB convention). Conversion A -> B = amount * rates[B] / rates[A].
 *
 * Owner rule: no number without a real source. The only hard-coded numbers below are central-bank
 * pegs, each stored next to the URL of the central bank page that states it.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MoneyMapCore = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Primary feed: ECB reference rates only (single provider, single date), via Frankfurter v2.
  // Fallback: Frankfurter v1 "latest", which is also ECB reference rates (v1 is deprecated but still served).
  var RATE_FEEDS = [
    { url: "https://api.frankfurter.dev/v2/providers/ecb/rates?base=EUR", label: "Frankfurter v2 (ECB provider)" },
    { url: "https://api.frankfurter.dev/v1/latest", label: "Frankfurter v1 (ECB reference rates)" }
  ];

  var ECB_SOURCE = {
    name: "European Central Bank euro reference rates",
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
    via: "Frankfurter",
    viaUrl: "https://frankfurter.dev/"
  };

  // Currencies pegged to the US dollar that the ECB does not publish.
  // perUSD = units of the currency per 1 US dollar, exactly as stated by the central bank page linked.
  // Kuwaiti dinar (KWD) is deliberately excluded: it is managed against a basket, not a single published peg.
  var PEGS = [
    {
      code: "SAR", name: "Saudi Riyal", perUSD: 3.75,
      authority: "Saudi Central Bank (SAMA)",
      statement: "SAMA Governor statement: “maintaining the peg at SAR 3.7500 per USD”",
      url: "https://sama.gov.sa/en-US/News/Pages/News11012016.aspx"
    },
    {
      code: "AED", name: "UAE Dirham", perUSD: 3.6725,
      authority: "Central Bank of the UAE (CBUAE)",
      statement: "CBUAE exchange-rate table lists the US dollar at 3.6725 dirhams; CBUAE buys and sells at 3.673 and 3.672 to hold the peg",
      url: "https://www.centralbank.ae/en/forex-eibor/exchange-rates/",
      extraUrl: "https://www.centralbank.ae/en/our-operations/monetary-policy-and-domestic-markets/how-the-monetary-system-works/"
    },
    {
      code: "QAR", name: "Qatari Riyal", perUSD: 3.64,
      authority: "Qatar Central Bank (QCB)",
      statement: "QCB: “a fixed parity … at QR 3.64 per USD”",
      url: "https://www.qcb.gov.qa/en/Pages/MonetaryPolicyTools.aspx"
    },
    {
      code: "BHD", name: "Bahraini Dinar", perUSD: 0.376,
      authority: "Central Bank of Bahrain (CBB)",
      statement: "CBB: “Bahrain maintains an exchange rate peg at 0.376 Bahraini dinars to the US dollar”",
      url: "https://www.cbb.gov.bh/monetary-policy/"
    },
    {
      code: "OMR", name: "Omani Rial", perUSD: 0.3845,
      authority: "Central Bank of Oman (CBO)",
      statement: "CBO: USD/RO spot rate “384.5 baizas per USD” (the peg is USD 2.6008 per rial)",
      url: "https://cbo.gov.om/Pages/MoneyMarketOperations.aspx",
      extraUrl: "https://cbo.gov.om/Pages/FixedPeg.aspx"
    }
  ];

  // Names for currencies the ECB currently publishes (from Frankfurter's currency list) plus the pegs above.
  // Names only; no numbers.
  var CURRENCY_NAMES = {
    AUD: "Australian Dollar", BRL: "Brazilian Real", CAD: "Canadian Dollar", CHF: "Swiss Franc",
    CNY: "Chinese Renminbi Yuan", CZK: "Czech Koruna", DKK: "Danish Krone", EUR: "Euro",
    GBP: "British Pound", HKD: "Hong Kong Dollar", HUF: "Hungarian Forint", IDR: "Indonesian Rupiah",
    ILS: "Israeli New Shekel", INR: "Indian Rupee", ISK: "Icelandic Króna", JPY: "Japanese Yen",
    KRW: "South Korean Won", MXN: "Mexican Peso", MYR: "Malaysian Ringgit", NOK: "Norwegian Krone",
    NZD: "New Zealand Dollar", PHP: "Philippine Peso", PLN: "Polish Złoty", RON: "Romanian Leu",
    SEK: "Swedish Krona", SGD: "Singapore Dollar", THB: "Thai Baht", TRY: "Turkish Lira",
    USD: "United States Dollar", ZAR: "South African Rand",
    SAR: "Saudi Riyal", AED: "UAE Dirham", QAR: "Qatari Riyal", BHD: "Bahraini Dinar", OMR: "Omani Rial"
  };

  function isCode(c) { return typeof c === "string" && /^[A-Z]{3}$/.test(c); }
  function isPositiveNumber(n) { return typeof n === "number" && isFinite(n) && n > 0; }

  /**
   * Normalise a Frankfurter response into a EUR-based rate table.
   * Accepts v2 (array of {date, base, quote, rate}) or v1 ({base, date, rates}).
   * Returns null if the response is unusable. Never fills in missing values.
   */
  function normalizeRates(json) {
    var rates = { EUR: 1 };
    var dates = {};
    if (Array.isArray(json)) {
      json.forEach(function (row) {
        if (!row || row.base !== "EUR" || !isCode(row.quote) || !isPositiveNumber(row.rate)) return;
        rates[row.quote] = row.rate;
        if (typeof row.date === "string") dates[row.date] = true;
      });
    } else if (json && typeof json === "object" && json.rates && json.base === "EUR") {
      Object.keys(json.rates).forEach(function (code) {
        var r = json.rates[code];
        if (isCode(code) && isPositiveNumber(r)) rates[code] = r;
      });
      if (typeof json.date === "string") dates[json.date] = true;
    } else {
      return null;
    }
    var dateList = Object.keys(dates).sort();
    if (Object.keys(rates).length < 2 || dateList.length === 0) return null;
    return { base: "EUR", date: dateList[dateList.length - 1], dates: dateList, rates: rates };
  }

  /**
   * Add pegged currencies to a EUR-based table, derived through the table's own USD rate:
   * units of PEG per EUR = perUSD * (USD per EUR). Skipped entirely if USD is missing.
   */
  function applyPegs(table, pegs) {
    var out = { base: table.base, date: table.date, dates: (table.dates || []).slice(), rates: {}, pegged: {} };
    Object.keys(table.rates).forEach(function (k) { out.rates[k] = table.rates[k]; });
    var usd = table.rates.USD;
    if (!isPositiveNumber(usd)) return out;
    (pegs || []).forEach(function (p) {
      if (!isCode(p.code) || !isPositiveNumber(p.perUSD) || !p.url) return; // no citation, no rate
      if (out.rates[p.code] != null) return; // never override a published rate
      out.rates[p.code] = p.perUSD * usd;
      out.pegged[p.code] = p;
    });
    return out;
  }

  /** Convert amount from one currency to another. Returns null when either rate is missing. */
  function convert(amount, from, to, table) {
    if (typeof amount !== "number" || !isFinite(amount)) return null;
    if (from === to) return amount;
    if (!table || !table.rates) return null;
    var rf = table.rates[from];
    var rt = table.rates[to];
    if (!isPositiveNumber(rf) || !isPositiveNumber(rt)) return null;
    return amount * (rt / rf);
  }

  /** Validate and clean a user entry. Returns {ok, entry} or {ok:false, error}. */
  function cleanEntry(raw) {
    var name = String(raw && raw.name != null ? raw.name : "").trim().slice(0, 60);
    var type = raw && raw.type === "debt" ? "debt" : (raw && raw.type === "asset" ? "asset" : null);
    var amount = typeof raw.amount === "number" ? raw.amount : parseFloat(String(raw.amount).replace(/,/g, ""));
    var currency = String(raw && raw.currency || "").toUpperCase();
    if (!name) return { ok: false, error: "Give the item a name." };
    if (!type) return { ok: false, error: "Choose asset or debt." };
    if (!isFinite(amount) || amount < 0) return { ok: false, error: "Enter an amount of zero or more." };
    if (!isCode(currency)) return { ok: false, error: "Choose a currency." };
    return { ok: true, entry: { id: raw.id || null, name: name, type: type, amount: amount, currency: currency } };
  }

  /**
   * Summarise entries. Native totals are always computed. Home-currency totals include only
   * currencies with a rate; others are listed in `missing` and excluded (never guessed).
   */
  function summarize(entries, home, table) {
    var by = {};
    (entries || []).forEach(function (e) {
      if (!by[e.currency]) by[e.currency] = { currency: e.currency, assets: 0, debts: 0 };
      if (e.type === "debt") by[e.currency].debts += e.amount;
      else by[e.currency].assets += e.amount;
    });
    var rows = Object.keys(by).sort().map(function (code) {
      var r = by[code];
      r.net = r.assets - r.debts;
      r.assetsHome = convert(r.assets, code, home, table);
      r.debtsHome = convert(r.debts, code, home, table);
      r.netHome = convert(r.net, code, home, table);
      return r;
    });
    var totals = { assets: 0, debts: 0, net: 0 };
    var missing = [];
    rows.forEach(function (r) {
      if (r.netHome === null) { missing.push(r.currency); return; }
      totals.assets += r.assetsHome;
      totals.debts += r.debtsHome;
    });
    totals.net = totals.assets - totals.debts;
    rows.forEach(function (r) {
      // Shares only make sense when every currency is converted; otherwise leave them blank.
      r.share = (missing.length === 0 && totals.assets > 0) ? r.assetsHome / totals.assets : null;
    });
    return { home: home, rows: rows, totals: totals, missing: missing, converted: rows.length - missing.length };
  }

  return {
    RATE_FEEDS: RATE_FEEDS,
    ECB_SOURCE: ECB_SOURCE,
    PEGS: PEGS,
    CURRENCY_NAMES: CURRENCY_NAMES,
    normalizeRates: normalizeRates,
    applyPegs: applyPegs,
    convert: convert,
    cleanEntry: cleanEntry,
    summarize: summarize
  };
});
