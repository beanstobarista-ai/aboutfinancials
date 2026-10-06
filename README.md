# AboutFinancials

Static site for aboutfinancials.com: **Finance, made clear, for money that crosses borders.**
Plain HTML, one stylesheet, small vanilla JS files. No framework, no build step, no backend.

## Preview locally

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: positioning, Money Map, Learn (coming soon), Templates (coming soon) |
| `money-map.html` | Money Map: net worth across currencies, runs in the browser |
| `about.html` | About the site (publisher: AboutFinancials) |
| `editorial.html` | Editorial and AI policy, number-sourcing method |
| `privacy.html` | Privacy: localStorage keys and the Frankfurter request |
| `terms.html` | Terms of use |
| `sitemap.xml`, `sitemap_index.xml`, `robots.txt` | Crawl files for https://aboutfinancials.com/ |

The header and footer are repeated in each HTML file. If you change one, change them all.

## Scripts

- `js/site.js`: mobile menu toggle (every page).
- `js/money-map-core.js`: pure conversion maths, rate parsing, and the cited peg list. Works in the browser and in Node.
- `js/money-map.js`: Money Map UI, localStorage, and the live rate fetch.

## Where Money Map's numbers come from

- **ECB euro reference rates**, fetched at runtime from Frankfurter: `https://api.frankfurter.dev/v2/providers/ecb/rates?base=EUR`, falling back to `https://api.frankfurter.dev/v1/latest` (also ECB). The rate date and source are shown on the page.
- **Gulf pegs** (SAR, AED, QAR, BHD, OMR): fixed per-US-dollar rates, each stored in `js/money-map-core.js` next to the URL of the central bank page that states it, and shown in the UI. Converted through the ECB's USD rate. KWD is excluded (basket peg).
- If the fetch fails, the page uses the last rates this browser saved (labelled with their date), or shows a message and converts nothing. No rate is ever invented.

User entries are stored only in the browser's localStorage (`af-money-map-v1`, plus `af-money-map-rates-v1` for the rate cache).

## Tests

```bash
node tests/money-map.test.js
```

Uses a fixed rates object (round test numbers, not real rates) to check conversion, pegs, totals, and validation.

## Deploying

Manual upload only, after owner approval. `README.md` and `tests/` don't need to be uploaded.
