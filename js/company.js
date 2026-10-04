(function () {
  "use strict";

  var DB = window.AFCompanyData;
  var root = document.getElementById("company-root");
  if (!DB || !root) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function money(value, digits) {
    var n = Number(value);
    var sign = n < 0 ? "−" : "";
    return sign + "$" + (Math.abs(n) / 1000).toLocaleString("en-US", {
      minimumFractionDigits: digits == null ? 1 : digits,
      maximumFractionDigits: digits == null ? 1 : digits
    }) + "bn";
  }

  function raw(value) {
    return (value < 0 ? "−" : "") + "$" + Math.abs(value).toLocaleString("en-US") + " million";
  }

  function pct(value, digits) {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: digits == null ? 1 : digits,
      maximumFractionDigits: digits == null ? 1 : digits
    }) + "%";
  }

  function growth(current, prior) {
    return (current / prior - 1) * 100;
  }

  function sourceLink(key, label) {
    var source = DB.sources[key];
    var link = el("a", null, label || source.label);
    link.href = source.url;
    return link;
  }

  function sourceNote(section, key, detail) {
    var source = DB.sources[key];
    var p = el("p", "table-source");
    p.appendChild(document.createTextNode("Source: "));
    p.appendChild(sourceLink(key));
    p.appendChild(document.createTextNode(" · " + section + " · units: USD millions · retrieved " + source.retrievedAt + ". " + detail));
    return p;
  }

  function sourceCaption(section, key) {
    return sourceNote(section, key, "Displayed billions are rounded; exact filing values appear in the table.");
  }

  function tableHead(labels) {
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    labels.forEach(function (label) { tr.appendChild(el("th", null, label)); });
    thead.appendChild(tr);
    return thead;
  }

  function metricCell(value, secondary) {
    var td = document.createElement("td");
    td.appendChild(el("strong", "table-figure", money(value)));
    td.appendChild(el("span", "exact", secondary || raw(value)));
    return td;
  }

  function buildTable(title, intro, labels, rows, caption) {
    var section = el("section", "company-section");
    section.appendChild(el("h2", null, title));
    if (intro) section.appendChild(el("p", "lede", intro));
    var card = el("div", "card company-table-card");
    var scroller = el("div", "table-scroll");
    var table = document.createElement("table");
    table.appendChild(tableHead(labels));
    var tbody = document.createElement("tbody");
    rows.forEach(function (cells) {
      var tr = document.createElement("tr");
      cells.forEach(function (cell) {
        tr.appendChild(cell instanceof Node ? cell : el("td", null, cell));
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    scroller.appendChild(table);
    card.appendChild(scroller);
    card.appendChild(caption);
    section.appendChild(card);
    return section;
  }

  function insightCard(label, title, text) {
    var card = el("article", "card insight-card");
    card.appendChild(el("p", "evidence-label", label));
    card.appendChild(el("h3", null, title));
    card.appendChild(el("p", null, text));
    return card;
  }

  function renderAmazon(company) {
    document.title = "Amazon company brief · About Financials";

    var head = el("header", "company-detail-head");
    head.appendChild(el("p", "kicker", company.exchange + " · " + company.code));
    head.appendChild(el("h1", null, company.name));
    head.appendChild(el("p", "lede", company.description));
    var meta = el("p", "company-meta");
    meta.appendChild(document.createTextNode("Latest incorporated filing: "));
    meta.appendChild(sourceLink(company.latestSourceKey));
    meta.appendChild(document.createTextNode(" · period ended 30 June 2026 · reviewed 4 October 2026"));
    head.appendChild(meta);
    var back = el("p", "note");
    var backLink = el("a", null, "All companies");
    backLink.href = "companies.html";
    back.appendChild(backLink);
    head.appendChild(back);
    root.appendChild(head);

    var summary = el("section", "summary-grid");
    company.summary.forEach(function (item) {
      var card = el("article", "card summary-card");
      card.appendChild(el("p", "evidence-label", item.period + (item.nonGaap ? " · company-defined non-GAAP" : " · reported fact")));
      card.appendChild(el("h2", null, item.label));
      card.appendChild(el("p", "summary-number", money(item.value)));
      card.appendChild(el("p", "exact", raw(item.value) + " · " + item.section));
      summary.appendChild(card);
    });
    root.appendChild(summary);

    var exec = el("section", "company-section");
    exec.appendChild(el("p", "kicker", "Executive read"));
    exec.appendChild(el("h2", null, "Growth accelerated, while capital intensity rose faster"));
    var bullets = el("div", "executive-grid");
    bullets.appendChild(insightCard("AboutFinancials calculation", "Operating momentum", "H1 net sales grew " + pct(growth(382125, 323369)) + " and operating income grew " + pct(growth(51313, 37576)) + " versus H1 2025."));
    bullets.appendChild(insightCard("AboutFinancials calculation", "AWS concentration", "AWS supplied " + pct(79819 / 382125 * 100) + " of H1 sales but " + pct(30782 / 51313 * 100) + " of segment operating income. Its H1 operating margin was " + pct(30782 / 79819 * 100) + "."));
    bullets.appendChild(insightCard("Reported facts + calculation", "Cash absorbed by the build", "Trailing operating cash flow rose " + pct(growth(161403, 121137)) + ", but net cash capital expenditure rose " + pct(growth(169007, 102953)) + ", moving company-defined free cash flow from " + money(18184) + " to " + money(-7604) + "."));
    bullets.appendChild(insightCard("Interpretation", "The central question", "Demand commitments and capacity obligations are both expanding. The business outlook increasingly depends on utilization, contract conversion, asset life, and the return earned on the infrastructure being built."));
    exec.appendChild(bullets);
    root.appendChild(exec);

    var segmentRows = company.segments.rows.map(function (row) {
      var marginPrior = row.operatingIncomePrior / row.salesPrior * 100;
      var marginCurrent = row.operatingIncomeCurrent / row.salesCurrent * 100;
      return [
        el("td", row.total ? "row-total" : null, row.name),
        metricCell(row.salesCurrent),
        el("td", null, pct(growth(row.salesCurrent, row.salesPrior))),
        metricCell(row.operatingIncomeCurrent),
        el("td", null, pct(marginCurrent) + " (" + (marginCurrent >= marginPrior ? "+" : "") + Math.round((marginCurrent - marginPrior) * 100) + " bps)")
      ];
    });
    root.appendChild(buildTable(
      "Three segments, very different economics",
      "The stores businesses generate most sales; AWS generates most operating income. Margins are calculated from the exact segment values in the filing.",
      ["Segment", "H1 2026 sales", "Sales growth", "H1 2026 operating income", "Operating margin"],
      segmentRows,
      sourceCaption(company.segments.section, company.latestSourceKey)
    ));

    var mixRows = company.revenueMix.rows.map(function (row) {
      return [
        el("td", null, row.name),
        metricCell(row.current),
        el("td", null, pct(growth(row.current, row.prior))),
        el("td", null, pct(row.current / 382125 * 100))
      ];
    });
    root.appendChild(buildTable(
      "How Amazon makes its revenue",
      "The fastest large revenue engines in H1 2026 were AWS and advertising. Amazon does not disclose operating profit by these product groups, so their individual margins remain unavailable.",
      ["Revenue group", "H1 2026", "Year-on-year growth", "Share of sales"],
      mixRows,
      sourceCaption(company.revenueMix.section, company.latestSourceKey)
    ));

    var cashRows = company.cashFlow.rows.map(function (row) {
      return [
        el("td", null, row.name),
        metricCell(row.prior),
        metricCell(row.current),
        el("td", null, row.prior > 0 && row.current > 0 ? pct(growth(row.current, row.prior)) : "Moved below zero"),
        el("td", "source-cell", row.gaap ? "GAAP cash-flow measure" : "Company-defined non-GAAP component")
      ];
    });
    root.appendChild(buildTable(
      "Cash generation versus infrastructure spending",
      "Amazon defines free cash flow as operating cash flow less purchases of property and equipment, net of proceeds and incentives. It is useful here, but it is not residual cash available for every purpose.",
      ["Measure", company.cashFlow.periodPrior, company.cashFlow.periodCurrent, "Change", "Status"],
      cashRows,
      sourceCaption(company.cashFlow.section, company.latestSourceKey)
    ));

    var commitmentsRows = company.commitments.rows.map(function (row) {
      return [
        el("td", null, row.name),
        metricCell(row.prior),
        metricCell(row.current),
        el("td", null, pct(growth(row.current, row.prior))),
        el("td", "source-cell", row.accounting)
      ];
    });
    root.appendChild(buildTable(
      "Commitments expanded in six months",
      "These categories have different recognition rules and cannot be added to balance-sheet debt without adjustment. The comparison below uses the same commitment categories in the June filing.",
      ["Commitment category", company.commitments.periodPrior, company.commitments.periodCurrent, "Change", "Accounting context"],
      commitmentsRows,
      sourceCaption(company.commitments.section, company.latestSourceKey)
    ));

    var contracted = el("section", "company-section");
    contracted.appendChild(el("h2", null, "Customer commitments grew alongside capacity commitments"));
    contracted.appendChild(el("p", "lede", "Long-term customer performance obligations, primarily related to AWS, more than doubled while their weighted-average remaining life lengthened. This is evidence of contracted demand, not guaranteed recognized revenue or a direct hedge for every infrastructure commitment."));
    var compare = el("div", "card compare-card");
    var left = el("div");
    left.appendChild(el("p", "evidence-label", company.contractedRevenue.priorPeriod));
    left.appendChild(el("p", "compare-number", "≈" + money(company.contractedRevenue.prior)));
    left.appendChild(el("p", "plain", company.contractedRevenue.priorLife + "-year weighted-average remaining life"));
    var right = el("div");
    right.appendChild(el("p", "evidence-label", company.contractedRevenue.currentPeriod));
    right.appendChild(el("p", "compare-number", "≈" + money(company.contractedRevenue.current)));
    right.appendChild(el("p", "plain", company.contractedRevenue.currentLife + "-year weighted-average remaining life"));
    compare.appendChild(left);
    compare.appendChild(right);
    contracted.appendChild(compare);
    contracted.appendChild(sourceNote(company.contractedRevenue.section, company.latestSourceKey, "The filing reports both amounts as approximate; they are shown here without adding false precision."));
    root.appendChild(contracted);

    var balanceRows = company.balance.rows.map(function (row) {
      return [el("td", null, row.name), metricCell(row.value), el("td", "source-cell", row.section)];
    });
    root.appendChild(buildTable(
      "Capital position at 30 June 2026",
      "Liquidity remained substantial, but debt and productive assets also expanded. These are reported balances, not a net-debt or valuation conclusion.",
      ["Reported balance", "Value", "Filing location"],
      balanceRows,
      sourceCaption("Notes 2, 3, 5 and 8", company.latestSourceKey)
    ));

    var quality = el("section", "company-section");
    quality.appendChild(el("p", "kicker", "Earnings-quality lens"));
    quality.appendChild(el("h2", null, "H1 net income is not a clean proxy for operating performance"));
    quality.appendChild(el("p", "lede", "Amazon reported " + money(company.earningsQuality.netIncome) + " of H1 net income, but also " + money(company.earningsQuality.otherIncome) + " of non-operating income. The filing attributes " + money(company.earningsQuality.privateInvestmentUpwardAdjustments) + " to upward adjustments on private-company equity investments, primarily Anthropic."));
    var qCallout = el("div", "card callout interpretation-callout");
    qCallout.appendChild(el("p", null, "Interpretation: operating income, cash flow, and segment economics provide a cleaner view of the operating business for this period than headline net income alone. The investment gains are reported earnings, but they are not recurring operating revenue."));
    quality.appendChild(qCallout);
    quality.appendChild(sourceNote(company.earningsQuality.section, company.latestSourceKey, "Displayed billions are rounded from the exact filing values stored in the data file."));
    root.appendChild(quality);

    var angles = el("section", "company-section");
    angles.appendChild(el("p", "kicker", "Interesting angles"));
    angles.appendChild(el("h2", null, "Questions worth carrying into the next filing"));
    var angleGrid = el("div", "framework-grid company-angle-grid");
    angleGrid.appendChild(insightCard("Economics", "Can AWS absorb the build?", "AWS property and equipment grew " + pct(growth(company.capitalUpdate.awsPpeCurrent, company.capitalUpdate.awsPpePrior)) + " in six months and represented " + pct(company.capitalUpdate.awsPpeCurrent / company.capitalUpdate.consolidatedPpeCurrent * 100) + " of consolidated property and equipment. Watch revenue growth, margin, depreciation, and utilization together."));
    angleGrid.appendChild(insightCard("Contract structure", "How firm is contracted demand?", "The performance-obligation figure is meaningful, but the filing does not prove that its timing, cancellation terms, pricing, or capacity needs match each lease and purchase commitment."));
    angleGrid.appendChild(insightCard("Cash flow", "Is negative free cash flow transitional?", "The build may create future capacity and revenue, but continued capital expenditure above operating cash flow would reduce financial flexibility and raise the importance of financing terms."));
    angleGrid.appendChild(insightCard("Balance sheet", "Debt has become part of the build", "The face value of long-term debt rose from " + money(68836) + " at year-end 2025 to " + money(132995) + " at June 2026. Watch interest expense and the maturity profile alongside liquidity."));
    angleGrid.appendChild(insightCard("Accounting", "Asset lives may matter more", "The 2025 annual filing shortened the useful life of a subset of servers from six years to five because of faster AI and machine-learning development. Faster obsolescence can raise depreciation or impairment risk."));
    angleGrid.appendChild(insightCard("Earnings quality", "Separate operations from investments", "Private-company valuation movements materially affected H1 earnings. Track operating income and investment remeasurements separately before forming a view on repeatable profitability."));
    angles.appendChild(angleGrid);
    root.appendChild(angles);

    var scenario = el("section", "company-section");
    scenario.appendChild(el("p", "kicker", "Scenario framework · no forecast assigned"));
    scenario.appendChild(el("h2", null, "What would change the interpretation"));
    var scenarioGrid = el("div", "analysis-chain");
    scenarioGrid.appendChild(insightCard("Scenario", "Productive build", "AWS growth and contracted demand convert into revenue, utilization stays high, and operating cash flow catches up with infrastructure spending."));
    scenarioGrid.appendChild(insightCard("Scenario", "Long absorption", "Demand grows, but more slowly than capacity and commitments. Free cash flow remains pressured while depreciation and financing costs rise."));
    scenarioGrid.appendChild(insightCard("Scenario", "Obsolescence pressure", "Technology cycles shorten further, requiring faster replacement, shorter useful lives, or impairments before committed capacity earns its intended return."));
    scenario.appendChild(scenarioGrid);
    scenario.appendChild(el("p", "method-note", "These are analytical scenarios, not company guidance, forecasts, probabilities, or valuation conclusions. Numerical scenarios will be added only when their assumptions are explicitly defined and reviewed."));
    root.appendChild(scenario);

    var sources = el("section", "company-section source-register");
    sources.appendChild(el("p", "kicker", "Source and method ledger"));
    sources.appendChild(el("h2", null, "Reproduce this brief"));
    Object.keys(DB.sources).forEach(function (key) {
      var source = DB.sources[key];
      var card = el("article", "card source-card");
      card.appendChild(sourceLink(key, source.label));
      card.appendChild(el("p", null, source.publisher + (source.periodEnd ? " · period ended " + source.periodEnd : "") + " · retrieved " + source.retrievedAt + "."));
      sources.appendChild(card);
    });
    sources.appendChild(el("p", "method-note", "All company values are stored in USD millions. Percentages are calculated from the exact filing values before rounding to one decimal place. Missing product-level profit and contract-term details remain unavailable; they are not estimated."));
    root.appendChild(sources);
  }

  var code = (new URLSearchParams(window.location.search).get("c") || "AMZN").toUpperCase();
  var company = DB.companies[code];
  if (!company) {
    root.appendChild(el("h1", null, "Company not available"));
    root.appendChild(el("p", "lede", "This company has not yet passed the AboutFinancials source and editorial review."));
    return;
  }
  renderAmazon(company);
})();
