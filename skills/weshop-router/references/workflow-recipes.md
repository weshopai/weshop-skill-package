# Workflow recipes

These recipes are plan seeds for recurring cross-Skill requests. They reduce free-form planning; they are not executable scripts, fixed pipelines, or a closed workflow registry.

For every recipe:

- Validate each preferred Skill ID against the Skills visible at runtime. Treat the listed IDs as a semantic shortlist, score plausible live candidates against the step's full intent, and use `selectionSource: runtime-fallback` when the shortlist is absent or a long-tail Skill is a better owner.
- Instantiate only required nodes. A recipe must not turn an internal Atom stage into a separate workflow step.
- Bind every input to `user.<role>` or `<step-id>.output`. Never use an unbound remembered asset or an artifact-label shorthand.
- Put independent nodes in one execution wave; never parallelize across an actual dependency or approval/selection binding.
- Keep host, platform, safety, and live-tool layers active throughout. The host Tool owns validation, auth, receipts, and recovery; recipes do not copy wrapper behavior.
- Add `kind: research` only when a distinct evidence artifact must be delivered and bound downstream. Research already owned by the selected Atom stays inside it.
- Use optional professional or prompt packs only for an explicit, bound enhancement artifact. They cannot override higher-layer constraints or replace the final outcome owner.
- End with one cross-deliverable acceptance contract. Each Atom retains its own technical acceptance internally.

The compact step shape is:

```yaml
- id: stable-step-id
  kind: skill
  candidateSkillIds: [runtime-validated-id]
  dependsOn: []
  inputs:
    source-role: user.asset-role
    derived-role: upstream-step.output
  output: named-artifact
```

## `product-detail-production`

**Use when:** a product-faithful hero or packshot must be accepted as a distinct upstream artifact before a separate product-detail set is composed. Current channel evidence may be added only when it must be independently reused downstream.

**Do not use when:** usable product assets are already supplied and the only outcome is the product-detail set. Dispatch directly to `$product-detail-page`; it already owns ordinary platform research, fact control, module planning, internal asset routing, assembly, and acceptance. Dispatch directly to `$ai-product` when one product scene is the only result.

**Preferred Skills:** `$ai-product` or `$create-white-background-product-mockup` for the required source artifact, then `$product-detail-page`.

### Plan seed

| Step | Kind or Skill | Depends on | Input binding | Output binding |
| --- | --- | --- | --- | --- |
| `verify-channel-requirements` | optional `research` | none | `target-channel <- user.target-channel`; `requested-modules <- user.deliverables` | `verified-channel-requirements` |
| `create-product-source` | `$ai-product` **or** `$create-white-background-product-mockup` | optional research when included | `product-source <- user.product-source`; optional `channel-requirements <- verify-channel-requirements.output` | `accepted-product-source` |
| `compose-detail-page` | `$product-detail-page` | product source, plus optional research when included | `product-source <- create-product-source.output`; `product-facts <- user.product-facts`; optional `channel-requirements <- verify-channel-requirements.output` | `product-detail-page-set` |

The concrete route selects one source Skill after semantic scoring. Include the optional research node only for `currentFactResearch: separate-step`, because its dated evidence artifact is independently bound to both downstream owners. Omit that node and its optional bindings when current channel research is not independently required. If the source asset itself need not be accepted separately, remove the recipe and route direct to `$product-detail-page`.

```yaml
executionWavesWithSeparateResearch:
  - [verify-channel-requirements]
  - [create-product-source]
  - [compose-detail-page]
executionWavesWithoutSeparateResearch:
  - [create-product-source]
  - [compose-detail-page]
```

**Final acceptance:** every requested module and export exists at the verified destination size; product shape, construction, material, color, text, logo, controls, and count remain consistent; every claim maps to supplied facts; no stale destination rule appears; separate modules remain canonical; optional stitched preview matches their order.

## `multi-format-campaign`

**Use when:** one approved campaign truth, identity system, and hero-media set must produce at least two independently deliverable formats, such as a placement-specific banner, social carousel, and finished promo video.

**Do not use when:** the user wants only one poster, banner, carousel, product commercial, or brand promo. Each of those has a stable Atom owner and should remain direct.

**Preferred Skills:** `$ai-banner-design`, `$create-social-carousel`, and exactly one video owner: `$make-product-commercial` for one product-benefit claim or `$brand-promo-video-generator` for broader brand/app/service/shop/launch storytelling. Discover another live layout owner when the requested format is different.

### Plan seed

| Step | Skill or kind | Depends on | Input binding | Output binding |
| --- | --- | --- | --- | --- |
| `compile-campaign-system` | `deterministic` | none | `campaign-objective <- user.campaign-objective`; `deliverables <- user.channel-deliverables` | `shared-campaign-brief` |
| `produce-banner-branch` | `$ai-banner-design` | `compile-campaign-system` | `campaign-brief <- compile-campaign-system.output`; `approved-media <- user.approved-product-or-hero-media` | `campaign-banner-exports` |
| `produce-social-branch` | `$create-social-carousel` | `compile-campaign-system` | `campaign-brief <- compile-campaign-system.output`; `approved-media <- user.approved-product-or-hero-media` | `campaign-social-carousel` |
| `produce-video-branch` | `$make-product-commercial` **or** `$brand-promo-video-generator` | `compile-campaign-system` | `campaign-brief <- compile-campaign-system.output`; `approved-media <- user.approved-product-or-hero-media` | `campaign-video` |
| `build-delivery-manifest` | `deterministic` | `compile-campaign-system` and every instantiated branch | `campaign-brief <- compile-campaign-system.output`; `banner-artifact <- produce-banner-branch.output` when used; `social-artifact <- produce-social-branch.output` when used; `video-artifact <- produce-video-branch.output` when used | `campaign-delivery-manifest` |

Instantiate only branches the user requested, with at least two independently usable outputs. The concrete route must select one video Skill, never keep the alternative expression in an executable step. Selected branches run in parallel after the shared brief is frozen.

```yaml
executionWaves:
  - [compile-campaign-system]
  - [produce-banner-branch, produce-social-branch, produce-video-branch]
  - [build-delivery-manifest]
```

Let placement-specific Atoms own their ordinary current-format research; create one independent research artifact only when several branches must cite the same external evidence.

**Final acceptance:** every deliverable uses the same verified campaign truth and exact identity assets; no branch invents claims; each format meets its own current placement, crop, safe-area, copy, and mobile-view contract; visual coherence does not force identical composition; every requested file is independently usable.

## `comic-production`

**Use when:** the requested final is a multipage comic and the route must hand a story/manifest through canonical character references into separately rendered pages.

**Do not use when:** the final is only a story foundation (`$develop-story`), only a comic manifest (`$plan-comic-storyboard`), or one page from an already approved manifest and character references (`$render-comic-page`). Those are direct Atom outcomes. If substantial story development is separately requested, bind an accepted `$develop-story` artifact before this recipe rather than hiding it inside comic rendering.

**Preferred Skills:** `$plan-comic-storyboard`, optional repeated `$create-character`, repeated `$render-comic-page`, and conditional repair-only `$add-speech-bubble`.

### Plan seed

| Step | Skill | Depends on | Input binding | Output binding |
| --- | --- | --- | --- | --- |
| `plan-comic-manifest` | `$plan-comic-storyboard` | none | `story-brief <- user.story-brief`; `format-target <- user.page-or-format-target`; `style-constraints <- user.style-constraints` | `comic-project-manifest` |
| `create-missing-identities` | `$create-character`, repeated per missing identity | `plan-comic-manifest` | `character-specifications <- plan-comic-manifest.output`; `existing-character-assets <- user.existing-character-assets` | `accepted-canonical-character-sheets` |
| `resolve-canonical-identities` | `deterministic` | `plan-comic-manifest` and `create-missing-identities` when used | `comic-manifest <- plan-comic-manifest.output`; `new-identities <- create-missing-identities.output`; `existing-identities <- user.existing-character-assets` | `resolved-canonical-character-set` |
| `render-comic-pages` | `$render-comic-page`, repeated per page | `plan-comic-manifest` and `resolve-canonical-identities` | `comic-manifest <- plan-comic-manifest.output`; `canonical-identities <- resolve-canonical-identities.output` | `rendered-comic-page-set` |
| `repair-dialogue-only` | `$add-speech-bubble`, repeated only for flagged pages | `render-comic-pages` | `accepted-page-art <- render-comic-pages.output`; `exact-dialogue <- plan-comic-manifest.output` | `dialogue-corrected-page-set` |

`create-missing-identities` and `repair-dialogue-only` are conditional. Missing character sheets may run in parallel after the manifest. Page rendering may run in parallel only when the manifest and canonical references fully define continuity; otherwise expand the repeated step into page waves in narrative order. `$create-character` owns its canonical-sheet review and any confirmation-gated expansion; do not externalize those internal stages.

```yaml
executionWaves:
  - [plan-comic-manifest]
  - [create-missing-identities]
  - [resolve-canonical-identities]
  - [render-comic-pages]
  - [repair-dialogue-only]
```

Omit empty optional waves in the actual plan.

**Final acceptance:** exact page count and order; every page follows the approved panel count, reading direction, dialogue, and layout logic; recurring identities, wardrobes, props, palette, and visual style remain canonical; continuity carries correctly between pages; only failed pages or bubble layers are repaired; final ordered files and manifest are both delivered.

## `multi-shot-video`

**Use when:** a custom finished video needs several independently generated shots and final assembly, and no installed finished-outcome Atom owns the complete result.

**Do not use when:** one specialist Atom promises the stable final, including `$make-product-commercial`, `$brand-promo-video-generator`, `$make-explainer-video`, `$3d-animation-short-generator`, `$make-music-video`, or another runtime specialist. Keep those direct even though they internally storyboard, generate, and assemble. Also keep a single shot direct to `$generate-video`.

**Preferred Skills:** `$plan-film-storyboard`, one `$generate-video` invocation per shot, `$combine-videos`, and optional `$correct-video-color` after assembly. If a platform-native edit is the requested outcome, runtime discovery may select `$edit-social-video` as the final owner instead of blindly appending it.

### Plan seed

| Step | Skill | Depends on | Input binding | Output binding |
| --- | --- | --- | --- | --- |
| `plan-shot-manifest` | `$plan-film-storyboard` | none | `film-brief <- user.film-brief-or-script`; `format-and-duration <- user.format-and-duration`; `reference-assets <- user.reference-assets`; `continuity-constraints <- user.continuity-constraints` | `validated-shot-manifest` |
| `generate-shots` | `$generate-video`, repeated per shot | `plan-shot-manifest`, plus a prior accepted end state when explicitly bound | `shot-specification <- plan-shot-manifest.output`; `reference-assets <- user.reference-assets` | `accepted-shot-clips` |
| `assemble-master` | `$combine-videos` | `generate-shots` and `plan-shot-manifest` | `accepted-shot-clips <- generate-shots.output`; `assembly-notes <- plan-shot-manifest.output` | `assembled-video-master` |
| `finish-master-grade` | `$correct-video-color`, only for requested or observed cross-shot normalization | `assemble-master` | `assembled-master <- assemble-master.output`; `grade-target <- user.continuity-constraints` | `finished-video-master` |

Expand `generate-shots` into the earliest safe waves: independent shots may run together; a shot that consumes a previous end state must wait. Do not parallelize merely because several slots exist. `finish-master-grade` is optional and must not appear when assembly already satisfies the technical color contract.

```yaml
executionWaves:
  - [plan-shot-manifest]
  - [generate-shots]
  - [assemble-master]
  - [finish-master-grade]
```

**Final acceptance:** every required beat and shot appears once; shot identity, wardrobe, props, screen direction, environment, and start/end states remain consistent; clips have the requested motion and duration; timeline order, cuts, sync, captions, audio, ratio, and runtime are correct; only failed shots or downstream assembly stages are repaired.

## `visual-localization-set`

**Use when:** approved artwork must be delivered across several source assets, locales, or composed series while preserving one copy and visual system.

**Do not use when:** one image needs one language replacement. Dispatch directly to `$translate-image-text`. Keep one accepted image needing only one new ratio direct to `$expand-image`.

**Preferred Skills:** one `$translate-image-text` invocation per source-image/locale pair, then optional `$create-social-carousel` or `$create-image-deck` when the final is a separately composed series. Deterministic nodes freeze the shared matrix and package the result.

### Plan seed

| Step | Skill or kind | Depends on | Input binding | Output binding |
| --- | --- | --- | --- | --- |
| `normalize-localization-matrix` | `deterministic` | none | `source-artwork <- user.source-artwork`; `source-copy <- user.source-copy`; `target-locales <- user.target-locales`; `invariants <- user.copy-and-layout-invariants` | `localization-matrix` |
| `render-localized-artwork` | `$translate-image-text`, repeated per source/locale pair | `normalize-localization-matrix` | `source-artwork <- user.source-artwork`; `locale-binding <- normalize-localization-matrix.output` | `localized-artwork-variants` |
| `compose-localized-series` | `$create-social-carousel` **or** `$create-image-deck`, only when a separately composed series is requested | `render-localized-artwork` | `localized-artwork <- render-localized-artwork.output`; `series-contract <- user.copy-and-layout-invariants` | `localized-series` |
| `package-localized-set` | `deterministic` | `render-localized-artwork`, `normalize-localization-matrix`, and `compose-localized-series` when used | `localized-artwork <- render-localized-artwork.output`; `localized-series <- compose-localized-series.output` when used; `localization-matrix <- normalize-localization-matrix.output` | `localized-delivery-manifest` |

All translation pairs may run in parallel because they consume the same frozen matrix. Localized series composition waits for every source it uses. The concrete plan chooses one series Skill after semantic scoring. If the user supplied final reviewed translations, the matrix freezes them; if not, each translation Atom owns its contextual translation table and review. A requested ratio-only branch may add `$expand-image` through runtime discovery after its localized master is accepted; it is not a mandatory recipe node.

Add an independent research step only when current platform specifications must be delivered as a separate cited artifact shared across the derivative matrix. Otherwise use user-specified geometry or let the relevant destination-owning Atom research its own result.

```yaml
executionWaves:
  - [normalize-localization-matrix]
  - [render-localized-artwork]
  - [compose-localized-series]
  - [package-localized-set]
```

Omit the optional series wave when independent localized images are the final result.

**Final acceptance:** every requested source and locale combination is present and named in the delivery manifest; protected names, numbers, units, legal meaning, punctuation, and reading order are exact; non-text imagery, brand identity, hierarchy, and immutable elements are preserved; typography remains legible without overlap; the matrix has no missing or duplicate output.

## `cutout-to-layout`

**Use when:** a true transparent master is a separately accepted artifact that must feed a later poster, banner, carousel, or product-detail layout.

**Do not use when:** the user only wants one poster, banner, collage, or lookbook from an ordinary source image and does not require the transparent master. Dispatch directly to that layout Atom; do not manufacture an invisible preprocessing workflow.

**Preferred Skills:** `$remove-background`, then the actual layout owner selected from plausible live candidates such as `$poster-design`, `$ai-banner-design`, `$create-social-carousel`, or `$product-detail-page`.

### Plan seed

| Step | Skill | Depends on | Input binding | Output binding |
| --- | --- | --- | --- | --- |
| `create-transparent-cutout` | `$remove-background` | none | `foreground-source <- user.foreground-source`; `preservation-constraints <- user.preservation-constraints` | `accepted-transparent-cutout` |
| `compose-target-layout` | the highest-scoring layout owner | `create-transparent-cutout` | `transparent-cutout <- create-transparent-cutout.output`; `layout-brief <- user.layout-brief`; `target-format <- user.target-format` | `composed-layout` |
| `export-layout-package` | `deterministic` | `compose-target-layout` | `composed-layout <- compose-target-layout.output`; `target-format <- user.target-format` | `layout-delivery-package` |

Score only plausible layout owners against the final contract; do not retain all four as executable alternatives. For multiple independently requested layouts, expand `compose-target-layout` into branches that may run in parallel after the cutout is accepted. Add `$expand-image` only as a downstream repair when accepted content misses another requested ratio.

```yaml
executionWaves:
  - [create-transparent-cutout]
  - [compose-target-layout]
  - [export-layout-package]
```

**Final acceptance:** every transparent master has a real alpha channel, clean edges, complete fine structures, correct canvas, and unchanged foreground; downstream layouts use the intended cutout version; exact copy and brand assets are preserved; each layout meets its own hierarchy, placement, crop, safe-area, and output-format contract; cutouts and all requested final layouts are delivered separately.

## `research-to-deliverable`

**Use when:** current external facts must exist as a distinct, dated evidence artifact and materially determine the content or structure of a downstream infographic, deck, technical visual, illustrated explanation, or campaign asset.

**Do not use when:** the user already supplies an authoritative sufficient evidence packet, research alone is the final result, or the selected Atom owns research through one complete final outcome without handing evidence to another owner.

**Preferred Skills:** after research and a deterministic evidence brief, select the best live output owner from plausible candidates such as `$make-infographic`, `$create-image-deck`, `$technical-visual-explainer`, or `$article-handdrawn-illustrations`.

### Plan seed

| Step | Kind or Skill | Depends on | Input binding | Output binding |
| --- | --- | --- | --- | --- |
| `verify-execution-facts` | `research` | none | `research-question <- user.research-question`; `source-requirements <- user.source-requirements`; `deliverable-contract <- user.deliverable-contract` | `dated-evidence-record` |
| `compile-evidence-brief` | `deterministic` | `verify-execution-facts` | `evidence-record <- verify-execution-facts.output`; `target-audience <- user.target-audience`; `deliverable-contract <- user.deliverable-contract` | `evidence-backed-production-brief` |
| `produce-evidence-deliverable` | highest-scoring visual owner | `compile-evidence-brief` and `verify-execution-facts` | `production-brief <- compile-evidence-brief.output`; `evidence-record <- verify-execution-facts.output` | `evidence-backed-visual-deliverable` |
| `attach-source-manifest` | `deterministic` | `produce-evidence-deliverable` and `verify-execution-facts` | `visual-deliverable <- produce-evidence-deliverable.output`; `evidence-record <- verify-execution-facts.output` | `deliverable-with-source-manifest` |

```yaml
executionWaves:
  - [verify-execution-facts]
  - [compile-evidence-brief]
  - [produce-evidence-deliverable]
  - [attach-source-manifest]
```

**Final acceptance:** every material claim maps to a verified source or labeled inference; visual hierarchy fits the audience and decision goal without distorting evidence; dates, units, comparisons, citations, and unresolved uncertainty remain complete and internally consistent.

## When no recipe fits

Return an empty orchestration seed with no `recipeId`, `steps: []`, `executionWaves: []`, `selectionSource: runtime-fallback`, and `nextAction: expand-with-orchestrator`. The sole orchestrator then creates only the steps needed for distinct outputs or artifact handoffs and computes waves from actual dependencies. A new recurring pattern may be added here later, but it must not become a new Atom unless one Skill can own one stable final result and acceptance contract.
