const fs = require('fs');

const pageTsxPath = 'src/app/page.tsx';
let content = fs.readFileSync(pageTsxPath, 'utf8');
const lines = content.split('\n');

const startIndex = lines.findIndex(line => line.startsWith('export const TRUST_MARKERS = ['));
const endIndex = lines.findIndex((line, index) => index > startIndex && line === '}') + 1; // Find the closing brace of TrustMarkerItem

if (startIndex !== -1 && endIndex !== 0) {
  const extractedLines = lines.slice(startIndex, endIndex);
  const trustMarkersContent = `'use client';\n\nimport { useState } from 'react';\n\n` + extractedLines.join('\n');
  fs.writeFileSync('src/components/TrustMarkers.tsx', trustMarkersContent);

  lines.splice(startIndex, endIndex - startIndex);
  
  // Add import statement at the top (after other imports)
  const importIndex = lines.findIndex(line => line.includes('import SecondaryOutlineBtn'));
  lines.splice(importIndex + 1, 0, `import { TRUST_MARKERS, TrustMarkerItem } from '@/components/TrustMarkers';`);

  fs.writeFileSync(pageTsxPath, lines.join('\n'));
  console.log('Extraction complete');
} else {
  console.log('Could not find TRUST_MARKERS');
}
