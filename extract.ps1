$lines = Get-Content src/app/page.tsx
$extracted = $lines[307..420]
$header = "'use client';`n`nimport { useState } from 'react';`n`n"
Set-Content src/components/TrustMarkers.tsx ($header + ($extracted -join "`n"))
$newlines = $lines[0..306] + $lines[421..($lines.Length-1)]
Set-Content src/app/page.tsx $newlines
