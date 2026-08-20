# Virtual Try-On Input and Acceptance Guide

## Input preflight

### Garment

- Show the complete garment at useful resolution, preferably front-facing with even light and a simple background.
- Preserve category: upper-body, lower-body, dress, or other. Category mismatch is a routing/input problem, not a styling choice.
- List construction anchors that define recognition: neckline, lapels, collar, sleeves, cuffs, hem, waist, panels, pockets, closures, seams, trim, pattern repeat, logo, label, hardware, and color blocking.
- Flag transparent, reflective, lace, fringe, oversized, asymmetrical, layered, or highly patterned garments as higher-risk.
- Reject sources whose required features are hidden, folded under, cropped away, or too small to inspect.

### Person

- Keep the target body region visible at sufficient size. Prefer a natural front or modest three-quarter pose for the first attempt.
- Flag crossed arms, hands covering the torso, extreme foreshortening, seated compression, cropped limbs, loose hair over the garment area, and existing bulky layers as higher-risk.
- Treat face, hair, body proportions, skin, pose, hands, crop, existing accessories, and unaffected clothing as explicit locks when a model reference is supplied.
- Do not infer exact body measurements or fit from one image.

### Mode compatibility

- Scene-aware try-on may use a separate location reference.
- Clothes-change requires a person plus garment and preserves the existing background; do not attach a location source.
- In clothes-change mode, treat every unaffected garment, accessory, body region, and background element as locked.

### Location

- Use only when the user wants scene control. Confirm perspective and crop can plausibly contain the model.
- Do not inherit people, signage, logos, or unrelated objects from a location reference unless requested.

## Acceptance rubric

### Garment fidelity

- Category and overall silhouette
- Length and volume
- Neckline/collar/lapels
- Sleeves/cuffs/armholes
- Panels, seams, pockets, closures, trim, hardware
- Material response, transparency, texture, pattern scale and alignment
- Brand marks and visible text, without invented replacements

### Dressing plausibility

- Openings align with neck, arms, waist, and legs
- Fabric contacts the body without floating, melting, or bleeding through skin
- Folds and tension match pose, gravity, material, and garment construction
- Front/back ordering is correct at hair, arms, hands, accessories, and outer layers
- No missing limbs, duplicated hands, broken fingers, warped joints, or body reshaping

### Calibration

Virtual try-on is a visual proposal. Never claim verified size, fit, comfort, coverage, fabric performance, or manufacturing accuracy unless supported by separate physical/product data.
