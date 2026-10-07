# About Financials

Static source for aboutfinancials.com. The production site is hosted on a Hostinger VPS and is deployed manually through CloudPanel; changes in this repository are not published automatically.

## Open it

From this folder:

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765

The pages are plain HTML, one shared stylesheet (`css/styles.css`), and browser-side scripts. Search, tables, country pages, history charts, the calendar, Company Intelligence, and the Business Plan Lab all run in the browser. There is no backend. Company briefs use `js/company-data.js` and `js/company.js`; the product direction and publication gates are recorded in [PRODUCT_ROADMAP.md](PRODUCT_ROADMAP.md).

## Saudi founder hub

- `index.html` is positioned for founders and small business owners in Saudi Arabia.
- `plan-saudi-restaurant.html` runs the shared Business Plan Lab engine in SAR with VAT-inclusive pricing (default 15%, sourced to ZATCA's VAT guideline, page 8; always user-editable).
- `founders.html`, `brief.html`, `partners.html` and the custom-plan form on `business-plans.html` collect submissions through `js/forms.js`.
- **Forms stay closed until an endpoint is set in `js/site-config.js`.** With an empty endpoint the form shows a notice and sends nothing. Any service that accepts a form POST and returns 2xx works (Formspree, Basin, Getform, or a newsletter provider's form endpoint).
- Pages without data use `js/site.js` for navigation instead of `js/app.js`, so they do not load the 1.4 MB data file.

## What is real

Figures were copied from named public APIs while this folder was built (4 October 2026, Riyadh). World Bank observations and IMF World Economic Outlook estimates are labelled separately, and a missing cell remains unavailable. See [SOURCES.md](SOURCES.md) for the source and fallback policy.

- **World Bank, World Development Indicators, API v2, `format=json`.** Snapshot uses `mrnev=1`, the most recent non-empty observation, and stores the actual observation year. Coverage follows the World Bank Countries API: 217 individual countries and economies, with aggregate regions and income groups excluded. The homepage keeps 17 featured economies; the Countries directory and indicator tables contain the complete source list.
- **IMF World Economic Outlook, DataMapper API v2.** A fallback is used only when World Bank `mrnev=1` has no numeric observation and only for the compatible inflation (`PCPIPCH`) and current-account (`BCA_NGDPD`) mappings documented in `SOURCES.md`. Every such value is labelled as an IMF WEO estimate.
- **History series** (embedded year/value pairs, null years omitted, not interpolated): `NY.GDP.MKTP.KD.ZG` (GDP growth, annual %) and `FP.CPI.TOTL.ZG` (inflation, consumer prices, annual %), up to the last 15 available years per country. Country pages draw a simple inline SVG line chart when at least three points exist.
- **Frankfurter, European Central Bank reference rates**, `https://api.frankfurter.app/latest?from=USD`, rate date **2 October 2026**. 29 currencies. A direct `to=SAR` request returned 404, so no SAR rate is shown.
- **Calendar:** a snapshot of Forex Factory’s public weekly JSON (`https://nfs.faireconomy.media/ff_calendar_thisweek.json`) for source dates 4 October 2026 through 9 October 2026. Forecast and previous are shown only when that file included them. The file has no released-actual field.

Rounded labels (trillions, two-decimal percents) are for reading. The exact source value is in the line under the figure and in the element’s title.

## Verify the embedded data

Run the read-only source verifier before reviewing a data update:

```bash
node scripts/verify-data.mjs
```

It checks every embedded World Bank observation, every IMF WEO fallback, every stored history point, the dated ECB/Frankfurter exchange-rate snapshot, and—while the same source week remains available—the Forex Factory calendar snapshot. It reports newer upstream observations as warnings and exits unsuccessfully when a stored value does not match its named source.

Verify Company Intelligence data and its internal reconciliations separately:

```bash
node scripts/verify-company-data.mjs
```

The company verifier reconciles segment totals, revenue groups and free cash flow, then checks every populated Amazon filing value against the filing-specific SEC document.

Verify the Business Plan Lab calculation engine separately:

```bash
node scripts/verify-business-plan.mjs
```

It checks base-case revenue and cost formulas, profit and loss states, break-even, opening funding, scenario changes and invalid-input behavior. It does not verify owner-entered assumptions; those require local evidence.

The rebuild script is portable across Windows, macOS, and Linux. It rewrites `js/data.js`, so use it only when intentionally preparing a reviewed data refresh:

```bash
node scripts/rebuild-data.mjs
```

## What is not built

- No automatic deployment to the live site.
- No economic calendar that updates by itself, and no actuals beyond what the weekly file contained.
- No streaming market quotes, accounts, or news. History charts are static SVG from the embedded World Bank series above, not a chart library.
- Company Intelligence contains a complete pilot Amazon brief and reusable editorial structure. Alphabet and Apple remain research frameworks, not complete briefs.
- Business Plan Lab includes a working U.S. restaurant feasibility model. It has no benchmark defaults: location, format, sales, costs, funding and sensitivity changes are user inputs, while every output is a reproducible calculation. State- and city-specific permits, wage rules, taxes, rent and supplier evidence still require local research before relying on a plan.
