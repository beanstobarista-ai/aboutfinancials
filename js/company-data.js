(function (root) {
  "use strict";

  root.AFCompanyData = {
    embeddedAt: "2026-10-04T15:30:00+03:00",
    embeddedAtLabel: "4 October 2026",
    sources: {
      amzn2025: {
        label: "Amazon 2025 Form 10-K",
        publisher: "Amazon.com, Inc., filed with the US Securities and Exchange Commission",
        filingType: "Form 10-K",
        periodEnd: "2025-12-31",
        retrievedAt: "2026-10-04",
        url: "https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm"
      },
      amzn2026q2: {
        label: "Amazon Q2 2026 Form 10-Q",
        publisher: "Amazon.com, Inc., filed with the US Securities and Exchange Commission",
        filingType: "Form 10-Q",
        periodEnd: "2026-06-30",
        retrievedAt: "2026-10-04",
        url: "https://www.sec.gov/Archives/edgar/data/1018724/000101872426000026/amzn-20260630.htm"
      },
      fasb842: {
        label: "FASB Topic 842 project materials",
        publisher: "Financial Accounting Standards Board",
        retrievedAt: "2026-10-04",
        url: "https://fasb.org/projects/current-projects/leases-398331"
      }
    },
    companies: {
      AMZN: {
        code: "AMZN",
        name: "Amazon.com, Inc.",
        exchange: "Nasdaq",
        reportingCurrency: "USD",
        unit: "USD millions",
        latestPeriod: "Six months ended 30 June 2026",
        latestSourceKey: "amzn2026q2",
        description: "A portfolio of retail, marketplace, advertising, subscriptions, logistics, and cloud infrastructure businesses with sharply different economics.",
        summary: [
          { label: "Net sales", value: 382125, period: "H1 2026", section: "Statements of operations" },
          { label: "Operating income", value: 51313, period: "H1 2026", section: "Statements of operations" },
          { label: "AWS net sales", value: 79819, period: "H1 2026", section: "Note 8 — Segment information" },
          { label: "Free cash flow", value: -7604, period: "TTM to 30 Jun 2026", section: "Non-GAAP free cash flow reconciliation", nonGaap: true }
        ],
        segments: {
          periodPrior: "H1 2025",
          periodCurrent: "H1 2026",
          section: "Note 8 — Segment information",
          rows: [
            { name: "North America", salesPrior: 192955, salesCurrent: 220320, operatingIncomePrior: 13358, operatingIncomeCurrent: 17390 },
            { name: "International", salesPrior: 70274, salesCurrent: 81986, operatingIncomePrior: 2511, operatingIncomeCurrent: 3141 },
            { name: "AWS", salesPrior: 60140, salesCurrent: 79819, operatingIncomePrior: 21707, operatingIncomeCurrent: 30782 },
            { name: "Consolidated", salesPrior: 323369, salesCurrent: 382125, operatingIncomePrior: 37576, operatingIncomeCurrent: 51313, total: true }
          ]
        },
        revenueMix: {
          periodPrior: "H1 2025",
          periodCurrent: "H1 2026",
          section: "Note 8 — Net sales by groups of similar products and services",
          rows: [
            { name: "Online stores", prior: 118892, current: 134686 },
            { name: "Physical stores", prior: 11128, current: 11579 },
            { name: "Third-party seller services", prior: 76860, current: 88358 },
            { name: "Advertising services", prior: 29615, current: 37052 },
            { name: "Subscription services", prior: 23923, current: 27157 },
            { name: "AWS", prior: 60140, current: 79819 },
            { name: "Other", prior: 2811, current: 3474 }
          ]
        },
        cashFlow: {
          periodPrior: "TTM to 30 Jun 2025",
          periodCurrent: "TTM to 30 Jun 2026",
          section: "Non-GAAP free cash flow reconciliation",
          rows: [
            { name: "Operating cash flow", prior: 121137, current: 161403, gaap: true },
            { name: "Cash capital expenditure, net", prior: 102953, current: 169007, gaap: false },
            { name: "Free cash flow", prior: 18184, current: -7604, gaap: false }
          ]
        },
        balance: {
          period: "30 June 2026",
          rows: [
            { name: "Cash, cash equivalents and marketable securities", value: 122988, section: "Note 2 — Financial instruments" },
            { name: "Face value of long-term debt", value: 132995, section: "Note 5 — Debt" },
            { name: "Present value of lease liabilities", value: 109771, section: "Note 3 — Leases" },
            { name: "AWS property and equipment, net", value: 263750, section: "Note 8 — Segment information" },
            { name: "Consolidated property and equipment, net", value: 446046, section: "Note 8 — Segment information" }
          ]
        },
        commitments: {
          periodPrior: "31 Dec 2025",
          periodCurrent: "30 Jun 2026",
          section: "Note 4 — Commitments and contingencies",
          rows: [
            { name: "Leases not yet commenced", prior: 96373, current: 137214, accounting: "Not yet recognized as lease liabilities because commencement has not occurred." },
            { name: "Unconditional purchase obligations", prior: 84772, current: 130065, accounting: "Includes energy, content, property and equipment, and software agreements not reflected on the balance sheet." },
            { name: "Other commitments", prior: 18868, current: 18366, accounting: "A separate commitment category; not assumed to be interchangeable with leases or purchase obligations." },
            { name: "Financing obligations, including interest", prior: 9615, current: 11070, accounting: "Includes fulfillment-network and data-centre facilities; principal portions are already recorded as liabilities." }
          ]
        },
        contractedRevenue: {
          prior: 244000,
          current: 496000,
          priorPeriod: "31 Dec 2025",
          currentPeriod: "30 Jun 2026",
          priorLife: 4.1,
          currentLife: 6.4,
          approximate: true,
          section: "Note 1 — Revenue recognition; performance obligations primarily related to AWS"
        },
        earningsQuality: {
          period: "H1 2026",
          netIncome: 92902,
          operatingIncome: 51313,
          otherIncome: 69062,
          privateInvestmentUpwardAdjustments: 62814,
          section: "Statements of operations and Note 2 — Other income (expense), net"
        },
        capitalUpdate: {
          awsPpePrior: 190055,
          awsPpeCurrent: 263750,
          consolidatedPpeCurrent: 446046,
          periodPrior: "31 Dec 2025",
          periodCurrent: "30 Jun 2026",
          section: "Note 8 — Segment information"
        }
      }
    }
  };
})(typeof window !== "undefined" ? window : globalThis);

