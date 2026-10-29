#!/usr/bin/env python3
"""Generate the small static metadata file used by the gallery footer."""

from __future__ import annotations

import argparse
import json
import os
import re
import tempfile
from datetime import datetime, timezone
from pathlib import Path

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}
EXCLUDED_DIRECTORIES = {"logo"}
PROJECT_ROOT = Path(__file__).resolve().parent
NMAX_PATTERN = re.compile(r"(?:^|_)d=([0-9]+(?:\.[0-9]+)?)_.*_Nmax=(\d+)(?:_|\.)")


def count_plots(image_dir: Path) -> int:
    """Count plot assets, excluding branding images from the gallery total."""
    if not image_dir.is_dir():
        raise FileNotFoundError(f"Image directory does not exist: {image_dir}")

    return sum(
        1
        for path in image_dir.rglob("*")
        if path.is_file()
        and path.suffix.lower() in IMAGE_EXTENSIONS
        and not any(
            part in EXCLUDED_DIRECTORIES
            for part in path.relative_to(image_dir).parts[:-1]
        )
    )


def available_nmax_by_dimension(asset_dirs: tuple[Path, ...]) -> dict[str, list[int]]:
    """Index Nmax values represented in the saved data and plot files."""

    values: dict[str, set[int]] = {}
    for asset_dir in asset_dirs:
        if not asset_dir.is_dir():
            raise FileNotFoundError(f"Asset directory does not exist: {asset_dir}")
        for path in asset_dir.rglob("*"):
            if not path.is_file():
                continue
            match = NMAX_PATTERN.search(path.name)
            if match:
                dimension, nmax = match.groups()
                values.setdefault(dimension, set()).add(int(nmax))

    return {
        dimension: sorted(nmax_values)
        for dimension, nmax_values in sorted(values.items(), key=lambda item: float(item[0]))
    }


def write_index(output: Path, count: int, generated_at: str, nmax_by_dimension: dict[str, list[int]]) -> None:
    nmax_entries = ",\n".join(
        f"    {json.dumps(dimension)}: {json.dumps(values)}"
        for dimension, values in nmax_by_dimension.items()
    )
    payload = (
        "window.imageInfo = {\n"
        f"  \"count\": {count},\n"
        f"  \"last_updated\": {json.dumps(generated_at)},\n"
        "  \"available_nmax_by_dimension\": {\n"
        f"{nmax_entries}\n"
        "  }\n"
        "};\n"
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary_name = tempfile.mkstemp(prefix=f".{output.name}.", dir=output.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as stream:
            stream.write(payload)
        os.replace(temporary_name, output)
    except BaseException:
        try:
            os.unlink(temporary_name)
        except FileNotFoundError:
            pass
        raise


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=PROJECT_ROOT / "image_count.js",
        help="output JavaScript metadata path (default: image_count.js beside this script)",
    )
    args = parser.parse_args()

    count = count_plots(PROJECT_ROOT / "images")
    nmax_by_dimension = available_nmax_by_dimension(
        (PROJECT_ROOT / "data", PROJECT_ROOT / "images")
    )
    generated_at = (
        datetime.now(timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace("+00:00", "Z")
    )
    write_index(args.output.resolve(), count, generated_at, nmax_by_dimension)
    print(f"Indexed {count:,} plot images and Nmax availability at {generated_at} into {args.output}")


if __name__ == "__main__":
    main()
