#!/usr/bin/env python3
"""Center a slightly normalized cutout on the source-sized transparent canvas."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("cutout", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--width", type=int, required=True)
    parser.add_argument("--height", type=int, required=True)
    parser.add_argument("--max-delta", type=int, default=8)
    args = parser.parse_args()

    cutout = Image.open(args.cutout).convert("RGBA")
    delta_x = args.width - cutout.width
    delta_y = args.height - cutout.height
    if delta_x < 0 or delta_y < 0 or delta_x > args.max_delta or delta_y > args.max_delta:
        raise SystemExit(f"unsafe_canvas_delta={delta_x},{delta_y}")

    canvas = Image.new("RGBA", (args.width, args.height), (0, 0, 0, 0))
    offset = (delta_x // 2, delta_y // 2)
    canvas.paste(cutout, offset, cutout)
    canvas.save(args.output)
    print(f"canvas={args.width}x{args.height}")
    print(f"cutout={cutout.width}x{cutout.height}@{offset[0]},{offset[1]}")


if __name__ == "__main__":
    main()
