'use strict';

// Screenshots individual assets at 2x on both backgrounds, for close inspection.
// Usage: node tools/shot.js stats.svg languages.svg

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'verify');
const names = process.argv.slice(2);

if (!names.length) {
  console.error('usage: node tools/shot.js <asset.svg> [...]');
  process.exit(1);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const bg of ['light', 'dark']) {
    const color = bg === 'light' ? '#ffffff' : '#0d1117';
    const rows = names
      .map((n) => `<img src="../assets/${n}" alt="${n}" data-name="${n}">`)
      .join('\n');
    const page = path.join(OUT, `shot-${bg}.html`);
    fs.writeFileSync(
      page,
      `<!doctype html><meta charset="utf-8">` +
        `<style>body{margin:0;padding:20px;background:${color};display:flex;` +
        `flex-direction:column;gap:16px;align-items:flex-start}img{display:block}</style>${rows}`,
      'utf8'
    );

    const ctx = await browser.newContext({ viewport: { width: 940, height: 800 }, deviceScaleFactor: 2 });
    const tab = await ctx.newPage();
    await tab.goto('file:///' + page.replace(/\\/g, '/'));
    await tab.waitForLoadState('networkidle');
    await tab.waitForTimeout(2200);

    for (const n of names) {
      const file = path.join(OUT, `${bg}-${n.replace(/\.svg$/, '')}.png`);
      await tab.locator(`img[data-name="${n}"]`).screenshot({ path: file });
      console.log(file);
    }
    await ctx.close();
  }

  await browser.close();
})();
