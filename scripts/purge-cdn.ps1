# ─────────────────────────────────────────────────────────────────────────────
# Furrytail — purge the Hostinger server-side + CDN cache
#
# Hostinger does not purge on deploy. Because Next's chunk filenames are
# content-hashed, an edge-cached document from the previous build asks for
# chunks the new build no longer has: the stylesheet 404s and the site paints
# completely unstyled until the client reloads. Run this AFTER the new files
# are live (upload + extract + restart), never before - purging first would
# just re-cache the old build.
#
# src/instrumentation.ts already does this automatically on server start, so
# this script is for purging on demand, or for when the app's env vars are not
# set.
#
# Usage:
#   $env:HOSTINGER_API_TOKEN = "<token from hpanel.hostinger.com/api>"
#   powershell -ExecutionPolicy Bypass -File scripts\purge-cdn.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\purge-cdn.ps1 -Domain other.com
# ─────────────────────────────────────────────────────────────────────────────

param(
    [string]$Domain   = "furrytailjoy.com",
    [string]$Username = $env:HOSTINGER_ACCOUNT_USERNAME,
    [string]$Token    = $env:HOSTINGER_API_TOKEN
)

$ErrorActionPreference = 'Stop'
$apiBase = "https://developers.hostinger.com"

if (-not $Token) {
    Write-Host "ERROR: no API token." -ForegroundColor Red
    Write-Host "  Create one at hpanel.hostinger.com/api, then:" -ForegroundColor Yellow
    Write-Host '  $env:HOSTINGER_API_TOKEN = "<token>"' -ForegroundColor Yellow
    exit 1
}

$headers = @{ Authorization = "Bearer $Token"; Accept = "application/json" }

# ── Resolve the hosting account username ──────────────────────────────────────
# The purge path is scoped by account username, which is not the domain and is
# easy to get wrong. Look it up from the websites list instead of guessing.
if (-not $Username) {
    Write-Host "Looking up the hosting account for $Domain ..."
    try {
        $sites = Invoke-RestMethod -Uri "$apiBase/api/hosting/v1/websites" -Headers $headers -Method Get
    } catch {
        Write-Host "ERROR: could not list websites: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "       Check the token is valid and has hosting scope." -ForegroundColor Yellow
        exit 1
    }

    # Response shape has moved around between API versions, so match loosely on
    # any domain-ish field rather than binding to one key.
    $items = if ($sites.data) { $sites.data } else { $sites }
    $match = $items | Where-Object {
        $_.domain -eq $Domain -or $_.name -eq $Domain -or $_.website -eq $Domain
    } | Select-Object -First 1

    if (-not $match) {
        Write-Host "Could not find $Domain. Websites on this token:" -ForegroundColor Yellow
        $items | Format-List | Out-String | Write-Host
        Write-Host "Re-run with -Username <username>" -ForegroundColor Yellow
        exit 1
    }

    $Username = $match.username
    if (-not $Username) {
        Write-Host "Found $Domain but it carries no username field:" -ForegroundColor Yellow
        $match | Format-List | Out-String | Write-Host
        Write-Host "Re-run with -Username <username>" -ForegroundColor Yellow
        exit 1
    }

    Write-Host "  account username: $Username" -ForegroundColor Green
    Write-Host "  (set HOSTINGER_ACCOUNT_USERNAME in hPanel so the app can self-purge)"
}

# ── Purge ─────────────────────────────────────────────────────────────────────
$purgeUrl = "$apiBase/api/hosting/v1/accounts/$Username/websites/$Domain/cache/clear"
Write-Host "Purging $Domain ..."

try {
    Invoke-RestMethod -Uri $purgeUrl -Headers $headers -Method Delete | Out-Null
} catch {
    Write-Host "ERROR: purge failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message -ForegroundColor Red }
    Write-Host "Fall back to hPanel > Performance > CDN > Purge cache." -ForegroundColor Yellow
    exit 1
}

Write-Host "Purged. Global propagation takes a few minutes." -ForegroundColor Green
Write-Host ""

# ── Verify ───────────────────────────────────────────────────────────────────────
# The failure mode is silent - the site looks fine to anyone whose browser
# already holds the old assets - so check that the document's stylesheet
# actually resolves rather than trusting the purge call's 200.
#
# A purge takes a few minutes to propagate across edges, so poll instead of
# checking once. Checking immediately reports a false BROKEN while the old
# document is still being served, which is worse than not checking at all.
$deadline = (Get-Date).AddMinutes(3)
$attempt  = 0
$ok       = $false

Write-Host "Verifying the served document's stylesheet resolves ..."
Write-Host "  (polling for up to 3 minutes while the purge propagates)"

while (-not $ok -and (Get-Date) -lt $deadline) {
    $attempt++
    try {
        # Cache-bust the verification request itself, or the check can be
        # answered by the very stale entry it is meant to detect.
        $html = (Invoke-WebRequest -Uri "https://$Domain/" -UseBasicParsing -Headers @{ 'Cache-Control' = 'no-cache' }).Content
        $css  = [regex]::Match($html, '/_next/static/chunks/[A-Za-z0-9_-]+\.css').Value

        if (-not $css) {
            Write-Host "  WARN: no stylesheet link found in the HTML." -ForegroundColor Yellow
            break
        }

        # Windows PowerShell 5.1 has no -SkipHttpErrorCheck: a 404 throws, so
        # the status has to be read off the exception instead.
        $code = 0
        try {
            $code = (Invoke-WebRequest -Uri "https://$Domain$css" -UseBasicParsing).StatusCode
        } catch {
            if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
        }

        if ($code -eq 200) {
            Write-Host "  OK: $css -> 200" -ForegroundColor Green
            $ok = $true
        } else {
            Write-Host "  attempt $attempt : $css -> $code, still propagating ..." -ForegroundColor DarkGray
            Start-Sleep -Seconds 15
        }
    } catch {
        Write-Host "  attempt $attempt : could not reach the site ($($_.Exception.Message))" -ForegroundColor DarkGray
        Start-Sleep -Seconds 15
    }
}

if (-not $ok) {
    Write-Host ""
    Write-Host "STILL BROKEN after 3 minutes: the document references a stylesheet" -ForegroundColor Red
    Write-Host "that 404s, so the site will paint unstyled." -ForegroundColor Red
    Write-Host "  - Confirm the Web App was restarted AFTER the files were extracted," -ForegroundColor Yellow
    Write-Host "    otherwise the old process is still serving the old build's HTML." -ForegroundColor Yellow
    Write-Host "  - Then purge again from hPanel > Performance > CDN." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Done - $Domain is serving a document whose assets all resolve." -ForegroundColor Green
Write-Host ""
