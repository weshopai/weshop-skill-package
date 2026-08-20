#!/usr/bin/env python3
"""Build a dimension-driven L bracket, export STEP/STL, and verify the STEP."""

import argparse
import json
from pathlib import Path

import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import trimesh
from build123d import Box, BuildPart, Cylinder, Locations, Mode, Plane, export_step, export_stl, import_step


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True, help="Output path without an extension")
    parser.add_argument("--length", type=float, default=80)
    parser.add_argument("--width", type=float, default=50)
    parser.add_argument("--height", type=float, default=50)
    parser.add_argument("--thickness", type=float, default=5)
    parser.add_argument("--base-hole", type=float, default=6)
    parser.add_argument("--upright-hole", type=float, default=8)
    args = parser.parse_args()

    stem = Path(args.output)
    stem.parent.mkdir(parents=True, exist_ok=True)

    with BuildPart() as bracket:
        with Locations((0, 0, args.thickness / 2)):
            Box(args.length, args.width, args.thickness)
        with Locations((-args.length / 2 + args.thickness / 2, 0, args.height / 2)):
            Box(args.thickness, args.width, args.height)
        with Locations((-args.length / 4, 0, args.thickness / 2), (args.length / 4, 0, args.thickness / 2)):
            Cylinder(args.base_hole / 2, args.thickness * 2, mode=Mode.SUBTRACT)
        with Locations((-args.length / 2 + args.thickness / 2, 0, args.height / 2)):
            Cylinder(args.upright_hole / 2, args.thickness * 2, rotation=(0, 90, 0), mode=Mode.SUBTRACT)

    step_path = stem.with_suffix(".step")
    stl_path = stem.with_suffix(".stl")
    export_step(bracket.part, step_path)
    export_stl(bracket.part, stl_path)

    mesh = trimesh.load_mesh(stl_path)
    fig = plt.figure(figsize=(8, 8), facecolor="#f5f2ea")
    axis = fig.add_subplot(111, projection="3d")
    collection = Poly3DCollection(mesh.triangles, facecolor="#5a7184", edgecolor="none")
    axis.add_collection3d(collection)
    axis.auto_scale_xyz(mesh.vertices[:, 0], mesh.vertices[:, 1], mesh.vertices[:, 2])
    axis.view_init(elev=24, azim=-52)
    axis.set_box_aspect(mesh.extents.tolist())
    axis.set_axis_off()
    fig.tight_layout(pad=0)
    fig.savefig(stem.with_suffix(".png"), dpi=180, bbox_inches="tight", pad_inches=0.05)
    plt.close(fig)

    reopened = import_step(step_path)
    box = reopened.bounding_box()
    report = {
        "step": str(step_path),
        "stl": str(stl_path),
        "units": "mm",
        "bounding_box": {"x": box.size.X, "y": box.size.Y, "z": box.size.Z},
        "volume_mm3": reopened.volume,
        "solids": len(reopened.solids()),
        "valid": reopened.is_valid,
    }
    stem.with_suffix(".json").write_text(json.dumps(report, indent=2) + "\n")
    if not report["valid"] or report["solids"] != 1:
        raise SystemExit(f"STEP validation failed: {report}")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
