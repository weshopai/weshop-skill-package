# Acceptance

Accept only when every applicable check passes:

1. Final pixel dimensions equal the requested `targetWidth × targetHeight` and express the intended ratio.
2. The original subject, product, person, garment, face, logo, readable copy, count, and key objects remain recognizable and complete.
3. The requested original-image position and copy/safe area are present.
4. New regions continue perspective, horizon, geometry, lighting direction, shadow logic, focus, noise, texture, and color grade.
5. No visible seam, hard band, mirrored edge, repeated object, stretched texture, filled opening, duplicate person/product, invented text, logo, or watermark appears.
6. The source is not unintentionally cropped, stretched, enlarged, or reduced inside the canvas.
7. Output count is correct and no grid or collage is introduced.
8. When restoration mode is selected, the mapped source rectangle is pixel-identical to the original.
9. No feather, seam correction, or color matching crosses protected text, logo, label, or UI pixels.

The specialized endpoint may lightly regenerate or re-encode the nominal source region. Visual fidelity is the default acceptance standard. When pixel identity is required, run `scripts/restore_original_region.py`, compare the mapped source region, and inspect the resulting boundary seam separately.
