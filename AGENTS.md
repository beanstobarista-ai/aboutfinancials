# AboutFinancials.com operating rules

## Scope

This repository contains the static HTML, CSS, and JavaScript website for AboutFinancials.com.

## Non-negotiable publishing rules

- Never publish or display a financial or economic number unless it can be traced to a real named source.
- Never infer, interpolate, backfill, or silently substitute a missing value. Missing official data must remain clearly labelled as unavailable or not published.
- Preserve the source series identifier, observation year/date, retrieval or embedding timestamp, raw source value, and any display rounding needed to reproduce each displayed number.
- Distinguish annual observations from live or daily market data. Do not describe ECB reference rates as live quotes.
- The economic calendar is a saved Forex Factory weekly snapshot until a reviewed live source is implemented. Always show its snapshot date and limitations.
- Production publication requires the owner's explicit approval. Prepare and verify changes locally first.

## Approved current sources

- Country and indicator figures: World Bank World Development Indicators API v2.
- Exchange rates: European Central Bank reference rates obtained through Frankfurter.
- Economic calendar: the saved Forex Factory weekly public file, with no claim that it updates automatically.

Adding another source requires documenting its publisher, endpoint or source URL, licensing/usage terms, update cadence, geography, units, and missing-data behavior before using its numbers.

## Verification

- Check raw values, units, country codes, series codes, observation dates, currencies, and rounding.
- Treat zero, null, missing, and unpublished as different states.
- Spot checks are not sufficient for a generated dataset: validate every populated record programmatically where the official source supports it.
- Keep claims and explainers separate from source data, and cite the authoritative source near the relevant content.
- Do not publish a changed dataset when verification is incomplete or the upstream source response is ambiguous.

## Product and design

- Keep movement among Home, Countries, Markets, Indicators, and Calendar obvious and consistent on desktop and mobile.
- Preserve the restrained Apple-like visual language unless the owner approves a redesign.
- Inspect existing visual patterns before changing them.
- Do not add a diagram until it has been previewed for the owner and explicitly approved.
- Test layouts at narrow mobile, tablet, and desktop widths. Avoid unintended horizontal page scrolling.

## Workflow

- Work from version-controlled local files.
- Keep changes small and reviewable.
- Verify links, console errors, accessibility basics, responsive behavior, and data provenance before requesting publication approval.
- Do not deploy directly to `/home/abuzartariq/htdocs/aboutfinancials.com` without explicit approval for that release.
