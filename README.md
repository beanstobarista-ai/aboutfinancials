# About Financials

Static source for aboutfinancials.com. The production site is hosted on a Hostinger VPS and is deployed manually through CloudPanel; changes in this repository are not published automatically.

## Open it

From this folder:

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765

The pages are plain HTML, one shared stylesheet (`css/styles.css`), and two scripts (`js/data.js`, `js/app.js`). Search, tables, country pages, history charts, and the calendar all run in the browser from the embedded file. There is no backend.

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

The rebuild script is portable across Windows, macOS, and Linux. It rewrites `js/data.js`, so use it only when intentionally preparing a reviewed data refresh:

```bash
node scripts/rebuild-data.mjs
```

## What is not built

- No automatic deployment to the live site.
- No economic calendar that updates by itself, and no actuals beyond what the weekly file contained.
- No streaming market quotes, accounts, or news. History charts are static SVG from the embedded World Bank series above, not a chart library.
