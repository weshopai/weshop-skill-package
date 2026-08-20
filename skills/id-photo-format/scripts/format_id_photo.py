#!/usr/bin/env python3
"""Crop around a measured crown-to-chin box and export an exact ID-photo file."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def parse_box(value: str) -> tuple[float, float, float, float]:
    try:
        box = tuple(float(part) for part in value.split(","))
    except ValueError as error:
        raise argparse.ArgumentTypeError("head box must contain four numbers") from error
    if len(box) != 4 or not (0 <= box[0] < box[2] <= 1 and 0 <= box[1] < box[3] <= 1):
        raise argparse.ArgumentTypeError("head box must be normalized left,top,right,bottom in 0..1")
    return box  # type: ignore[return-value]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--width", type=int, required=True)
    parser.add_argument("--height", type=int, required=True)
    parser.add_argument("--dpi", type=int, default=300)
    parser.add_argument("--head-box", type=parse_box, required=True,
                        help="normalized crown-to-chin box: left,top,right,bottom")
    parser.add_argument("--head-height-ratio", type=float, required=True,
                        help="required crown-to-chin height divided by output height")
    parser.add_argument("--top-margin-ratio", type=float, required=True,
                        help="required top edge to crown distance divided by output height")
    parser.add_argument("--background", default="#ffffff")
    args = parser.parse_args()

    if args.width <= 0 or args.height <= 0 or args.dpi <= 0:
        raise SystemExit("width, height, and dpi must be positive")
    if not 0 < args.head_height_ratio < 1 or not 0 <= args.top_margin_ratio < 1:
        raise SystemExit("head-height-ratio and top-margin-ratio must be within 0..1")
    if args.head_height_ratio + args.top_margin_ratio >= 1:
        raise SystemExit("head plus top margin must leave room below the chin")

    with Image.open(args.input) as source:
        rgb = source.convert("RGB")
        left, top, right, bottom = args.head_box
        head_height = (bottom - top) * rgb.height
        target_head_height = args.head_height_ratio * args.height
        scale = target_head_height / head_height
        resized = rgb.resize(
            (round(rgb.width * scale), round(rgb.height * scale)),
            Image.Resampling.LANCZOS,
        )

        head_center_x = ((left + right) / 2) * rgb.width * scale
        crown_y = top * rgb.height * scale
        crop_left = round(head_center_x - args.width / 2)
        crop_top = round(crown_y - args.top_margin_ratio * args.height)

        canvas = Image.new("RGB", (args.width, args.height), args.background)
        src_left = max(0, crop_left)
        src_top = max(0, crop_top)
        src_right = min(resized.width, crop_left + args.width)
        src_bottom = min(resized.height, crop_top + args.height)
        if src_left >= src_right or src_top >= src_bottom:
            raise SystemExit("computed crop does not overlap the source")
        canvas.paste(
            resized.crop((src_left, src_top, src_right, src_bottom)),
            (src_left - crop_left, src_top - crop_top),
        )

        args.output.parent.mkdir(parents=True, exist_ok=True)
        canvas.save(args.output, dpi=(args.dpi, args.dpi), quality=95)


if __name__ == "__main__":
    main()
