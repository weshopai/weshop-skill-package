# Banner Research and Placement Guide

Use this reference before every banner whose placement is named or whose current requirements may have changed. Browse when the harness supports it. If browsing is missing or one official lookup fails, use the built-in preset in `SKILL.md` immediately and label its source and snapshot date; this file records routing logic and dated evidence, not permanent platform truth.

## Research order

1. Check whether a browser or search tool exists.
2. When available, make one reasonable attempt to open current official platform documentation.
3. If the tool is absent or the official lookup fails, stop searching and select the exact built-in preset in `SKILL.md`.
4. Record market, placement, access or preset date, dimensions/ratio, file type/size, safe area, crop behavior, content rules, and `spec_source`.
5. Inspect 6–10 current examples only when browsing works; otherwise use supplied references or a category-led direction without invented sources.
6. Label recurring patterns as observations, not proven conversion causes.
7. Select one category-legible direction and one original differentiator.
8. Build the delivery and acceptance spec before prompting.

## Placement routes

| Placement | Research focus | Fallback behavior |
| --- | --- | --- |
| YouTube channel banner | Recommended/minimum canvas, central text/logo safe area, TV/desktop/mobile crop, file limit | Use the dated YouTube preset in `SKILL.md` when live verification fails |
| Website/SaaS hero | Actual site container, responsive breakpoints, text rendered in image vs HTML, mobile crop, performance budget | If no site exists but context clearly means a generic hero: 16:9 master, central 60% safe content, crop-ready sides |
| Google responsive display | Required asset ratios, minimum/recommended pixels, text/logo/button overlay policy, file limit | Use the dated landscape, square, or vertical preset in `SKILL.md`; keep each ratio separate |
| Static display slot | Exact purchased inventory such as leaderboard, rectangle, skyscraper, or billboard | Use a named built-in slot only; ask responsive versus static when no slot is identifiable |
| Social/profile cover | Desktop/mobile crop, avatar overlap, safe zone, file format | Use current platform rule; never rely on remembered dimensions |
| Email header | Email template width, responsive scaling, retina export, file budget, dark-mode risk | Match the actual template; keep essential copy out of image when HTML text is available |
| Marketplace/store campaign | Marketplace, locale, placement, promotional-copy rules, product/logo fidelity | Follow current marketplace research workflow and exact placement spec |

## Dated official examples

Verify again at execution time.

- YouTube Help, accessed 2026-08-18: recommended 2560×1440; minimum 2048×1152 at 16:9; minimum-canvas text/logo safe area 1235×338; device-dependent cropping; maximum 6 MB. Source: https://support.google.com/youtube/answer/10456525
- Google responsive display guidance, accessed 2026-08-20: landscape 1.91:1 at recommended 1200×628, square 1:1 at recommended 1200×1200, and vertical 9:16 at recommended 900×1600; maximum 5120 KB per image. The current page also notes a 2026 migration from Display Ads toward Demand Gen, so use these presets only for an explicitly identified responsive-display placement. Source: https://support.google.com/google-ads/answer/9823397
- Google responsive display creative guidance, accessed 2026-08-20: avoid overlaid logos, text, and misleading button graphics; avoid collage images; keep the product/service as the focus. These rules apply to responsive image assets, not every static uploaded banner. Source: https://support.google.com/google-ads/answer/9823397
- Google common static display sizes, accessed 2026-08-18: common computer slots include 300×250, 336×280, 728×90, 970×90, 468×60, 300×600, and 160×600. Source: https://support.google.com/google-ads/answer/7031480

## Reference search queries

Combine placement, industry, audience, and campaign type:

```text
[industry] [placement] official campaign
[category] [placement] launch banner
[price tier] [industry] website hero
[topic] YouTube channel banner
site:[relevant official brand domains] [campaign term]
```

Record URL, date, placement, and one observable lesson. Do not download a broad moodboard without annotations.

## Reference synthesis

Summarize:

```yaml
category_code: what makes the banner immediately legible in this industry
recurring_patterns: 2–4 observed composition or hierarchy choices
overused_defaults: visual clichés to avoid
differentiator: one original but context-appropriate move
copy_density: maximum useful hierarchy for the placement
crop_strategy: what remains essential vs expendable
```

Never include competitor names or source URLs in the generation Prompt.
