# ─────────────────────────────────────────────────────────────────────────────
# Furrytail — build + package for Hostinger Node.js (Web App) deployment
#
# Produces deploy/furrytail-deploy.zip (~48 MB) containing a self-contained
# Next.js server. Upload + extract on Hostinger, then run: node server.js
#
# Usage:   powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1
#          powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1 -SkipInstall
#
# Requires: output: 'standalone' in next.config.js
# ─────────────────────────────────────────────────────────────────────────────

param(
    [switch]$SkipInstall
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host ""
Write-Host "Furrytail deploy build" -ForegroundColor Cyan
Write-Host "----------------------"

# ── Guard: standalone output must be configured ───────────────────────────────
# Without it .next/standalone is never produced and the zip would be unusable.
$config = Get-Content "next.config.js" -Raw
if ($config -notmatch "output:\s*'standalone'") {
    Write-Host "ERROR: next.config.js is missing output: 'standalone'" -ForegroundColor Red
    Write-Host "       Add it inside the nextConfig object, then re-run." -ForegroundColor Red
    exit 1
}

# ── Clean previous artifacts ──────────────────────────────────────────────────
foreach ($path in @(".next", "deploy")) {
    if (Test-Path $path) {
        Write-Host "Cleaning $path ..."
        try { Remove-Item $path -Recurse -Force } catch {}
    }
}

# ── Install ───────────────────────────────────────────────────────────────────
if (-not $SkipInstall) {
    Write-Host "Installing dependencies ..."
    npm install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: npm install failed" -ForegroundColor Red
        exit 1
    }
}

# ── Build ─────────────────────────────────────────────────────────────────────
Write-Host "Building ..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: build failed - nothing was packaged" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".next\standalone\server.js")) {
    Write-Host "ERROR: .next\standalone\server.js not found after build" -ForegroundColor Red
    exit 1
}

# ── Assemble ──────────────────────────────────────────────────────────────────
# Next's standalone output deliberately EXCLUDES .next/static and public/.
# Both must be copied in, or the deployed site loads with no CSS and no images
# - which looks like a broken build and is maddening to debug on the server.
Write-Host "Copying static assets ..."
New-Item -ItemType Directory -Force -Path ".next\standalone\.next\static" | Out-Null
Copy-Item ".next\static\*" ".next\standalone\.next\static\" -Recurse -Force

if (Test-Path "public") {
    Write-Host "Copying public/ ..."
    New-Item -ItemType Directory -Force -Path ".next\standalone\public" | Out-Null
    Copy-Item "public\*" ".next\standalone\public\" -Recurse -Force
}

# ── Verify the three required pieces are present ──────────────────────────────
$checks = @(
    ".next\standalone\server.js",
    ".next\standalone\.next\static",
    ".next\standalone\public"
)
foreach ($c in $checks) {
    if (-not (Test-Path $c)) {
        Write-Host "ERROR: missing $c" -ForegroundColor Red
        exit 1
    }
}

# ── Package ───────────────────────────────────────────────────────────────────
Write-Host "Packaging ..."
New-Item -ItemType Directory -Force -Path "deploy" | Out-Null
Compress-Archive -Path ".next\standalone\*" -DestinationPath "deploy\furrytail-deploy.zip" -Force

$zip = Get-Item "deploy\furrytail-deploy.zip"
$mb = [math]::Round($zip.Length / 1MB, 1)

Write-Host ""
Write-Host "Done: deploy\furrytail-deploy.zip ($mb MB)" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps on Hostinger:" -ForegroundColor Cyan
Write-Host "  1. hPanel > Files > upload furrytail-deploy.zip to the Web App directory"
Write-Host "  2. Extract it there (contents at the app root, not in a subfolder)."
Write-Host "     Do NOT delete the existing .next/static first - extract over it."
Write-Host "     Chunk filenames are content-hashed, so leaving the previous"
Write-Host "     build's files in place keeps any already-cached HTML working."
Write-Host "  3. Ensure the Web App start command is:  node server.js"
Write-Host "  4. Set env vars in hPanel (NEXT_PUBLIC_WP_URL, PORT if required)"
Write-Host "  5. Restart the Web App"
Write-Host "  6. Purge the CDN cache - AFTER the restart, not before:"
Write-Host "       powershell -File scripts\purge-cdn.ps1"
Write-Host "     or hPanel > Performance > CDN > Purge cache"
Write-Host ""
Write-Host "Step 6 is not optional. Hostinger's CDN caches the prerendered HTML" -ForegroundColor Yellow
Write-Host "and does not purge on deploy, so without it visitors keep getting the" -ForegroundColor Yellow
Write-Host "old document, which requests the old build's hashed chunks. The CSS" -ForegroundColor Yellow
Write-Host "404s and the site paints completely unstyled until the client reloads." -ForegroundColor Yellow
Write-Host ""
Write-Host "To skip step 6 for good, set HOSTINGER_API_TOKEN," -ForegroundColor Cyan
Write-Host "HOSTINGER_ACCOUNT_USERNAME and HOSTINGER_PURGE_DOMAIN in hPanel's Web" -ForegroundColor Cyan
Write-Host "App environment: src/instrumentation.ts then purges on every restart." -ForegroundColor Cyan
Write-Host ""
Write-Host "If the site loads unstyled, open devtools > Network and check whether" -ForegroundColor Yellow
Write-Host "/_next/static/chunks/*.css 404s. If it does, the CDN is serving stale" -ForegroundColor Yellow
Write-Host "HTML (purge it). If everything 404s, .next/static did not upload." -ForegroundColor Yellow
Write-Host ""
