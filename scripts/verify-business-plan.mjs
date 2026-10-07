import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const model = require("../js/business-plan-model.js");

const base = {
  city: "Test City",
  state: "Test State",
  format: "full-service",
  seats: 40,
  daysPerMonth: 25,
  coversPerDay: 80,
  averageCheck: 30,
  rent: 10000,
  payroll: 30000,
  utilities: 3000,
  insurancePermits: 2000,
  marketingAdmin: 5000,
  foodCostPct: 30,
  transactionPct: 3,
  otherVariablePct: 2,
  openingInvestment: 300000,
  workingCapital: 100000
};

const result = model.calculate(base);
assert.equal(result.ok, true);
assert.equal(result.sales, 60000);
assert.equal(result.variableCosts, 21000);
assert.equal(result.contribution, 39000);
assert.equal(result.fixedCosts, 50000);
assert.equal(result.operatingResult, -11000);
assert.equal(result.operatingMargin, -11000 / 60000);
assert.equal(result.breakEvenSales, 50000 / 0.65);
assert.equal(result.breakEvenCoversPerDay, (50000 / 0.65) / 25 / 30);
assert.equal(result.coversPerSeatPerDay, 2);
assert.equal(result.fundingEntered, 400000);
assert.equal(result.simplePaybackMonths, null);

const profitable = model.calculate({ ...base, coversPerDay: 120 });
assert.equal(profitable.ok, true);
assert.equal(profitable.sales, 90000);
assert.equal(profitable.operatingResult, 8500);
assert.equal(profitable.simplePaybackMonths, 400000 / 8500);

const downside = model.calculateScenario({ ...base, coversPerDay: 120 }, -10, 2);
assert.equal(downside.ok, true);
assert.equal(downside.sales, 81000);
assert.equal(downside.foodCostPct, 32);
assert.equal(downside.variableRate, 0.37);

assert.equal(model.calculate({ ...base, foodCostPct: 95 }).ok, false);
assert.equal(model.calculate({ ...base, city: "" }).ok, false);
assert.equal(model.calculate({ ...base, daysPerMonth: 32 }).ok, false);
assert.equal(model.calculateScenario(base, "", 2).ok, false);
assert.equal(model.calculateScenario(base, -101, 2).ok, false);
assert.equal(model.calculateScenario(base, 10, -31).ok, false);

// VAT-inclusive prices (Saudi model): 15% standard rate per ZATCA guideline.
const vatCase = model.calculate({ ...base, coversPerDay: 120, averageCheck: 46, vatIncludedPct: 15 });
assert.equal(vatCase.ok, true);
assert.equal(vatCase.grossReceipts, 120 * 25 * 46);
assert.ok(Math.abs(vatCase.sales - 120000) < 1e-6);
assert.ok(Math.abs(vatCase.vatCollected - 18000) < 1e-6);
assert.ok(Math.abs(vatCase.variableCosts - 42000) < 1e-6);
assert.ok(Math.abs(vatCase.operatingResult - 28000) < 1e-6);
assert.ok(Math.abs(vatCase.breakEvenCoversPerDay - (50000 / 0.65) * 1.15 / 25 / 46) < 1e-9);
assert.equal(model.calculate({ ...base, vatIncludedPct: "" }).vatCollected, 0);
assert.equal(model.calculate({ ...base, vatIncludedPct: -1 }).ok, false);
assert.equal(model.calculate({ ...base, vatIncludedPct: 100 }).ok, false);

console.log("Business Plan Lab verification passed: base model, profit/loss, break-even, funding, scenarios and VAT-inclusive pricing.");
