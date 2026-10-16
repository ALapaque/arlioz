#!/usr/bin/env python3
"""Build the self-hosted font files in app/fonts from the sources in scripts/fonts/src.

Every font is subset to the Latin characters the content needs (FR/EN), keeping the
OpenType features that matter for the design, then each variable font is instanced to
the weights the site actually uses (see FONTS below). Requires `pip install fonttools brotli`.

    python3 scripts/fonts/subset.py            # writes app/fonts/*.woff2
    python3 scripts/fonts/subset.py --check    # only verifies glyph coverage of app/fonts
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "scripts" / "fonts" / "src"
OUT = ROOT / "app" / "fonts"

# Latin core: ASCII, Latin-1, Œ/œ, Š/š/Ÿ/Ž/ž, dashes, quotes, bullet, ellipsis, euro,
# arrows (↑ → in the UI), minus sign.
UNICODES = (
    "U+0020-007E,U+00A0-00FF,U+0152-0153,U+0160-0161,U+0178,U+017D-017E,"
    "U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+20AC,U+2190-2193,U+2212"
)

FEATURES = ["ccmp", "locl", "kern", "liga", "calt", "pnum", "tnum", "frac", "numr", "dnom"]

# output file -> (source file, axis limits for the instancer, unicode spec).
# A range keeps the axis (restricted), a single value pins it (static instance).
# Bricolage: the site only uses 500 and 600, so two static instances at the display
# optical size replace the 75 kB variable font. JetBrains Mono: one instance at 500,
# declared for 400–500 (labels of 11–12 px). Instrument Sans stays variable (400–600).
FONTS: dict[str, tuple[str, dict | None, str]] = {
    "bricolage-grotesque-500.woff2": ("bricolage-grotesque-latin.woff2", {"wght": 500, "opsz": 96}, UNICODES),
    "bricolage-grotesque-600.woff2": ("bricolage-grotesque-latin.woff2", {"wght": 600, "opsz": 96}, UNICODES),
    "instrument-sans-latin.woff2": ("instrument-sans-latin.woff2", {"wght": (400, 600)}, UNICODES),
    # Only the two highlighted words of the hero title: letters, accents and punctuation.
    "instrument-serif-italic-latin.woff2": (
        "instrument-serif-italic-latin.woff2",
        None,
        "U+0020-007E,U+00C0-00FF,U+0152-0153,U+2013-2014,U+2018-2019,U+201C-201D,U+2026",
    ),
    "jetbrains-mono-500.woff2": ("jetbrains-mono-latin.woff2", {"wght": 500}, UNICODES),
}

CONTENT_FILES = [
    "content/fr.ts",
    "content/en.ts",
    "content/legal.ts",
    "content/media.ts",
    "lib/site.ts",
    "app/[locale]/not-found.tsx",
]


def content_characters() -> set[str]:
    chars: set[str] = set()
    for rel in CONTENT_FILES:
        text = (ROOT / rel).read_text(encoding="utf-8")
        for pattern in (r"'((?:[^'\\]|\\.)*)'", r'"((?:[^"\\]|\\.)*)"', r"`((?:[^`\\]|\\.)*)`"):
            for literal in re.findall(pattern, text):
                chars.update(literal)
    chars -= {"\\", "\n"}
    return chars


def parse_unicodes(spec: str) -> set[int]:
    points: set[int] = set()
    for part in spec.split(","):
        a, _, b = part[2:].partition("-")
        start = int(a, 16)
        end = int(b, 16) if b else start
        points.update(range(start, end + 1))
    return points


def build(name: str, source: str, limits: dict | None, unicodes: str) -> int:
    font = TTFont(SRC / source, lazy=False)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = FEATURES
    options.hinting = False
    options.desubroutinize = True
    options.name_IDs = ["*"]
    options.notdef_outline = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=parse_unicodes(unicodes))
    subsetter.subset(font)
    # Instance after subsetting: the subsetter chokes on the partial gvar an instanced font carries.
    if limits and "fvar" in font:
        font = instancer.instantiateVariableFont(font, limits, inplace=False, updateFontNames=False)
    out = OUT / name
    font.save(out)
    return out.stat().st_size


def check() -> bool:
    needed = {c for c in content_characters() if ord(c) > 0x20}
    ok = True
    for name, (source, _, unicodes) in FONTS.items():
        cmap = TTFont(OUT / name).getBestCmap()
        available = TTFont(SRC / source).getBestCmap()
        wanted = parse_unicodes(unicodes)
        # A glyph the source never had, or one deliberately left out of this face's range,
        # is not a loss; anything else the content uses must still be there.
        missing = sorted(c for c in needed if ord(c) in available and ord(c) in wanted and ord(c) not in cmap)
        size = (OUT / name).stat().st_size
        print(f"{name:40s} {size / 1024:5.1f} kB  glyphs {len(cmap):3d}  missing {''.join(missing) or '-'}")
        ok &= not missing
    return ok


def main() -> int:
    if "--check" not in sys.argv:
        for name, (source, limits, unicodes) in FONTS.items():
            before = (SRC / source).stat().st_size
            after = build(name, source, limits, unicodes)
            print(f"{name:40s} {before / 1024:5.1f} kB -> {after / 1024:5.1f} kB")
    return 0 if check() else 1


if __name__ == "__main__":
    sys.exit(main())
