#!/usr/bin/env python3
"""Restore the original pixels over an outpainted result at a known offset."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--original", required=True, type=Path)
    parser.add_argument("--expanded", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--fill-left", required=True, type=int)
    parser.add_argument("--fill-top", required=True, type=int)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    original = Image.open(args.original).convert("RGBA")
    expanded = Image.open(args.expanded).convert("RGBA")
    left, top = args.fill_left, args.fill_top
    right, bottom = left + original.width, top + original.height

    if left < 0 or top < 0 or right > expanded.width or bottom > expanded.height:
        raise SystemExit("The original rectangle must fit completely inside the expanded canvas.")

    restored = expanded.copy()
    restored.paste(original, (left, top))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    restored.save(args.output, format="PNG")

    mapped = restored.crop((left, top, right, bottom))
    if ImageChops.difference(original, mapped).getbbox() is not None:
        raise SystemExit("Pixel restoration verification failed.")

    print(f"restored={original.width}x{original.height}@{left},{top}")
    print(f"canvas={expanded.width}x{expanded.height}")
    print("pixel_identical=true")


if __name__ == "__main__":
    main()
