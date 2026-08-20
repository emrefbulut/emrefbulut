'use strict';

// Gate for every SVG in assets/. An unescaped "&" is the classic way to ship a
// file that looks fine in an editor and renders as nothing in a browser, so the
// files are run through a strict XML parser and a few GitHub-specific checks:
// no data: URIs and no external references, both of which are killed by the
// `default-src 'none'` CSP that GitHub serves README images under.

const fs = require('fs');
const path = require('path');
const { XMLValidator } = require('fast-xml-parser');

const ASSETS = path.join(__dirname, '..', 'assets');
const files = fs.readdirSync(ASSETS).filter((f) => f.endsWith('.svg')).sort();

let failed = 0;

if (files.length === 0) {
  console.error('no SVGs found in assets/');
  process.exit(1);
}

for (const file of files) {
  const full = path.join(ASSETS, file);
  const svg = fs.readFileSync(full, 'utf8');
  const problems = [];

  const result = XMLValidator.validate(svg, { allowBooleanAttributes: false });
  if (result !== true) {
    problems.push(`XML: ${result.err.msg} (line ${result.err.line}, col ${result.err.col})`);
  }

  const bare = svg.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/g, '');
  if (bare.includes('&')) problems.push('contains an unescaped "&"');

  if (/data:/.test(svg)) problems.push('contains a data: URI (blocked by GitHub CSP)');
  if (/@font-face/.test(svg)) problems.push('contains @font-face (blocked by GitHub CSP)');
  if (/<(?:script|foreignObject)\b/.test(svg)) problems.push('contains script/foreignObject');
  if (/(?:href|src)\s*=\s*"https?:/.test(svg)) problems.push('references an external URL');
  if (!/^<svg\b/.test(svg.trim())) problems.push('does not start with <svg>');
  if (!/\bwidth="[\d.]+"/.test(svg) || !/\bheight="[\d.]+"/.test(svg)) {
    problems.push('missing intrinsic width/height');
  }

  if (problems.length) {
    failed += 1;
    console.error(`FAIL ${file}`);
    for (const p of problems) console.error(`     - ${p}`);
  } else {
    const size = (svg.length / 1024).toFixed(1);
    const dims = `${svg.match(/\bwidth="([\d.]+)"/)[1]}x${svg.match(/\bheight="([\d.]+)"/)[1]}`;
    console.log(`ok   ${file.padEnd(28)} ${dims.padEnd(10)} ${size} KiB`);
  }
}

if (failed) {
  console.error(`\n${failed} of ${files.length} SVG(s) failed validation`);
  process.exit(1);
}
console.log(`\nall ${files.length} SVG(s) valid`);
