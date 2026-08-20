#!/usr/bin/env python3
"""Replace color-spilled partial-alpha RGB with nearest trusted foreground RGB."""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import distance_transform_edt


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("image", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--core-alpha", type=int, default=245)
    parser.add_argument("--minimum-alpha", type=int, default=4)
    args = parser.parse_args()

    rgba = np.asarray(Image.open(args.image).convert("RGBA")).copy()
    alpha = rgba[:, :, 3]
    core = alpha >= args.core_alpha
    if not np.any(core):
        raise SystemExit("trusted_foreground_core=false")

    edge = (alpha >= args.minimum_alpha) & (alpha < args.core_alpha)
    _, indices = distance_transform_edt(~core, return_indices=True)
    nearest_y, nearest_x = indices
    nearest_rgb = rgba[nearest_y, nearest_x, :3]
    rgba[edge, :3] = nearest_rgb[edge]

    Image.fromarray(rgba, "RGBA").save(args.output)
    print(f"edge_pixels_decontaminated={int(edge.sum())}")
    print("alpha_unchanged=true")


if __name__ == "__main__":
    main()
