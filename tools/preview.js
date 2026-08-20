'use strict';

// Local render check. Loads every generated asset in Chromium, fails if any of
// them decodes to a zero-width image (how a malformed SVG actually presents in
// a browser), and writes light/dark screenshots for eyeballing.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');
const OUT = path.join(ROOT, 'verify');

const ORDER = [
  'header.svg',
  'typing.svg',
  'badge-portfolio.svg',
  'badge-linkedin.svg',
  'badge-gmail.svg',
  'badge-github.svg',
  'badge-pypi.svg',
  'badge-iqforge-pypi.svg',
  'proj-iqforge-mit.svg',
  'proj-iqforge-tech.svg',
  'proj-roomgate-top.svg',
  'proj-roomgate-tech.svg',
  'proj-iot-top.svg',
  'proj-iot-tech.svg',
  'proj-voltpilot-top.svg',
  'proj-voltpilot-tech.svg',
  'stack-ai.svg',
  'stack-rf.svg',
  'stack-languages.svg',
  'stack-hardware.svg',
  'stack-systems.svg',
  'stack-data.svg',
  'stats.svg',
  'languages.svg',
  'streak.svg',
  'footer.svg',
];

const files = fs.readdirSync(ASSETS).filter((f) => f.endsWith('.svg'));
const missing = files.filter((f) => !ORDER.includes(f));
if (missing.length) throw new Error(`preview order is missing: ${missing.join(', ')}`);

const rows = ORDER.map(
  (f) =>
    `<figure><figcaption>${f}</figcaption>` +
    `<img src="../assets/${f}" alt="${f}" data-name="${f}"></figure>`
).join('\n');

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  body { margin: 0; font: 13px/1.5 -apple-system, Segoe UI, sans-serif; }
  .pane { padding: 24px 32px; }
  .light { background: #ffffff; color: #1f2328; }
  .dark  { background: #0d1117; color: #e6edf3; }
  figure { margin: 0 0 18px; }
  figcaption { font-family: ui-monospace, Consolas, monospace; opacity: .55; margin-bottom: 5px; }
  img { display: block; max-width: 100%; }
  h2 { margin: 0 0 18px; font-size: 15px; letter-spacing: .04em; text-transform: uppercase; opacity: .6; }
</style>
<div class="pane light"><h2>Light mode</h2>${rows}</div>
<div class="pane dark"><h2>Dark mode</h2>${rows}</div>
`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const page = path.join(OUT, 'preview.html');
  fs.writeFileSync(page, html, 'utf8');

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 1200 }, deviceScaleFactor: 2 });
  const tab = await ctx.newPage();

  const consoleErrors = [];
  tab.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));

  await tab.goto('file:///' + page.replace(/\\/g, '/'));
  await tab.waitForLoadState('networkidle');
  // Let the SMIL timelines advance so the typing card is mid-animation.
  await tab.waitForTimeout(2500);

  const results = await tab.evaluate(() =>
    [...document.querySelectorAll('img')].map((img) => ({
      name: img.dataset.name,
      w: img.naturalWidth,
      h: img.naturalHeight,
      complete: img.complete,
    }))
  );

  const seen = new Map();
  for (const r of results) if (!seen.has(r.name)) seen.set(r.name, r);

  let broken = 0;
  for (const r of seen.values()) {
    if (!r.complete || r.w === 0 || r.h === 0) {
      broken += 1;
      console.error(`BROKEN ${r.name}  naturalWidth=${r.w} naturalHeight=${r.h}`);
    } else {
      console.log(`ok     ${r.name.padEnd(26)} ${r.w}x${r.h}`);
    }
  }

  await tab.screenshot({ path: path.join(OUT, 'preview-assets.png'), fullPage: true });
  await browser.close();

  if (consoleErrors.length) console.error('\nconsole errors:\n' + consoleErrors.join('\n'));
  console.log(`\n${seen.size} asset(s) checked, ${broken} broken`);
  console.log(`screenshot: ${path.join(OUT, 'preview-assets.png')}`);
  if (broken) process.exit(1);
})();
