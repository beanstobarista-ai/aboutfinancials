(function () {
  "use strict";
  var model = window.AFBusinessPlanModel;
  var form = document.getElementById("restaurant-model");
  if (!model || !form) return;

  var currencyCode = form.getAttribute("data-currency") || "USD";
  var currency = new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode, maximumFractionDigits: 0 });
  var decimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
  var percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });
  var errorsBox = document.getElementById("form-errors");

  function values() {
    var result = {};
    new FormData(form).forEach(function (value, key) { result[key] = value; });
    return result;
  }

  function money(value) { return value == null || !Number.isFinite(value) ? "Unavailable" : currency.format(value); }
  function pct(value) { return value == null || !Number.isFinite(value) ? "Unavailable" : percent.format(value); }
  function number(value) { return value == null || !Number.isFinite(value) ? "Unavailable" : decimal.format(value); }

  function setText(id, text) {
    var node = document.getElementById(id);
    if (node) node.textContent = text;
  }

  function showErrors(errors) {
    if (!errors.length) {
      errorsBox.hidden = true;
      errorsBox.innerHTML = "";
      return;
    }
    var friendly = errors.map(function (message) {
      return message
        .replace("vatIncludedPct", "VAT included in prices")
        .replace("daysPerMonth", "Operating days per month")
        .replace("coversPerDay", "Customer covers per day")
        .replace("averageCheck", "Average check")
        .replace("insurancePermits", "Insurance and permits")
        .replace("marketingAdmin", "Marketing and administration")
        .replace("foodCostPct", "Food and beverage cost")
        .replace("transactionPct", "Card and delivery fees")
        .replace("otherVariablePct", "Other variable costs")
        .replace("openingInvestment", "Fit-out, equipment and pre-opening")
        .replace("workingCapital", "Working-capital reserve")
        .replace("seats", "Seats")
        .replace("rent", "Rent and occupancy")
        .replace("payroll", "Payroll and payroll taxes")
        .replace("utilities", "Utilities");
    });
    errorsBox.innerHTML = "<strong>Model not calculated</strong><ul>" + friendly.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul>";
    errorsBox.hidden = false;
  }

  function resetOutputs() {
    ["result-sales", "result-vat", "result-profit", "result-margin", "result-break-even-sales", "result-break-even-covers", "result-seat-use", "result-funding"].forEach(function (id) { setText(id, "Unavailable"); });
    setText("result-context", "Enter all required assumptions to calculate the model.");
    var bridge = document.querySelectorAll("#calculation-bridge dd");
    bridge.forEach(function (node) { node.textContent = "Unavailable"; });
    var warning = document.getElementById("result-warning");
    warning.hidden = true;
    warning.textContent = "";
  }

  function renderScenarioRow(name, label, result, baseInput) {
    var row = document.querySelector('[data-case="' + name + '"]');
    if (!row) return;
    row.innerHTML = "";
    var heading = document.createElement("th");
    heading.scope = "row";
    heading.textContent = label;
    row.appendChild(heading);
    if (!result || !result.ok) {
      var missing = document.createElement("td");
      missing.colSpan = 5;
      missing.textContent = name === "base" ? "Complete the required inputs to calculate." : "Enter valid " + name + " changes to calculate.";
      row.appendChild(missing);
      return;
    }
    var salesLabel = name === "base" ? "Base input" : (result.salesChangePct > 0 ? "+" : "") + number(result.salesChangePct) + "%";
    var foodLabel = name === "base" ? number(Number(baseInput.foodCostPct)) + "%" : number(result.foodCostPct) + "% (" + (result.foodCostChangePp > 0 ? "+" : "") + number(result.foodCostChangePp) + " pp)";
    [salesLabel, foodLabel, money(result.sales), money(result.operatingResult), pct(result.operatingMargin)].forEach(function (text) {
      var cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });
  }

  function draw() {
    var input = values();
    var result = model.calculate(input);
    var hasAnyValue = Array.from(form.elements).some(function (field) { return field.name && String(field.value || "").trim(); });
    if (!result.ok) {
      resetOutputs();
      showErrors(hasAnyValue ? result.errors : []);
      renderScenarioRow("downside", "Downside", null, input);
      renderScenarioRow("base", "Base", null, input);
      renderScenarioRow("upside", "Upside", null, input);
      return;
    }

    showErrors([]);
    var location = [input.city.trim(), input.state.trim()].join(", ");
    var name = input.planName.trim();
    setText("result-context", (name ? name + " · " : "") + location + " · " + currencyCode + " per month" + (result.vatIncludedPct ? ", sales net of VAT" : ""));
    setText("result-sales", money(result.sales));
    setText("result-vat", money(result.vatCollected));
    setText("result-profit", money(result.operatingResult));
    setText("result-margin", pct(result.operatingMargin));
    setText("result-break-even-sales", money(result.breakEvenSales));
    setText("result-break-even-covers", number(result.breakEvenCoversPerDay));
    setText("result-seat-use", number(result.coversPerSeatPerDay));
    setText("result-funding", money(result.fundingEntered));

    var bridge = document.querySelectorAll("#calculation-bridge dd");
    [money(result.sales), "−" + money(result.variableCosts), money(result.contribution), "−" + money(result.fixedCosts), money(result.operatingResult)].forEach(function (text, index) {
      bridge[index].textContent = text;
    });

    var warning = document.getElementById("result-warning");
    warning.hidden = false;
    if (result.operatingResult <= 0) {
      warning.textContent = "This input set produces a monthly operating loss. Simple payback is unavailable.";
    } else if (result.simplePaybackMonths == null) {
      warning.textContent = "The model is operating-profit positive. Simple payback is unavailable because no opening funding was entered.";
    } else {
      warning.textContent = "Annualized operating result: " + money(result.annualizedOperatingResult) + ". Simple payback on the opening funding entered: " + number(result.simplePaybackMonths) + " months. Both assume the same monthly inputs continue and exclude financing, tax and depreciation.";
    }

    renderScenarioRow("base", "Base", result, input);
    renderScenarioRow("downside", "Downside", model.calculateScenario(input, input.downsideSalesPct, input.downsideFoodPp), input);
    renderScenarioRow("upside", "Upside", model.calculateScenario(input, input.upsideSalesPct, input.upsideFoodPp), input);
  }

  form.addEventListener("input", draw);
  form.addEventListener("change", draw);
  document.getElementById("clear-plan").addEventListener("click", function () {
    form.reset();
    draw();
    form.querySelector("input, select").focus();
  });
  document.getElementById("print-plan").addEventListener("click", function () { window.print(); });
  draw();
})();
