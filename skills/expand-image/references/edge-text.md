# Edge text handling

Treat readable text, logos, labels, UI, and typography as protected geometry, not scenery for the outpainting model to continue.

## Preflight

Inspect a guard band along every edge that will be expanded. Use at least 32 pixels or 3% of the shorter side, whichever is larger. Record each text region and whether it is complete, touching the edge, or already clipped.

## Routing

### Text is complete and outside the guard band

Expand normally, then restore the complete original region over the result. Validate that no new text appeared in the generated margins.

### Text is complete but inside the guard band

1. Prefer expanding the opposite side or repositioning the original so the text moves farther inside the final canvas.
2. Restore the original region exactly after outpainting.
3. Do not feather, blur, color-match, or generatively repair across glyphs, logos, label edges, or UI.
4. Reject any ghost letter, repeated word, continued stroke, invented logo, or pseudo-text outside the source rectangle.

If the added margin must visually continue behind the text, generate only the background texture. Keep the exact text on the protected source layer; add any new copy later with Layout Composition or Poster Design.

### Text is clipped by the source edge

The missing glyph pixels are unknown. Do not ask an image model to infer or continue them.

- request the uncropped original when exact preservation is required;
- otherwise obtain the exact copy, font or brand typeface, size, tracking, alignment, and color, then rebuild the complete text deterministically with Layout Composition;
- if neither is available, preserve the clipped source as-is and disclose that the missing text cannot be verified.

### Text must move or reflow

This is layout work, not canvas expansion. Hand the expanded text-free or source-preserved base to Layout Composition, Poster Design, or AI Banner Design with exact quoted copy.

## Acceptance

- Every original character remains legible and unchanged.
- No generated margin contains invented or duplicated readable text.
- No seam, feather, or color adjustment crosses a glyph or logo boundary.
- Any rebuilt text uses supplied exact copy and deterministic layout; it is not accepted from image-model typography alone.
