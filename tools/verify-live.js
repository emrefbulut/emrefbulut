'use strict';

// Checks the published profile rather than the local files. A malformed SVG
// still produces an <img> element, so the meaningful assertion is that every
// image actually decoded (naturalWidth > 0) and that its source resolves to
// this repository instead of a third-party service.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PROFILE = 'https://github.com/emrefbulut';
const OUT = path.join(__dirname, '..', 'verify');

// The view counter is the one intentional exception: counting views needs
// server-side state, so it cannot be served from a repository.
const ALLOWED_EXTERNAL = ['komarev.com'];
const FORBIDDEN = ['img.shields.io', 'demolab.com', 'vercel.app', 'capsule-render'];

const isOwn = (u) =>
  /^https:\/\/github\.com\/emrefbulut\/emrefbulut\/raw\//.test(u) ||
  /^https:\/\/raw\.githubusercontent\.com\/emrefbulut\/emrefbulut\//.test(u);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  let failures = 0;

  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 1400 },
      deviceScaleFactor: 2,
      colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(PROFILE, { waitUntil: 'load', timeout: 60000 });

    const readme = page.locator('article.markdown-body').first();
    await readme.waitFor({ timeout: 30000 });
    await page.waitForTimeout(4000);

    const images = await readme.evaluate((root) =>
      [...root.querySelectorAll('img')].map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
      }))
    );

    console.log(`\n=== ${scheme} mode — ${images.length} image(s) in the profile README ===`);

    for (const img of images) {
      const host = new URL(img.src).host;
      const label = decodeURIComponent(img.src.split('/').pop()).slice(0, 42);
      const problems = [];

      if (img.w === 0 || img.h === 0) problems.push('decoded to zero size (broken image)');
      for (const bad of FORBIDDEN) if (img.src.includes(bad)) problems.push(`forbidden host: ${bad}`);
      if (!isOwn(img.src) && !ALLOWED_EXTERNAL.some((a) => img.src.includes(a))) {
        // GitHub proxies remote images through camo, so resolve those by alt text.
        if (host === 'camo.githubusercontent.com') {
          if (!/profile views/i.test(img.alt)) problems.push(`unexpected proxied image: ${img.alt}`);
        } else {
          problems.push(`not served from this repo: ${host}`);
        }
      }

      if (problems.length) {
        failures += 1;
        console.error(`  BROKEN  ${label}`);
        for (const p of problems) console.error(`          - ${p}`);
      } else {
        console.log(`  ok      ${String(img.w + 'x' + img.h).padEnd(9)} ${host.padEnd(26)} ${label}`);
      }
    }

    const shot = path.join(OUT, `live-profile-${scheme}.png`);
    await readme.screenshot({ path: shot });
    console.log(`  screenshot: ${shot}`);
    await ctx.close();
  }

  await browser.close();

  if (failures) {
    console.error(`\n${failures} image problem(s) found`);
    process.exit(1);
  }
  console.log('\nAll profile images resolve from this repository and decoded successfully.');
})();
