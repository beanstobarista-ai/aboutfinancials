(function (root, factory) {
  var model = factory();
  if (typeof module === "object" && module.exports) module.exports = model;
  if (root) root.AFBusinessPlanModel = model;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var REQUIRED_NUMERIC_FIELDS = [
    "seats", "daysPerMonth", "coversPerDay", "averageCheck", "rent", "payroll",
    "utilities", "insurancePermits", "marketingAdmin", "foodCostPct",
    "transactionPct", "otherVariablePct", "openingInvestment", "workingCapital"
  ];

  function finiteNumber(value) {
    if (value === "" || value == null) return null;
    var number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function validate(input) {
    var errors = [];
    if (!String(input.city || "").trim()) errors.push("City is required.");
    if (!String(input.state || "").trim()) errors.push("Region, state or territory is required.");
    if (!String(input.format || "").trim()) errors.push("Restaurant format is required.");

    REQUIRED_NUMERIC_FIELDS.forEach(function (field) {
      var value = finiteNumber(input[field]);
      if (value == null) errors.push(field + " is required and must be numeric.");
    });

    ["seats", "daysPerMonth", "coversPerDay", "averageCheck"].forEach(function (field) {
      var value = finiteNumber(input[field]);
      if (value != null && value <= 0) errors.push(field + " must be greater than zero.");
    });
    if (finiteNumber(input.daysPerMonth) > 31) errors.push("daysPerMonth cannot exceed 31.");
    if (input.vatIncludedPct != null && String(input.vatIncludedPct).trim() !== "") {
      var vat = finiteNumber(input.vatIncludedPct);
      if (vat == null || vat < 0 || vat >= 100) errors.push("vatIncludedPct must be between 0 and 100.");
    }

    ["rent", "payroll", "utilities", "insurancePermits", "marketingAdmin", "foodCostPct", "transactionPct", "otherVariablePct", "openingInvestment", "workingCapital"].forEach(function (field) {
      var value = finiteNumber(input[field]);
      if (value != null && value < 0) errors.push(field + " cannot be negative.");
    });

    var variablePct = ["foodCostPct", "transactionPct", "otherVariablePct"].reduce(function (sum, field) {
      return sum + (finiteNumber(input[field]) || 0);
    }, 0);
    if (REQUIRED_NUMERIC_FIELDS.every(function (field) { return finiteNumber(input[field]) != null; }) && variablePct >= 100) {
      errors.push("Combined variable-cost percentages must be below 100% so contribution margin is positive.");
    }
    return errors;
  }

  function calculate(input) {
    var errors = validate(input);
    if (errors.length) return { ok: false, errors: errors };

    var numbers = {};
    REQUIRED_NUMERIC_FIELDS.forEach(function (field) { numbers[field] = finiteNumber(input[field]); });
    // Optional: the average check includes VAT at this rate (e.g. Saudi menu prices).
    // Sales are then measured net of VAT, and the VAT collected is shown separately.
    var vatIncludedPct = finiteNumber(input.vatIncludedPct) || 0;
    var vatFactor = 1 + vatIncludedPct / 100;
    var grossReceipts = numbers.coversPerDay * numbers.daysPerMonth * numbers.averageCheck;
    var sales = grossReceipts / vatFactor;
    var vatCollected = grossReceipts - sales;
    var variableRate = (numbers.foodCostPct + numbers.transactionPct + numbers.otherVariablePct) / 100;
    var variableCosts = sales * variableRate;
    var contribution = sales - variableCosts;
    var fixedCosts = numbers.rent + numbers.payroll + numbers.utilities + numbers.insurancePermits + numbers.marketingAdmin;
    var operatingResult = contribution - fixedCosts;
    var operatingMargin = sales === 0 ? null : operatingResult / sales;
    var contributionMargin = 1 - variableRate;
    var breakEvenSales = contributionMargin > 0 ? fixedCosts / contributionMargin : null;
    var breakEvenCoversPerDay = breakEvenSales == null ? null : breakEvenSales * vatFactor / numbers.daysPerMonth / numbers.averageCheck;
    var fundingEntered = numbers.openingInvestment + numbers.workingCapital;

    return {
      ok: true,
      inputs: numbers,
      vatIncludedPct: vatIncludedPct,
      grossReceipts: grossReceipts,
      vatCollected: vatCollected,
      sales: sales,
      variableRate: variableRate,
      variableCosts: variableCosts,
      contribution: contribution,
      contributionMargin: contributionMargin,
      fixedCosts: fixedCosts,
      operatingResult: operatingResult,
      operatingMargin: operatingMargin,
      coversPerSeatPerDay: numbers.coversPerDay / numbers.seats,
      breakEvenSales: breakEvenSales,
      breakEvenCoversPerDay: breakEvenCoversPerDay,
      annualizedOperatingResult: operatingResult * 12,
      fundingEntered: fundingEntered,
      simplePaybackMonths: operatingResult > 0 && fundingEntered > 0 ? fundingEntered / operatingResult : null
    };
  }

  function calculateScenario(baseInput, salesChangePct, foodCostChangePp) {
    var salesChange = finiteNumber(salesChangePct);
    var foodChange = finiteNumber(foodCostChangePp);
    if (salesChange == null || foodChange == null) return { ok: false, errors: ["Both scenario changes are required."] };
    var scenario = Object.assign({}, baseInput);
    scenario.coversPerDay = finiteNumber(baseInput.coversPerDay) * (1 + salesChange / 100);
    scenario.foodCostPct = finiteNumber(baseInput.foodCostPct) + foodChange;
    if (scenario.coversPerDay <= 0) return { ok: false, errors: ["Scenario sales change must leave positive demand."] };
    if (scenario.foodCostPct < 0) return { ok: false, errors: ["Scenario food cost cannot be below zero."] };
    var result = calculate(scenario);
    if (result.ok) {
      result.salesChangePct = salesChange;
      result.foodCostChangePp = foodChange;
      result.foodCostPct = scenario.foodCostPct;
    }
    return result;
  }

  return {
    requiredNumericFields: REQUIRED_NUMERIC_FIELDS.slice(),
    validate: validate,
    calculate: calculate,
    calculateScenario: calculateScenario
  };
});
