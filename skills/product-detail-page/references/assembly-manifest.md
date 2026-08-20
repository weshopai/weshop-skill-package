# Assembly manifest

Use absolute module paths. Modules are normalized to `canvas_width` while preserving aspect ratio, then exported separately and stacked in order.

```json
{
  "project": "portable-blender-amazon-us",
  "platform": "Amazon US A+",
  "canvas_width": 1464,
  "background": "#FFFFFF",
  "gap": 0,
  "stitched_filename": "detail-page-preview.jpg",
  "modules": [
    {"id": "01-hero", "path": "/absolute/path/01-hero.png", "alt": "Portable blender beside fruit and a smoothie"},
    {"id": "02-feature", "path": "/absolute/path/02-feature.png", "alt": "Close view of the blender controls"}
  ]
}
```

Required fields:

- `project`: stable project identifier.
- `canvas_width`: positive output width in pixels.
- `modules`: ordered, non-empty list with unique `id` and readable image `path`.

Optional fields:

- `platform`: researched destination label.
- `background`: `#RRGGBB`; used when flattening transparent images or adding gaps.
- `gap`: non-negative pixels between modules.
- `stitched_filename`: `.jpg`, `.jpeg`, or `.png`.
- `alt`: module alt text included in the delivery manifest.

The script writes:

- `modules/<id>.png` for every normalized module;
- the stitched file;
- `delivery-manifest.json` with dimensions, source paths, normalized paths, order, and alt text.

The stitched image is a derivative. Keep original modules and normalized module exports as the editable/uploadable source of truth.
