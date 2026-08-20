#!/usr/bin/env python3
"""Normalize product-detail modules and assemble an optional long-page derivative."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from PIL import Image, ImageColor


def load_manifest(path: Path) -> dict[str, Any]:
    data = json.loads(path.read_text(encoding="utf-8"))
    width = data.get("canvas_width")
    modules = data.get("modules")
    if not isinstance(width, int) or width <= 0:
        raise ValueError("canvas_width must be a positive integer")
    if not isinstance(modules, list) or not modules:
        raise ValueError("modules must be a non-empty list")
    ids = [module.get("id") for module in modules if isinstance(module, dict)]
    if len(ids) != len(modules) or any(not isinstance(item, str) or not item for item in ids):
        raise ValueError("every module must have a non-empty string id")
    if len(ids) != len(set(ids)):
        raise ValueError("module ids must be unique")
    gap = data.get("gap", 0)
    if not isinstance(gap, int) or gap < 0:
        raise ValueError("gap must be a non-negative integer")
    ImageColor.getrgb(data.get("background", "#FFFFFF"))
    return data


def flatten(image: Image.Image, background: tuple[int, int, int]) -> Image.Image:
    rgba = image.convert("RGBA")
    base = Image.new("RGBA", rgba.size, (*background, 255))
    return Image.alpha_composite(base, rgba).convert("RGB")


def normalize(image: Image.Image, width: int, background: tuple[int, int, int]) -> Image.Image:
    height = max(1, round(image.height * width / image.width))
    resized = image.resize((width, height), Image.Resampling.LANCZOS)
    return flatten(resized, background)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args()

    data = load_manifest(args.manifest.resolve())
    output_dir = args.output_dir.resolve()
    modules_dir = output_dir / "modules"
    modules_dir.mkdir(parents=True, exist_ok=True)
    width = data["canvas_width"]
    gap = data.get("gap", 0)
    background = ImageColor.getrgb(data.get("background", "#FFFFFF"))

    normalized: list[tuple[dict[str, Any], Image.Image, Path, Path]] = []
    for module in data["modules"]:
        source = Path(module.get("path", "")).expanduser().resolve()
        if not source.is_file():
            raise FileNotFoundError(f"module image not found: {source}")
        with Image.open(source) as opened:
            image = normalize(opened, width, background)
        destination = modules_dir / f"{module['id']}.png"
        image.save(destination, format="PNG", optimize=True)
        normalized.append((module, image, source, destination))

    total_height = sum(image.height for _, image, _, _ in normalized) + gap * (len(normalized) - 1)
    stitched = Image.new("RGB", (width, total_height), background)
    y = 0
    records = []
    for module, image, source, destination in normalized:
        stitched.paste(image, (0, y))
        records.append({
            "id": module["id"],
            "order": len(records) + 1,
            "source": str(source),
            "normalized": str(destination),
            "width": image.width,
            "height": image.height,
            "y": y,
            "alt": module.get("alt", ""),
        })
        y += image.height + gap

    stitched_name = data.get("stitched_filename", "detail-page-preview.jpg")
    stitched_path = output_dir / stitched_name
    suffix = stitched_path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        stitched.save(stitched_path, format="JPEG", quality=92, optimize=True)
    elif suffix == ".png":
        stitched.save(stitched_path, format="PNG", optimize=True)
    else:
        raise ValueError("stitched_filename must end in .jpg, .jpeg, or .png")

    delivery = {
        "project": data.get("project", args.manifest.stem),
        "platform": data.get("platform", ""),
        "canvas_width": width,
        "gap": gap,
        "stitched": str(stitched_path),
        "stitched_width": stitched.width,
        "stitched_height": stitched.height,
        "modules": records,
    }
    (output_dir / "delivery-manifest.json").write_text(
        json.dumps(delivery, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(delivery, ensure_ascii=False))


if __name__ == "__main__":
    main()
