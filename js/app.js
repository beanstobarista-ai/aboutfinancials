(function () {
  var AF = window.AF;
  if (!AF) return;

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function byId(id) {
    return AF.indicators.find(function (item) { return item.id === id; });
  }

  function countryByCode(code) {
    return AF.countries.find(function (item) { return item.code === code; });
  }

  function longDate(iso) {
    var parts = String(iso).slice(0, 10).split("-");
    return Number(parts[2]) + " " + MONTHS[Number(parts[1]) - 1] + " " + parts[0];
  }

  function exactGrouped(raw) {
    var text = String(raw);
    var neg = text.charAt(0) === "-";
    if (neg) text = text.slice(1);
    var bits = text.split(".");
    var whole = bits[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "\u2212" : "") + whole + (bits[1] ? "." + bits[1] : "");
  }

  function formatNumber(indicator, raw) {
    var n = Number(raw);
    if (!isFinite(n)) return String(raw);
    if (indicator.unit === "usd") {
      var abs = Math.abs(n);
      var div = 1;
      var word = "";
      if (abs >= 1e12) { div = 1e12; word = "trillion"; }
      else if (abs >= 1e9) { div = 1e9; word = "billion"; }
      else if (abs >= 1e6) { div = 1e6; word = "million"; }
      var scaled = n / div;
      var digits = word ? 2 : 0;
      var body = Math.abs(scaled).toLocaleString("en-US", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      });
      return (n < 0 ? "\u2212" : "") + "$" + body + (word ? " " + word : "");
    }
    if (indicator.unit === "usd_pc") {
      return "$" + Math.round(n).toLocaleString("en-US");
    }
    var bodyPct = Math.abs(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return (n < 0 ? "\u2212" : "") + bodyPct + "%";
  }

  function signWord(indicator, raw) {
    if (!indicator.signWords) return "";
    var n = Number(raw);
    if (n > 0) return "Surplus";
    if (n < 0) return "Deficit";
    return "Balanced";
  }

  function setupNav() {
    var page = document.body.getAttribute("data-page");
    var links = document.querySelectorAll(".nav-links a");
    links.forEach(function (link) {
      if (link.getAttribute("data-page") === page) link.setAttribute("aria-current", "page");
    });
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("site-nav");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    var built = document.getElementById("built-at");
    if (built) built.textContent = "Embedded " + AF.builtAtLabel + " (Riyadh). ";
  }

  function renderQuote(code) {
    var rate = AF.fx.rates[code];
    var card = el("a", "card quote");
    card.href = "markets.html#" + code;
    card.appendChild(el("p", "pair", "USD / " + code));
    var value = el("p", "rate", rate.value);
    value.title = "Frankfurter rate " + rate.value + " " + code + " per 1 USD on " + AF.fx.date;
    card.appendChild(value);
    card.appendChild(el("p", "fine", rate.name + " per 1 US dollar."));
    return card;
  }

  function fillHome() {
    var strip = document.getElementById("market-strip");
    if (strip) {
      ["EUR", "GBP", "JPY", "CNY", "INR", "CHF"].forEach(function (code) {
        strip.appendChild(renderQuote(code));
      });
    }
    var grid = document.getElementById("snap-grid");
    if (grid) {
      AF.countries.forEach(function (country) {
        grid.appendChild(snapCard(country));
      });
      setupCountryFilter();
    } else {
      document.querySelectorAll("[data-country]").forEach(function (card) {
        fillSnapMetrics(card, card.getAttribute("data-country"));
      });
    }
    setupSearch();
  }

  function snapCard(country) {
    var card = el("a", "card snap");
    card.href = "country.html?c=" + country.code;
    card.setAttribute("data-country", country.code);
    card.setAttribute("data-hay", (country.name + " " + country.code + " " + country.aliases.join(" ")).toLowerCase());
    card.appendChild(el("span", "code", country.code));
    card.appendChild(el("h3", null, country.name));
    var dl = document.createElement("dl");
    [
      ["NY.GDP.MKTP.CD", "GDP"],
      ["NY.GDP.MKTP.KD.ZG", "Growth"],
      ["FP.CPI.TOTL.ZG", "Inflation"]
    ].forEach(function (pair) {
      var metric = el("div", "metric");
      metric.setAttribute("data-series", pair[0]);
      metric.appendChild(el("dt", null, pair[1]));
      metric.appendChild(el("dd", "fig", "…"));
      metric.appendChild(el("dd", "meta", ""));
      dl.appendChild(metric);
    });
    card.appendChild(dl);
    fillSnapMetrics(card, country.code);
    return card;
  }

  function fillSnapMetrics(card, code) {
    card.querySelectorAll("[data-series]").forEach(function (slot) {
      var id = slot.getAttribute("data-series");
      var indicator = byId(id);
      var obs = AF.series[id][code];
      var fig = slot.querySelector(".fig");
      var meta = slot.querySelector(".meta");
      if (!obs || obs.value == null) {
        fig.textContent = "Not published";
        fig.classList.add("missing");
        meta.textContent = obs && obs.date ? ("No value in the " + obs.date + " World Bank row.") : "No row returned.";
        return;
      }
      fig.textContent = formatNumber(indicator, obs.value);
      fig.title = "Source value " + exactGrouped(obs.value);
      var extra = signWord(indicator, obs.value);
      meta.textContent = obs.date + " · " + indicator.short + (extra ? " · " + extra.toLowerCase() : "");
    });
  }

  function setupCountryFilter() {
    var input = document.getElementById("country-q");
    var grid = document.getElementById("snap-grid");
    if (!input || !grid) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      grid.querySelectorAll("[data-country]").forEach(function (card) {
        var hay = card.getAttribute("data-hay") || "";
        card.hidden = !!(q && hay.indexOf(q) === -1);
      });
    });
  }

  function setupSearch() {
    var input = document.getElementById("q");
    var box = document.getElementById("search-results");
    if (!input || !box) return;
    var items = [];
    AF.countries.forEach(function (country) {
      items.push({
        title: country.name,
        kind: "Country",
        href: "country.html?c=" + country.code,
        hay: (country.name + " " + country.code + " " + country.aliases.join(" ")).toLowerCase()
      });
    });
    AF.indicators.forEach(function (indicator) {
      var cat = AF.categories.find(function (item) { return item.id === indicator.category; });
      items.push({
        title: indicator.name,
        kind: cat ? cat.name : "Indicator",
        href: "indicators.html#" + indicator.id,
        hay: (indicator.name + " " + indicator.officialName + " " + indicator.id + " " + indicator.keywords.join(" ")).toLowerCase()
      });
    });
    var active = -1;
    var current = [];

    function hide() {
      box.hidden = true;
      box.innerHTML = "";
      active = -1;
      current = [];
    }

    function draw(list) {
      box.innerHTML = "";
      current = list;
      active = -1;
      if (!list.length) {
        box.hidden = false;
        box.appendChild(el("p", null, "Nothing matches. Try GDP, Japan, or inflation."));
        return;
      }
      list.forEach(function (item, index) {
        var link = el("a");
        link.href = item.href;
        link.appendChild(document.createTextNode(item.title));
        link.appendChild(el("small", null, item.kind));
        link.addEventListener("mouseenter", function () { setActive(index); });
        box.appendChild(link);
      });
      box.hidden = false;
    }

    function setActive(index) {
      var links = box.querySelectorAll("a");
      links.forEach(function (link, i) {
        if (i === index) link.setAttribute("aria-selected", "true");
        else link.removeAttribute("aria-selected");
      });
      active = index;
    }

    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { hide(); return; }
      draw(items.filter(function (item) { return item.hay.indexOf(q) !== -1; }).slice(0, 8));
    });
    input.addEventListener("keydown", function (event) {
      var links = box.querySelectorAll("a");
      if (event.key === "Escape") { hide(); return; }
      if (!links.length) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive(Math.min(active + 1, links.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(Math.max(active - 1, 0));
      } else if (event.key === "Enter" && active >= 0 && current[active]) {
        event.preventDefault();
        window.location.href = current[active].href;
      }
    });
    document.addEventListener("click", function (event) {
      if (!box.contains(event.target) && event.target !== input) hide();
    });
  }

  function fxCard(code) {
    var rate = AF.fx.rates[code];
    var card = el("article", "card fx-card");
    card.id = code;
    card.appendChild(el("p", "ccy", code));
    card.appendChild(el("h3", null, rate.name));
    var value = el("p", "rate", rate.value);
    value.title = "Source rate " + rate.value + " on " + AF.fx.date;
    card.appendChild(value);
    card.appendChild(el("p", null, "Per 1 US dollar on " + longDate(AF.fx.date) + ". An ECB reference rate, not a live trading price."));
    return card;
  }

  function fillMarkets() {
    var major = document.getElementById("fx-majors");
    var other = document.getElementById("fx-others");
    if (!major || !other) return;
    var dateLine = document.getElementById("fx-date");
    if (dateLine) dateLine.textContent = longDate(AF.fx.date);
    AF.fx.majors.forEach(function (code) { major.appendChild(fxCard(code)); });
    Object.keys(AF.fx.rates).filter(function (code) {
      return AF.fx.majors.indexOf(code) === -1;
    }).sort().forEach(function (code) {
      other.appendChild(fxCard(code));
    });
  }

  function indicatorTable(indicator) {
    var card = el("article", "card ind-card");
    card.id = indicator.id;
    card.appendChild(el("h3", null, indicator.name));
    card.appendChild(el("p", "plain", indicator.plain));
    var published = AF.countries.filter(function (country) {
      return AF.series[indicator.id][country.code].value != null;
    }).length;
    card.appendChild(el("p", "src", "World Bank series " + indicator.id + " \u00b7 " + indicator.officialName + ". Published for " + published + " of " + AF.countries.length + " countries in the latest observation."));
    var scroll = el("div", "table-scroll");
    var table = document.createElement("table");
    var caption = document.createElement("caption");
    caption.textContent = "Rounded for reading. The line under each figure is the exact source value.";
    table.appendChild(caption);
    var thead = document.createElement("thead");
    var hr = document.createElement("tr");
    ["Country", "Latest figure", "Year"].forEach(function (label) {
      hr.appendChild(el("th", null, label));
    });
    thead.appendChild(hr);
    table.appendChild(thead);
    var body = document.createElement("tbody");
    AF.countries.forEach(function (country) {
      var obs = AF.series[indicator.id][country.code];
      var tr = document.createElement("tr");
      var name = document.createElement("td");
      var link = el("a", null, country.name);
      link.href = "country.html?c=" + country.code;
      name.appendChild(link);
      tr.appendChild(name);
      var figCell = document.createElement("td");
      if (obs.value == null) {
        var missing = el("span", "fig missing", "Not published");
        missing.title = "World Bank returned no value for the " + obs.date + " observation. Not zero, and not estimated.";
        figCell.appendChild(missing);
      } else {
        var fig = el("span", "fig", formatNumber(indicator, obs.value));
        fig.title = "Source value " + exactGrouped(obs.value);
        figCell.appendChild(fig);
        var word = signWord(indicator, obs.value);
        if (word) figCell.appendChild(el("span", "word", word));
        figCell.appendChild(el("span", "exact", "Source value " + exactGrouped(obs.value)));
      }
      tr.appendChild(figCell);
      tr.appendChild(el("td", null, obs.date));
      body.appendChild(tr);
    });
    table.appendChild(body);
    scroll.appendChild(table);
    card.appendChild(scroll);
    return card;
  }

  function fillIndicators() {
    var root = document.getElementById("indicator-root");
    if (!root) return;
    AF.categories.forEach(function (category) {
      var section = el("section", "block");
      section.id = category.id;
      section.appendChild(el("h2", null, category.name));
      section.appendChild(el("p", "lede", category.summary));
      if (category.id === "prices") {
        var figure = el("figure", "diagram");
        figure.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="680" viewBox="0 0 1100 680" role="img" aria-labelledby="inflation-title inflation-desc" font-family="Inter, -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif">\n  <title id="inflation-title">How inflation is measured</title>\n  <desc id="inflation-desc">How inflation is measured. A fixed basket holds bread, rent, fuel, and care, with the caption: the list of things stays the same. The same four things appear again as gray Then bars and taller blue Now bars, with the caption: only the prices change. An upward arrow rises from those four things, with the caption: that rise in the whole basket is inflation. Footer: one product going up is not inflation. A blank official number is not zero. No prices or percentages are shown.</desc>\n  <defs>\n    <filter id="panel-shadow" x="-6%" y="-6%" width="112%" height="118%">\n      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#1d1d1f" flood-opacity="0.08"/>\n    </filter>\n    <symbol id="bread" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M5 31c.6-12 8.2-19 19-19s18.4 7 19 19v9.2c0 1.5-1.2 2.8-2.8 2.8H7.8c-1.6 0-2.8-1.3-2.8-2.8V31z"/>\n      <path d="M14 28c6.2-4.2 13.6-4.2 20 0" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" fill="none"/>\n    </symbol>\n    <symbol id="rent" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M24 6 5.5 23h6.5v19h24V23h6.5L24 6z"/>\n      <path fill="#ffffff" d="M21 29h6v13h-6z"/>\n    </symbol>\n    <symbol id="fuel" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M24 4.5C24 4.5 10 19 10 29.2 10 36.8 16.3 43 24 43s14-6.2 14-13.8C38 19 24 4.5 24 4.5z"/>\n    </symbol>\n    <symbol id="care" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M19.5 6h9a2 2 0 0 1 2 2v9.5H40a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H30.5V40a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V30.5H8a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9.5V8a2 2 0 0 1 2-2z"/>\n    </symbol>\n  </defs>\n\n  <rect width="1100" height="680" fill="#f5f5f7"/>\n  <rect x="28" y="24" width="1044" height="632" rx="28" fill="#ffffff" stroke="#d2d2d7" stroke-width="1.5" filter="url(#panel-shadow)"/>\n\n  <text x="60" y="78" fill="#1d1d1f" font-size="28" font-weight="600" letter-spacing="-0.022em">How inflation is measured</text>\n\n  \n  <path d="M138 168c0-46 124-46 124 0" fill="none" stroke="#1d1d1f" stroke-width="3" stroke-linecap="round"/>\n  <path d="M108 172h184l-18 230q-2 22-22 22H148q-20 0-22-22Z" fill="#f5f5f7" stroke="#1d1d1f" stroke-width="1.75" stroke-linejoin="round"/>\n  <g color="#1d1d1f">\n    <use href="#bread" x="132" y="196" width="52" height="52"/>\n    <use href="#rent" x="216" y="196" width="52" height="52"/>\n    <use href="#fuel" x="132" y="300" width="52" height="52"/>\n    <use href="#care" x="216" y="300" width="52" height="52"/>\n  </g>\n  <g fill="#6e6e73" font-size="14" font-weight="500" text-anchor="middle">\n    <text x="158" y="266">Bread</text>\n    <text x="242" y="266">Rent</text>\n    <text x="158" y="370">Fuel</text>\n    <text x="242" y="370">Care</text>\n  </g>\n\n  <g fill="none" stroke="#c7c7cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <line x1="312" y1="300" x2="368" y2="300"/>\n    <polyline points="356,290 370,300 356,310"/>\n  </g>\n\n  \n  <text x="461" y="166" fill="#6e6e73" font-size="16" font-weight="600" text-anchor="middle" letter-spacing="-0.011em">Then</text>\n  <text x="657" y="166" fill="#0071e3" font-size="16" font-weight="600" text-anchor="middle" letter-spacing="-0.011em">Now</text>\n\n  <g color="#1d1d1f">\n    <use href="#bread" x="379" y="180" width="26" height="26"/>\n    <use href="#rent" x="425" y="180" width="26" height="26"/>\n    <use href="#fuel" x="471" y="180" width="26" height="26"/>\n    <use href="#care" x="517" y="180" width="26" height="26"/>\n    <use href="#bread" x="575" y="180" width="26" height="26"/>\n    <use href="#rent" x="621" y="180" width="26" height="26"/>\n    <use href="#fuel" x="667" y="180" width="26" height="26"/>\n    <use href="#care" x="713" y="180" width="26" height="26"/>\n  </g>\n  <g fill="#6e6e73" font-size="13" font-weight="500" text-anchor="middle">\n    <text x="392" y="224">Bread</text>\n    <text x="438" y="224">Rent</text>\n    <text x="484" y="224">Fuel</text>\n    <text x="530" y="224">Care</text>\n    <text x="588" y="224">Bread</text>\n    <text x="634" y="224">Rent</text>\n    <text x="680" y="224">Fuel</text>\n    <text x="726" y="224">Care</text>\n  </g>\n\n  <line x1="376" y1="424" x2="746" y2="424" stroke="#d2d2d7" stroke-width="1.5" stroke-linecap="round"/>\n\n  <g fill="#aeaeb2">\n    <rect x="384" y="350" width="16" height="74" rx="5"/>\n    <rect x="430" y="316" width="16" height="108" rx="5"/>\n    <rect x="476" y="366" width="16" height="58" rx="5"/>\n    <rect x="522" y="332" width="16" height="92" rx="5"/>\n  </g>\n  <g fill="#0071e3">\n    <rect x="580" y="288" width="16" height="136" rx="5"/>\n    <rect x="626" y="244" width="16" height="180" rx="5"/>\n    <rect x="672" y="312" width="16" height="112" rx="5"/>\n    <rect x="718" y="268" width="16" height="156" rx="5"/>\n  </g>\n\n  <g fill="none" stroke="#c7c7cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <line x1="762" y1="300" x2="828" y2="300"/>\n    <polyline points="816,290 830,300 816,310"/>\n  </g>\n\n  \n  <text x="900" y="166" fill="#1d1d1f" font-size="16" font-weight="600" text-anchor="middle" letter-spacing="-0.011em">Inflation</text>\n  <path fill="#0071e3" d="M900 188l30 38h-16v140h-28V226h-16z"/>\n  <g color="#1d1d1f">\n    <use href="#bread" x="840" y="386" width="24" height="24"/>\n    <use href="#rent" x="872" y="386" width="24" height="24"/>\n    <use href="#fuel" x="904" y="386" width="24" height="24"/>\n    <use href="#care" x="936" y="386" width="24" height="24"/>\n  </g>\n  <line x1="832" y1="424" x2="968" y2="424" stroke="#d2d2d7" stroke-width="1.5" stroke-linecap="round"/>\n\n  \n  <g fill="#1d1d1f" font-size="15" font-weight="500" text-anchor="middle">\n    <text x="200" y="508">The list of things stays the same.</text>\n    <text x="559" y="508">Only the prices change.</text>\n    <text x="900" y="508">That rise in the whole basket is inflation.</text>\n  </g>\n\n  <line x1="60" y1="556" x2="1040" y2="556" stroke="#ececef" stroke-width="1"/>\n  <text x="550" y="598" fill="#6e6e73" font-size="14" font-weight="400" text-anchor="middle">One product going up is not inflation. A blank official number is not zero.</text>\n</svg>';
        section.appendChild(figure);
      }
      AF.indicators.filter(function (indicator) {
        return indicator.category === category.id;
      }).forEach(function (indicator) {
        section.appendChild(indicatorTable(indicator));
      });
      root.appendChild(section);
    });
  }

  function statCard(indicator, country) {
    var obs = AF.series[indicator.id][country.code];
    var card = el("article", "card stat");
    card.appendChild(el("h3", null, indicator.name));
    if (!obs || obs.value == null) {
      var missing = el("p", "fig missing", "Not published");
      card.appendChild(missing);
      card.appendChild(el("p", "plain", indicator.plain));
      card.appendChild(el("p", "exact", obs ? "World Bank returned no value for " + obs.date + ". Series " + indicator.id + "." : "No row."));
      return card;
    }
    var fig = el("p", "fig", formatNumber(indicator, obs.value));
    fig.title = "Source value " + exactGrouped(obs.value);
    card.appendChild(fig);
    var word = signWord(indicator, obs.value);
    card.appendChild(el("p", "plain", indicator.plain + (word ? " This reading is a " + word.toLowerCase() + "." : "")));
    card.appendChild(el("p", "exact", obs.date + " \u00b7 source value " + exactGrouped(obs.value) + " \u00b7 " + indicator.id));
    return card;
  }

  function historyPoints(indicatorId, code) {
    if (!AF.history || !AF.history[indicatorId] || !AF.history[indicatorId][code]) return [];
    return AF.history[indicatorId][code];
  }

  function lineChart(points, options) {
    var width = 640;
    var height = 220;
    var padL = 48;
    var padR = 16;
    var padT = 16;
    var padB = 36;
    var values = points.map(function (p) { return Number(p.value); });
    var minV = Math.min.apply(null, values);
    var maxV = Math.max.apply(null, values);
    if (minV === maxV) {
      minV -= 1;
      maxV += 1;
    }
    // pad range a little
    var span = maxV - minV;
    minV -= span * 0.08;
    maxV += span * 0.08;
    var innerW = width - padL - padR;
    var innerH = height - padT - padB;
    function xAt(i) {
      return padL + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
    }
    function yAt(v) {
      return padT + (1 - (v - minV) / (maxV - minV)) * innerH;
    }
    var path = points.map(function (p, i) {
      return (i === 0 ? "M" : "L") + xAt(i).toFixed(2) + " " + yAt(Number(p.value)).toFixed(2);
    }).join(" ");
    var zeroY = null;
    if (minV < 0 && maxV > 0) zeroY = yAt(0);

    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", options.label || "Line chart");
    svg.classList.add("chart-svg");

    function line(x1, y1, x2, y2, cls) {
      var n = document.createElementNS(ns, "line");
      n.setAttribute("x1", x1); n.setAttribute("y1", y1);
      n.setAttribute("x2", x2); n.setAttribute("y2", y2);
      n.setAttribute("class", cls);
      svg.appendChild(n);
    }
    line(padL, padT, padL, height - padB, "axis");
    line(padL, height - padB, width - padR, height - padB, "axis");
    if (zeroY != null) line(padL, zeroY, width - padR, zeroY, "zero");

    // y ticks
    [minV, (minV + maxV) / 2, maxV].forEach(function (v) {
      var y = yAt(v);
      var label = document.createElementNS(ns, "text");
      label.setAttribute("x", padL - 8);
      label.setAttribute("y", y + 4);
      label.setAttribute("text-anchor", "end");
      label.setAttribute("class", "tick");
      label.textContent = (Math.abs(v) >= 10 ? v.toFixed(0) : v.toFixed(1)) + "%";
      svg.appendChild(label);
    });

    // year labels: first, middle, last
    var yearIdx = [0];
    if (points.length > 2) yearIdx.push(Math.floor((points.length - 1) / 2));
    yearIdx.push(points.length - 1);
    var seen = {};
    yearIdx.forEach(function (i) {
      if (seen[i]) return;
      seen[i] = true;
      var label = document.createElementNS(ns, "text");
      label.setAttribute("x", xAt(i));
      label.setAttribute("y", height - 12);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "tick");
      label.textContent = points[i].year;
      svg.appendChild(label);
    });

    var pl = document.createElementNS(ns, "path");
    pl.setAttribute("d", path);
    pl.setAttribute("class", "line");
    svg.appendChild(pl);

    points.forEach(function (p, i) {
      var c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", xAt(i));
      c.setAttribute("cy", yAt(Number(p.value)));
      c.setAttribute("r", 3);
      c.setAttribute("class", "dot");
      var title = document.createElementNS(ns, "title");
      title.textContent = p.year + ": " + Number(p.value).toFixed(2) + "%";
      c.appendChild(title);
      svg.appendChild(c);
    });
    return svg;
  }

  function historyBlock(title, plain, points) {
    var card = el("article", "card chart-card");
    card.appendChild(el("h3", null, title));
    if (!points || points.length < 3) {
      card.appendChild(el("p", "plain", "There is not enough published history in this snapshot to draw a chart (need at least three years)."));
      return card;
    }
    card.appendChild(lineChart(points, { label: title }));
    var first = points[0];
    var last = points[points.length - 1];
    card.appendChild(el("p", "plain", plain + " From " + first.year + " to " + last.year + ", " + points.length + " published years are shown. Gaps with no World Bank value are left out, not filled in."));
    return card;
  }

  function fillCountry() {
    var root = document.getElementById("country-root");
    if (!root) return;
    function codeFromLocation() {
      var query = new URLSearchParams(window.location.search).get("c");
      if (query) return query.trim().toUpperCase();
      var hash = window.location.hash.replace("#", "").trim();
      return hash ? hash.toUpperCase() : "";
    }
    function draw() {
      root.innerHTML = "";
      var code = codeFromLocation();
      var country = countryByCode(code);
      if (!country) {
        root.appendChild(el("p", "kicker", "Countries"));
        root.appendChild(el("h1", null, "Choose a country"));
        root.appendChild(el("p", "lede", AF.countries.length + " economies are in this snapshot. Germany and France each appear on their own."));
        var picker = el("div", "picker");
        AF.countries.forEach(function (item) {
          var link = el("a", "card");
          link.href = "country.html?c=" + item.code;
          link.appendChild(el("span", "code", item.code));
          link.appendChild(el("strong", null, item.name));
          picker.appendChild(link);
        });
        root.appendChild(picker);
        document.title = "Countries · About Financials";
        return;
      }
      document.title = country.name + " · About Financials";
      var hero = el("header", "country-hero");
      hero.appendChild(el("p", "kicker", country.code));
      hero.appendChild(el("h1", null, country.name));
      hero.appendChild(el("p", "lede", country.note || "Annual World Bank figures for this country. Each card names the series and the year of the observation."));
      var back = el("p", "note");
      var backLink = el("a", null, "All indicators");
      backLink.href = "indicators.html";
      back.appendChild(backLink);
      back.appendChild(document.createTextNode(" · "));
      var all = el("a", null, "All countries");
      all.href = "country.html";
      back.appendChild(all);
      hero.appendChild(back);
      root.appendChild(hero);

      root.appendChild(el("h2", "cat-label", "Recent history"));
      var charts = el("div", "chart-grid");
      charts.appendChild(historyBlock(
        "GDP growth",
        "Real GDP growth after inflation, year by year.",
        historyPoints("NY.GDP.MKTP.KD.ZG", country.code)
      ));
      charts.appendChild(historyBlock(
        "Inflation",
        "Consumer-price inflation, year by year.",
        historyPoints("FP.CPI.TOTL.ZG", country.code)
      ));
      root.appendChild(charts);

      AF.categories.forEach(function (category) {
        root.appendChild(el("h2", "cat-label", category.name));
        var grid = el("div", "stat-grid");
        AF.indicators.filter(function (indicator) {
          return indicator.category === category.id;
        }).forEach(function (indicator) {
          grid.appendChild(statCard(indicator, country));
        });
        root.appendChild(grid);
      });
    }
    draw();
    window.addEventListener("hashchange", draw);
  }

  function riyadhKey(iso) {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Riyadh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(iso));
  }

  function riyadhHeading(key) {
    var parts = key.split("-");
    var utc = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 9, 0, 0));
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Riyadh",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(utc);
  }

  function riyadhTime(iso) {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Riyadh",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).format(new Date(iso));
  }

  function fillCalendar() {
    var root = document.getElementById("calendar-root");
    if (!root) return;
    var state = { impact: "key", currency: "ALL", q: "" };
    var count = document.getElementById("cal-count");
    var buttons = document.querySelectorAll("[data-impact]");
    var select = document.getElementById("cal-currency");
    var search = document.getElementById("cal-q");
    var currencies = [];
    AF.calendar.events.forEach(function (event) {
      if (currencies.indexOf(event.currency) === -1) currencies.push(event.currency);
    });
    currencies.sort();
    if (select) {
      currencies.forEach(function (code) {
        var option = document.createElement("option");
        option.value = code;
        option.textContent = code;
        select.appendChild(option);
      });
      select.addEventListener("change", function () {
        state.currency = select.value;
        draw();
      });
    }
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        state.impact = button.getAttribute("data-impact");
        buttons.forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        draw();
      });
    });
    if (search) {
      search.addEventListener("input", function () {
        state.q = search.value.trim().toLowerCase();
        draw();
      });
    }

    function allowed(event) {
      if (state.impact === "high" && event.impact !== "High") return false;
      if (state.impact === "key" && event.impact !== "High" && event.impact !== "Medium") return false;
      if (state.currency !== "ALL" && event.currency !== state.currency) return false;
      if (state.q && (event.title + " " + event.currency).toLowerCase().indexOf(state.q) === -1) return false;
      return true;
    }

    function draw() {
      root.innerHTML = "";
      var events = AF.calendar.events.filter(allowed);
      if (count) {
        count.textContent = "Showing " + events.length + " of " + AF.calendar.events.length + " events in the weekly file.";
      }
      if (!events.length) {
        var empty = el("div", "card empty");
        empty.appendChild(el("p", null, "Nothing in this file matches those filters."));
        root.appendChild(empty);
        return;
      }
      var groups = [];
      var map = {};
      events.forEach(function (event) {
        var key = riyadhKey(event.date);
        if (!map[key]) {
          map[key] = [];
          groups.push(key);
        }
        map[key].push(event);
      });
      groups.forEach(function (key) {
        var day = el("section", "card day");
        day.appendChild(el("h3", null, riyadhHeading(key)));
        map[key].forEach(function (event) {
          var row = el("article", "event");
          var when = el("div", "when");
          var past = new Date(event.date).getTime() < Date.now();
          when.appendChild(el("div", null, riyadhTime(event.date)));
          when.appendChild(el("div", null, past ? "Past" : "Upcoming"));
          when.title = "Source timestamp " + event.date;
          row.appendChild(when);
          var body = el("div");
          var badges = el("div", "badges");
          badges.appendChild(el("span", "badge" + (event.impact === "High" ? " high" : ""), event.impact));
          badges.appendChild(el("span", "badge", event.currency));
          body.appendChild(badges);
          body.appendChild(el("h4", null, event.title));
          var vals = el("div", "vals");
          [["Actual", "Not in this feed"], ["Forecast", event.forecast || "Not provided"], ["Previous", event.previous || "Not provided"]].forEach(function (pair) {
            var cell = el("div");
            cell.appendChild(el("span", null, pair[0]));
            var strong = el("strong", null, pair[1]);
            if (pair[0] === "Actual") strong.title = "The weekly JSON file has no actual field.";
            cell.appendChild(strong);
            vals.appendChild(cell);
          });
          body.appendChild(vals);
          row.appendChild(body);
          day.appendChild(row);
        });
        root.appendChild(day);
      });
    }
    draw();
  }

  setupNav();
  var page = document.body.getAttribute("data-page");
  if (page === "home") fillHome();
  if (page === "markets") fillMarkets();
  if (page === "indicators") fillIndicators();
  if (page === "country") fillCountry();
  if (page === "calendar") fillCalendar();
})();
