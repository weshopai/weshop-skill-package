# Authority research and biometric crop

Before editing, browse the current issuing authority's official photo page. Record URL, access date, document type, country, and whether AI/digital alteration is allowed. If the authority prohibits AI alteration, do not generate a submission image; return capture guidance or a clearly labeled non-submission preview.

Extract these fields without filling gaps from memory:

- physical and pixel dimensions, aspect ratio, DPI, format, byte limit;
- crown-to-chin size or ratio, eye line, top margin, centering, shoulder inclusion;
- required background color and tolerance;
- full-front pose, head tilt, expression, eyes, mouth, glasses and headwear;
- whether both ears, both facial edges, hairline, neck, or shoulders must be visible;
- lighting uniformity, exposure, white balance, red-eye, face shadow and background shadow;
- recency, manipulation, retouching and printing restrictions;
- documented disability, medical, religious and child exceptions.

Do not treat ear visibility as universal. Check it explicitly and preserve both ears when required. Even when ears are not named, keep both facial edges unobstructed when the authority requires a full face.

## Crop procedure

1. Measure a normalized crown-to-chin box on the accepted neutral base. The box top is the crown/skull top specified by the authority, not the highest loose hair strand; the bottom is the lowest chin point.
2. Convert the authority's head measurement to `head-height-ratio` and its top-clearance rule to `top-margin-ratio`.
3. Run `scripts/format_id_photo.py` with those measured values. This scales around the head and then crops; it never shrinks the entire original photograph into the output canvas.
4. Re-open the file and verify dimensions, DPI, head ratio, top margin, face center, ear/facial-edge visibility, background RGB, and that no padding line is visible.

Official examples used to design this workflow:

- U.S. Department of State passport photos: https://travel.state.gov/content/travel/en/passports/how-apply/photos.html
- UK passport service capture guidance: https://www.passport.service.gov.uk/photo/how-to-take-a-photo
- UK photographer guidance: https://www.gov.uk/government/publications/passport-photos-guide-for-photographers/guidance-for-photographers
