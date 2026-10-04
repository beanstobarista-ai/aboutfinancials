# Source policy

Every displayed number must retain a named publisher, dataset, source series, observation year or date, raw source value, retrieval timestamp, unit, and status. A missing observation is never converted to zero, interpolated, or silently replaced.

## World Bank World Development Indicators

- Publisher: World Bank.
- Endpoint: `https://api.worldbank.org/v2`.
- Snapshot request: `format=json&mrnev=1`, which asks for the most recent non-empty observation.
- Update cadence: varies by indicator and reporting economy.
- Geography: the 217 individual countries and economies returned by the Countries API; aggregate regions and income groups are excluded.
- Units: defined by each stored WDI series.
- Missing-data behavior: if `mrnev=1` has no numeric observation, the value remains unavailable unless an approved compatible fallback below has a value.
- Display status: `source-observation`.

Older observations keep their actual year. The interface labels observations more than three calendar years older than the dataset build as older, and observations more than six years older as historical.

## IMF World Economic Outlook fallback

- Publisher: International Monetary Fund.
- Dataset: the release name returned by the IMF DataMapper indicator metadata, currently World Economic Outlook.
- Endpoint: `https://www.imf.org/external/datamapper/api/v2/{series}`.
- API documentation: `https://www.imf.org/external/datamapper/api/`.
- Usage terms: `https://www.imf.org/en/about/copyright-and-terms`.
- Update cadence: normally twice yearly, in April and September/October.
- Geography: IMF WEO countries and economies; availability varies by indicator.
- Units: indicator-specific. AboutFinancials enables only fallback series with the same displayed percentage unit and a compatible concept.
- Missing-data behavior: the newest numeric value no later than the prior calendar year is considered. If none exists, the value remains unavailable.
- Display status: `estimate`. The site does not present a WEO fallback as a nationally reported observation.

The IMF permits reuse and distribution of published statistical data with accurate attribution and preservation of data integrity. The IMF terms also ask users considering commercial reuse to contact `copyright@imf.org` for permission.

### Enabled mappings

| AboutFinancials indicator | IMF WEO series | Compatibility rule |
| --- | --- | --- |
| `FP.CPI.TOTL.ZG` — inflation, consumer prices (annual %) | `PCPIPCH` — inflation rate, average consumer prices | Use only when WDI has no non-empty observation; store and show it as an IMF WEO estimate. |
| `BN.CAB.XOKA.GD.ZS` — current account balance (% of GDP) | `BCA_NGDPD` — current account balance, percent of GDP | Use only when WDI has no non-empty observation; store and show it as an IMF WEO estimate. |

### Explicitly rejected substitutions

- IMF WEO general-government debt is not substituted for the World Bank central-government debt series.
- IMF WEO general-government revenue or balance is not silently substituted for a differently scoped World Bank fiscal series.
- IMF WEO unemployment is not substituted for the site’s explicitly modelled ILO unemployment series.
- Values from different sources are not combined to manufacture exports, imports, broad money, tax revenue, or a real interest rate.

## Other approved existing sources

- Exchange rates: Frankfurter API values based on European Central Bank reference rates. These are dated reference rates, not live market quotes.
- Economic calendar: a saved Forex Factory weekly public JSON file. It is a snapshot, not a live feed, and contains no released-actual field.

## Public-company filings and accounting standards

### US Securities and Exchange Commission EDGAR

- Publisher: US Securities and Exchange Commission; underlying filings are submitted by the named registrant.
- Source: filing-specific HTML documents in `https://www.sec.gov/Archives/edgar/data/`.
- Usage terms and access policy: `https://www.sec.gov/about/webmaster-frequently-asked-questions` and `https://www.sec.gov/privacy`.
- Update cadence: event-driven according to each registrant's filing obligations.
- Geography: public-company analysis begins with SEC registrants; the issuer and reporting jurisdiction are identified in each brief.
- Units: exactly as reported in the filing. Any scaling or ratio calculation must retain the raw filing values and calculation inputs.
- Missing-data behavior: an omitted or unclear disclosure remains unavailable. No value is inferred from another company, period, or secondary summary.
- Display status: `reported-fact` for a filing value, `calculation` for a reproducible AboutFinancials computation, `interpretation` for editorial analysis, and `scenario` for an explicitly hypothetical result.

The initial Company Intelligence research preview uses these filing-specific primary sources:

- Alphabet Q3 2025 Form 10-Q: `https://www.sec.gov/Archives/edgar/data/1652044/000165204425000091/goog-20250930.htm`.
- Amazon 2025 Form 10-K: `https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm`.
- Apple 2025 Form 10-K: `https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm`.
- Microsoft 2025 Form 10-K: `https://www.sec.gov/Archives/edgar/data/789019/000095017025100235/msft-20250630.htm`.
- Oracle 2025 Form 10-K: `https://www.sec.gov/Archives/edgar/data/1341439/000095017025087926/orcl-20250531.htm`.

### Financial Accounting Standards Board

- Publisher: Financial Accounting Standards Board.
- Source: official standards and project materials at `https://fasb.org/`.
- Purpose: accounting context and definitions, not company-specific financial values.
- Update cadence: standards and project-specific amendments.
- Missing-data behavior: an accounting conclusion is not published when the applicable facts or authoritative guidance have not been established.

The initial lease-accounting explanation links to the official Topic 842 project materials at `https://fasb.org/projects/current-projects/leases-398331`.

## Business Plan Lab source rule

A business-plan blueprint contains no financial output until its geography, currency, reference date, scale, and operating model are specified. Each plan then receives its own source register covering official regulators and statistical publishers, documented supplier quotations, proposed contractual terms, and owner assumptions. External evidence, owner assumptions, and calculated model results are never combined under one label.

## Future candidates

ILOSTAT, IMF topic datasets, UN National Accounts, OECD Global Revenue Statistics, and national statistical offices remain candidates for additional adapters. A candidate is not used until its definition, endpoint, terms, cadence, geography, unit, missing-data behavior, country-code mapping, and full-record verification are implemented and reviewed.
