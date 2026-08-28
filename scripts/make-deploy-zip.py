#!/usr/bin/env python3
r"""
Build deploy/furrytail-source.zip for Hostinger "Deploy Web App" upload.

    python scripts/make-deploy-zip.py

Hostinger BUILDS FROM SOURCE: it runs `npm install` then `npm run build` on its
own server. So this zip contains source only - no node_modules, no .next.
Uploading a prebuilt bundle instead makes framework detection try to build it
and fail.

hPanel settings that go with this zip:
    Framework preset : Next.js
    Node version     : 22.x
    Root directory   : ./
    Build settings   : Default for Next.js
    Env var          : NEXT_PUBLIC_WP_URL = https://store.furrytailjoy.com
                       (NEXT_PUBLIC_* is inlined at BUILD time - set it before
                        deploying; setting it afterwards has no effect)

Why Python and not Compress-Archive
    PowerShell 5.1's Compress-Archive writes BACKSLASHES as zip path
    separators. Linux unzip rejects that, so the build server would extract
    flat files named "src\lib\woo.ts". zipfile below writes forward slashes.

Why an allowlist and not an exclude list
    With an exclude list every new file in the repo root ships by default -
    that is how a 2.5 MB unused video and a stray curl dump got into earlier
    zips. Nothing ships here unless it is named in REQUIRED, and anything
    unrecognised is reported so it gets a decision instead of a silent ride.
"""

import os
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join("deploy", "furrytail-source.zip")

# Everything the build actually needs. Nothing else is included.
REQUIRED = [
    "package.json",         # deps, scripts, framework detection
    "package-lock.json",    # deterministic npm install
    "next.config.js",
    "tsconfig.json",
    "next-env.d.ts",        # TypeScript needs it or the build errors
    "postcss.config.js",    # Tailwind pipeline
    "middleware.ts",        # active - "Proxy (Middleware)" in the build output
    "src",
    "public",               # ~25 MB; next.config.js reads from it
]

# In the repo but deliberately left out, with the reason.
EXCLUDED = {
    "node_modules": "Hostinger runs npm install (423 MB)",
    ".next": "Hostinger runs the build",
    ".git": "version control",
    "deploy": "output folder - would nest the zip inside itself",
    ".env.local": "local config; set env vars in hPanel instead",
    "tsconfig.tsbuildinfo": "stale local TS build cache",
    "docs": "documentation, not a build input",
    "wordpress": "ft-checkout.php belongs on WordPress, not in this app",
    "scripts": "dev tooling, not a build input",
    ".vercel": "Vercel project link",
    ".vercelignore": "Vercel-specific",
    "vercel.ts": "Vercel-specific config",
    ".kite": "site-builder leftovers",
    ".opencode": "site-builder leftovers",
    "prompts-used": "site-builder leftovers",
    "kite-manifest.json": "site-builder leftovers",
    "visual_spec.md": "design reference",
    "redirects.csv": "only read by vercel.ts",
    "remove_bg.py": "one-off image script",
    "extract.js": "one-off dev script",
    "extract.ps1": "one-off dev script",
    "refactor.js": "one-off dev script",
    "update_components.js": "one-off dev script",
    "update_components.py": "one-off dev script",
    "Dog_and_cat_with_product_202608122340.mp4": "2.5 MB, unused, not in public/",
    ".gitignore": "not a build input",
    ".gitattributes": "not a build input",
    ".git_init.lock": "leftover",
    ".prettierrc": "formatting only",
    ".prettierignore": "formatting only",
    ".qa_last_issues.json": "leftover",
    ".qa_validate_count": "leftover",
    ".dockerignore": "unused",
    ".env.example": "template only",
}


def main() -> int:
    os.chdir(ROOT)
    print("\nFurrytail - build deploy zip\n----------------------------")

    missing = [p for p in REQUIRED if not os.path.exists(p)]
    if missing:
        print(f"ERROR: required paths missing: {', '.join(missing)}")
        return 1

    known = set(REQUIRED) | set(EXCLUDED)
    unknown = sorted(p for p in os.listdir(".") if p not in known)
    if unknown:
        print("\nNOT INCLUDED - unrecognised. Add to REQUIRED if the build needs it:")
        for u in unknown:
            print(f"  {u}")

    if os.path.exists(OUT):
        os.remove(OUT)
    os.makedirs("deploy", exist_ok=True)

    count = 0
    print("\nStaging:")
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for item in REQUIRED:
            if os.path.isfile(item):
                z.write(item, item)
                count += 1
            else:
                for dirpath, dirnames, filenames in os.walk(item):
                    # Never let a nested build/vcs dir sneak in.
                    dirnames[:] = [
                        d for d in dirnames
                        if d not in ("node_modules", ".next", ".git")
                    ]
                    for fn in filenames:
                        full = os.path.join(dirpath, fn)
                        # Forward slashes: the build server is Linux.
                        arc = os.path.relpath(full, ".").replace(os.sep, "/")
                        z.write(full, arc)
                        count += 1
            print(f"  + {item}")

    # Verify the archive before handing it over.
    with zipfile.ZipFile(OUT) as z:
        names = z.namelist()
    bad = [n for n in names if n.startswith(("node_modules/", ".next/")) or "\\" in n]
    if bad:
        print(f"\nERROR: archive is malformed, e.g. {bad[:3]}")
        return 1
    if "package.json" not in names:
        print("\nERROR: package.json is not at the archive root")
        return 1

    mb = os.path.getsize(OUT) / 1024 / 1024
    print(f"\nDone: {OUT}  ({mb:.1f} MB, {count} files)")
    print("\nUpload via hPanel > Websites > Deploy Web App > Upload your files.")
    print('Expect "Generating static pages" to complete with one page per product plus the static routes.\n')
    return 0


if __name__ == "__main__":
    sys.exit(main())
