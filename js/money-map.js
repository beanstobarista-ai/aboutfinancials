/* Money Map page: UI, localStorage, and live rate fetch. Pure maths lives in money-map-core.js. */
(function () {
  "use strict";
  var Core = window.MoneyMapCore;
  if (!Core) return;

  var STORE_KEY = "af-money-map-v1";        // { home, entries: [...] }
  var RATES_KEY = "af-money-map-rates-v1";  // last successfully fetched rate table (from the source, unmodified)
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var $ = function (id) { return document.getElementById(id); };
  var state = { home: "USD", entries: [] };
  var table = null;          // rate table with pegs applied, or null when no rates
  var rateInfo = null;       // { status: "live" | "cached" | "none", feed, fetchedAt }
  var storageOk = true;

  // ---------- storage ----------
  function load() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        if (data && Array.isArray(data.entries)) {
          state.entries = data.entries.map(function (e) {
            var c = Core.cleanEntry(e);
            if (!c.ok) return null;
            c.entry.id = e.id || newId();
            return c.entry;
          }).filter(Boolean);
        }
        if (data && typeof data.home === "string" && Core.CURRENCY_NAMES[data.home]) state.home = data.home;
      }
    } catch (err) {
      storageOk = false;
    }
  }
  function save() {
    if (!storageOk) return;
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (err) { storageOk = false; renderStorageWarning(); }
  }
  function newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  // ---------- formatting ----------
  function longDate(iso) {
    var p = String(iso).slice(0, 10).split("-");
    if (p.length !== 3) return String(iso);
    return Number(p[2]) + " " + MONTHS[Number(p[1]) - 1] + " " + p[0];
  }
  function localDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso);
    return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }
  function money(amount, code) {
    if (amount === null || amount === undefined || !isFinite(amount)) return "–";
    try {
      return new Intl.NumberFormat("en", { style: "currency", currency: code, currencyDisplay: "code" }).format(amount);
    } catch (err) {
      return code + " " + amount.toLocaleString("en", { maximumFractionDigits: 2 });
    }
  }
  function pct(x) { return x === null ? "–" : (x * 100).toLocaleString("en", { maximumFractionDigits: 1 }) + "%"; }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function cell(tag, cls, text, label) {
    var n = el(tag, cls, text);
    if (label) n.setAttribute("data-label", label);
    return n;
  }
  function link(href, text) {
    var a = el("a", null, text);
    a.href = href; a.rel = "noopener"; a.target = "_blank";
    return a;
  }

  // ---------- selects ----------
  function fillSelect(select, selected) {
    var codes = Object.keys(Core.CURRENCY_NAMES).sort();
    select.textContent = "";
    codes.forEach(function (code) {
      var o = el("option", null, code + " · " + Core.CURRENCY_NAMES[code]);
      o.value = code;
      if (code === selected) o.selected = true;
      select.appendChild(o);
    });
  }

  // ---------- rates ----------
  function fetchJson(url, ms) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, ms) : null;
    return fetch(url, { signal: ctrl ? ctrl.signal : undefined, headers: { Accept: "application/json" } })
      .then(function (res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      }, function (err) { if (timer) clearTimeout(timer); throw err; });
  }

  function tryFeeds(i) {
    if (i >= Core.RATE_FEEDS.length) return Promise.reject(new Error("All rate feeds failed"));
    var feed = Core.RATE_FEEDS[i];
    return fetchJson(feed.url, 10000).then(function (json) {
      var t = Core.normalizeRates(json);
      if (!t) throw new Error("Unusable response");
      t.feed = feed;
      return t;
    }).catch(function () { return tryFeeds(i + 1); });
  }

  function loadRates() {
    $("rate-status").textContent = "Loading exchange rates…";
    tryFeeds(0).then(function (t) {
      t.fetchedAt = new Date().toISOString();
      try { window.localStorage.setItem(RATES_KEY, JSON.stringify(t)); } catch (err) { /* ignore */ }
      table = Core.applyPegs(t, Core.PEGS);
      rateInfo = { status: "live", feed: t.feed, fetchedAt: t.fetchedAt };
      renderAll();
    }).catch(function () {
      var cached = null;
      try { cached = JSON.parse(window.localStorage.getItem(RATES_KEY) || "null"); } catch (err) { cached = null; }
      if (cached && cached.rates && cached.base === "EUR") {
        table = Core.applyPegs(cached, Core.PEGS);
        rateInfo = { status: "cached", feed: cached.feed, fetchedAt: cached.fetchedAt };
      } else {
        table = null;
        rateInfo = { status: "none" };
      }
      renderAll();
    });
  }

  function renderRateStatus() {
    var box = $("rate-status");
    box.textContent = "";
    if (!rateInfo) { box.textContent = "Loading exchange rates…"; return; }
    if (rateInfo.status === "none") {
      var p = el("p", "notice error");
      p.appendChild(document.createTextNode("Exchange rates couldn’t be loaded right now, so nothing is converted. Your totals by currency still work. "));
      var b = el("button", "link-btn", "Try again");
      b.type = "button";
      b.addEventListener("click", loadRates);
      p.appendChild(b);
      box.appendChild(p);
      return;
    }
    if (rateInfo.status === "cached") {
      var w = el("p", "notice");
      w.appendChild(document.createTextNode("Today’s rates couldn’t be loaded. Showing the last rates this browser saved" +
        (rateInfo.fetchedAt ? " (fetched " + localDate(rateInfo.fetchedAt) + ")" : "") + ". "));
      var rb = el("button", "link-btn", "Try again");
      rb.type = "button";
      rb.addEventListener("click", loadRates);
      w.appendChild(rb);
      box.appendChild(w);
    }
    var line = el("p", null);
    line.style.margin = "0";
    line.appendChild(document.createTextNode("Rates dated " + longDate(table.date) + ". Source: "));
    line.appendChild(link(Core.ECB_SOURCE.url, "ECB euro reference rates"));
    line.appendChild(document.createTextNode(", via "));
    line.appendChild(link(Core.ECB_SOURCE.viaUrl, "Frankfurter"));
    var pegCodes = Object.keys(table.pegged || {});
    if (pegCodes.length) line.appendChild(document.createTextNode(". Gulf pegs (" + pegCodes.join(", ") + ") from their central banks, listed below"));
    line.appendChild(document.createTextNode(". Reference rates, not quotes."));
    box.appendChild(line);
  }

  function renderPegList() {
    var ul = $("peg-list");
    ul.textContent = "";
    Core.PEGS.forEach(function (p) {
      var li = el("li");
      var strong = el("strong", null, p.code + " · " + p.name + ": ");
      li.appendChild(strong);
      li.appendChild(document.createTextNode(p.perUSD + " per US dollar. "));
      li.appendChild(link(p.url, p.authority));
      if (p.extraUrl) {
        li.appendChild(document.createTextNode(" ("));
        li.appendChild(link(p.extraUrl, "also"));
        li.appendChild(document.createTextNode(")"));
      }
      li.appendChild(el("div", "rate-meta", p.statement));
      ul.appendChild(li);
    });
  }

  // ---------- render ----------
  function renderStorageWarning() {
    if (storageOk || $("storage-warn")) return;
    var n = el("p", "notice", "This browser isn’t letting the page save to local storage, so your items will disappear when you close the page.");
    n.id = "storage-warn";
    var head = document.querySelector(".page-head .wrap");
    if (head) head.appendChild(n);
  }

  function renderEntries(summary) {
    var body = $("entries-body");
    body.textContent = "";
    $("entries-empty").hidden = state.entries.length > 0;
    $("entries-table").hidden = state.entries.length === 0;
    $("clear-all").hidden = state.entries.length === 0;
    state.entries.forEach(function (e) {
      var tr = el("tr");
      tr.appendChild(cell("td", null, e.name));
      var tdType = cell("td", null, null, "Type");
      tdType.appendChild(el("span", "pill" + (e.type === "debt" ? " debt" : ""), e.type === "debt" ? "Debt" : "Asset"));
      tr.appendChild(tdType);
      tr.appendChild(cell("td", "num", money(e.amount, e.currency), "Amount"));
      var conv = Core.convert(e.amount, e.currency, state.home, table);
      var signed = conv === null ? null : (e.type === "debt" ? -conv : conv);
      var tdConv = cell("td", "num" + (signed !== null && signed < 0 ? " neg" : ""), signed === null ? "No rate" : money(signed, state.home), "In " + state.home);
      tr.appendChild(tdConv);
      var tdAct = el("td", "num");
      var del = el("button", "link-btn", "Remove");
      del.type = "button";
      del.setAttribute("aria-label", "Remove " + e.name);
      del.addEventListener("click", function () {
        state.entries = state.entries.filter(function (x) { return x.id !== e.id; });
        save(); renderAll();
      });
      tdAct.appendChild(del);
      tr.appendChild(tdAct);
      body.appendChild(tr);
    });
  }

  function renderSummary(s) {
    var home = state.home;
    var has = state.entries.length > 0;
    // Only show home-currency totals when every currency could be converted. A partial total would mislead.
    var canConvert = has && s.missing.length === 0;
    $("sum-assets").textContent = canConvert ? money(s.totals.assets, home) : "–";
    $("sum-debts").textContent = canConvert ? money(s.totals.debts, home) : "–";
    var net = $("sum-net");
    net.textContent = canConvert ? money(s.totals.net, home) : "–";
    net.classList.toggle("neg", canConvert && s.totals.net < 0);
    var note = "";
    if (!has) note = "Add items to see totals in " + home + ".";
    else if (s.missing.length && !table) note = "No exchange rates loaded, so a combined total can’t be shown. See totals by currency below.";
    else if (s.missing.length) note = "A combined total can’t be shown because there is no sourced rate for: " + s.missing.join(", ") + ". See totals by currency below.";
    else if (!table) note = "All items are already in " + home + ", so no exchange rate is needed.";
    else note = "All amounts converted to " + home + " using the rates dated " + longDate(table.date) + ".";
    $("summary-note").textContent = note;
  }

  function renderByCurrency(s) {
    var body = $("bycur-body");
    body.textContent = "";
    $("bycur-empty").hidden = s.rows.length > 0;
    body.parentNode.hidden = s.rows.length === 0;
    s.rows.forEach(function (r) {
      var tr = el("tr");
      var th = el("th", null, r.currency);
      th.scope = "row";
      tr.appendChild(th);
      tr.appendChild(cell("td", "num", money(r.assets, r.currency), "Assets"));
      tr.appendChild(cell("td", "num", money(r.debts, r.currency), "Debts"));
      tr.appendChild(cell("td", "num" + (r.net < 0 ? " neg" : ""), money(r.net, r.currency), "Net"));
      tr.appendChild(cell("td", "num" + (r.netHome !== null && r.netHome < 0 ? " neg" : ""), r.netHome === null ? "No rate" : money(r.netHome, state.home), "Net in " + state.home));
      tr.appendChild(cell("td", "num", pct(r.share), "Share of assets"));
      body.appendChild(tr);
    });
  }

  function renderChart(s) {
    var box = $("chart");
    box.textContent = "";
    var rows = s.rows;
    if (!rows.length || s.missing.length) {
      box.appendChild(el("p", "empty", !rows.length ? "The chart appears once you add an item." :
        "The chart needs a sourced rate for every currency you’ve added (missing: " + s.missing.join(", ") + ")."));
      box.setAttribute("aria-label", "Chart not available");
      return;
    }
    var NS = "http://www.w3.org/2000/svg";
    var W = Math.max(280, Math.round(box.clientWidth || 640));
    var rowH = 36, top = 8, labelW = 52, valueW = W < 480 ? 118 : 160;
    var H = top * 2 + rows.length * rowH;
    var posMax = 0, negMax = 0;
    rows.forEach(function (r) { if (r.netHome > posMax) posMax = r.netHome; if (-r.netHome > negMax) negMax = -r.netHome; });
    var span = posMax + negMax || 1;
    var plotX = labelW, plotW = W - labelW - valueW;
    var zeroX = plotX + (negMax / span) * plotW;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var desc = [];
    rows.forEach(function (r, i) {
      var y = top + i * rowH;
      var w = (Math.abs(r.netHome) / span) * plotW;
      var x = r.netHome >= 0 ? zeroX : zeroX - w;
      var label = document.createElementNS(NS, "text");
      label.setAttribute("x", 0); label.setAttribute("y", y + rowH / 2 + 4);
      label.textContent = r.currency;
      svg.appendChild(label);
      var rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", x.toFixed(2)); rect.setAttribute("y", y + 7);
      rect.setAttribute("width", Math.max(w, 1).toFixed(2)); rect.setAttribute("height", rowH - 14);
      rect.setAttribute("rx", 5);
      rect.setAttribute("class", r.netHome >= 0 ? "bar-pos" : "bar-neg");
      svg.appendChild(rect);
      var val = document.createElementNS(NS, "text");
      val.setAttribute("x", W); val.setAttribute("y", y + rowH / 2 + 4);
      val.setAttribute("text-anchor", "end");
      val.setAttribute("class", "muted");
      val.textContent = money(r.netHome, state.home);
      svg.appendChild(val);
      desc.push(r.currency + " " + money(r.netHome, state.home));
    });
    var axis = document.createElementNS(NS, "line");
    axis.setAttribute("x1", zeroX.toFixed(2)); axis.setAttribute("x2", zeroX.toFixed(2));
    axis.setAttribute("y1", 2); axis.setAttribute("y2", H - 2);
    axis.setAttribute("class", "axis");
    svg.appendChild(axis);
    box.appendChild(svg);
    box.setAttribute("aria-label", "Net amount by currency in " + state.home + ": " + desc.join("; "));
  }

  function renderAll() {
    var s = Core.summarize(state.entries, state.home, table);
    renderRateStatus();
    renderEntries(s);
    renderSummary(s);
    renderByCurrency(s);
    renderChart(s);
  }

  // ---------- events ----------
  function onSubmit(ev) {
    ev.preventDefault();
    var err = $("form-error");
    var res = Core.cleanEntry({
      name: $("f-name").value,
      type: $("f-type").value,
      amount: $("f-amount").value,
      currency: $("f-currency").value
    });
    if (!res.ok) { err.textContent = res.error; return; }
    err.textContent = "";
    res.entry.id = newId();
    state.entries.push(res.entry);
    save();
    $("f-name").value = "";
    $("f-amount").value = "";
    $("f-name").focus();
    renderAll();
  }

  function init() {
    load();
    renderStorageWarning();
    fillSelect($("f-currency"), state.home);
    fillSelect($("home-currency"), state.home);
    renderPegList();
    $("entry-form").addEventListener("submit", onSubmit);
    $("home-currency").addEventListener("change", function () {
      state.home = this.value; save(); renderAll();
    });
    $("clear-all").addEventListener("click", function () {
      if (!state.entries.length) return;
      if (window.confirm("Remove all items saved in this browser?")) {
        state.entries = [];
        save(); renderAll();
      }
    });
    var signup = $("signup-form");
    if (signup) signup.addEventListener("submit", function (e) { e.preventDefault(); });
    renderAll();
    loadRates();
    var lastW = window.innerWidth, timer = null;
    window.addEventListener("resize", function () {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(function () { renderChart(Core.summarize(state.entries, state.home, table)); }, 150);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
