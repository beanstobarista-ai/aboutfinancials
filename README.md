# About Financials — local prototype

Static pages for a future aboutfinancials.com. Nothing here talks to WordPress or the live domain.

## Open it

From this folder:

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765

The pages are plain HTML, one shared stylesheet (`css/styles.css`), and two scripts (`js/data.js`, `js/app.js`). Search, tables, country pages, history charts, and the calendar all run in the browser from the embedded file. There is no backend.

## What is real

Figures were copied from public APIs while this folder was built (3 October 2026, Riyadh). They are not estimated, and a missing cell was left blank.

- **World Bank, World Development Indicators, API v2, `format=json`.** Snapshot uses `mrv=1` and stores the observation year the API returned. Countries (17): Saudi Arabia (SA), United States (US), China (CN), Germany (DE), India (IN), Japan (JP), United Kingdom (GB), United Arab Emirates (AE), France (FR), South Korea (KR), Brazil (BR), Canada (CA), Australia (AU), South Africa (ZA), Türkiye (TR), Indonesia (ID), Mexico (MX). Germany and France each have their own country card.
- **History series** (embedded year/value pairs, null years omitted, not interpolated): `NY.GDP.MKTP.KD.ZG` (GDP growth, annual %) and `FP.CPI.TOTL.ZG` (inflation, consumer prices, annual %), up to the last 15 available years per country. Country pages draw a simple inline SVG line chart when at least three points exist.
- **Frankfurter, European Central Bank reference rates**, `https://api.frankfurter.app/latest?from=USD`, rate date **2 October 2026**. 29 currencies. A direct `to=SAR` request returned 404, so no SAR rate is shown.
- **Calendar:** a snapshot of Forex Factory’s public weekly JSON (`https://nfs.faireconomy.media/ff_calendar_thisweek.json`) for source dates 27 September 2026 through 3 October 2026. Forecast and previous are shown only when that file included them. The file has no released-actual field.

Rounded labels (trillions, two-decimal percents) are for reading. The exact source value is in the line under the figure and in the element’s title.

## What is not built

- No deploy to the live WordPress site.
- No economic calendar that updates by itself, and no actuals beyond what the weekly file contained.
- No streaming market quotes, accounts, or news. History charts are static SVG from the embedded World Bank series above, not a chart library.
