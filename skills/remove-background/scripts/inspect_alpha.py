#!/usr/bin/env python3
"""Validate PNG transparency and render diagnostic composites."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw


def checkerboard(size: tuple[int, int], tile: int = 24) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, (238, 238, 238))
    draw = ImageDraw.Draw(image)
    for y in range(0, height, tile):
        for x in range(0, width, tile):
            if ((x // tile) + (y // tile)) % 2:
                draw.rectangle((x, y, min(x + tile - 1, width - 1), min(y + tile - 1, height - 1)), fill=(198, 198, 198))
    return image


def composite(source: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    base = Image.new("RGB", source.size, color)
    base.paste(source.convert("RGB"), mask=source.getchannel("A"))
    return base


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("image", type=Path)
    parser.add_argument("--preview-dir", type=Path)
    args = parser.parse_args()

    source = Image.open(args.image)
    if "A" not in source.getbands():
        raise SystemExit("alpha_channel=false")

    rgba = source.convert("RGBA")
    alpha = list(rgba.getchannel("A").getdata())
    total = len(alpha)
    transparent = sum(value == 0 for value in alpha)
    partial = sum(0 < value < 255 for value in alpha)
    report = {
        "format": source.format,
        "mode": source.mode,
        "width": source.width,
        "height": source.height,
        "alpha_channel": True,
        "transparent_pixels": transparent,
        "partial_alpha_pixels": partial,
        "opaque_pixels": sum(value == 255 for value in alpha),
        "transparent_fraction": round(transparent / total, 6),
        "partial_alpha_fraction": round(partial / total, 6),
    }
    if transparent == 0:
        raise SystemExit("transparent_pixels=0")

    if args.preview_dir:
        args.preview_dir.mkdir(parents=True, exist_ok=True)
        stem = args.image.stem
        composite(rgba, (255, 255, 255)).save(args.preview_dir / f"{stem}-white.png")
        composite(rgba, (0, 0, 0)).save(args.preview_dir / f"{stem}-black.png")
        check = checkerboard(rgba.size)
        check.paste(rgba.convert("RGB"), mask=rgba.getchannel("A"))
        check.save(args.preview_dir / f"{stem}-checkerboard.png")
        report["preview_dir"] = str(args.preview_dir)

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
