# Acceptance

Accept only when every applicable check passes:

1. Output is PNG with an alpha channel, not a white or checkerboard pattern baked into RGB pixels.
2. At least some background pixels have alpha 0; subject interiors contain appropriate opaque or graded alpha values.
3. Output pixel dimensions equal the source dimensions.
4. Foreground identity, count, geometry, colors, texture, logos, labels, and construction remain unchanged.
5. Fine structures and connected parts remain complete.
6. Legitimate internal openings are transparent; solid material has no accidental holes.
7. Black and white composites show no bright halo, dark halo, original-background color spill, jagged stair-step, or opaque mask island.
8. Checkerboard view confirms the entire unwanted background is transparent.
9. Semi-transparent materials use plausible graded alpha instead of an unjustified hard binary edge.
10. Contact shadow follows the bound keep/remove policy.
11. Output count is correct and no grid, collage, regenerated subject, or new content appears.

Report alpha statistics and whether all three previews were inspected. Do not claim clean edges from alpha statistics alone; visual inspection remains mandatory.
