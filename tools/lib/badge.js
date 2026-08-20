'use strict';

const { makeBadge } = require('badge-maker');
const { getIcon } = require('./icons');

// GitHub's SVG sanitizer is not guaranteed to keep <image href="data:...">
// payloads, so badges are rendered through badge-maker (for exact shields.io
// geometry) and the embedded raster reference is then swapped for an inline
// <path>. Nothing in the committed output depends on a data URI.
const PLACEHOLDER_LOGO =
  'data:image/svg+xml;base64,' +
  Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>').toString('base64');

const IMAGE_RE =
  /<image\s+x="([\d.]+)"\s+y="([\d.]+)"\s+width="([\d.]+)"\s+height="([\d.]+)"\s+href="[^"]*"\s*\/>/;

const num = (n) => String(Math.round(n * 1000) / 1000);

function escapeText(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inlineIcon(slug, box, color) {
  const { viewBox, path } = getIcon(slug);
  const [, , vw, vh] = viewBox;
  const scale = Math.min(box.w / vw, box.h / vh);
  const tx = box.x + (box.w - vw * scale) / 2;
  const ty = box.y + (box.h - vh * scale) / 2;

  return (
    `<g transform="translate(${num(tx)},${num(ty)}) scale(${num(scale)})" fill="${color}">` +
    `<path d="${path}"/></g>`
  );
}

/**
 * Renders a single badge as a standalone SVG string.
 * `logo` is a Simple Icons slug (or "linkedin", which is vendored).
 */
function renderBadge({ label = '', message = '', color, labelColor, style = 'for-the-badge', logo, logoColor = '#FFFFFF', title }) {
  const opts = { label, message, color, style };
  if (labelColor) opts.labelColor = labelColor;
  if (logo) opts.logoBase64 = PLACEHOLDER_LOGO;

  let svg = makeBadge(opts);

  if (logo) {
    const m = svg.match(IMAGE_RE);
    if (!m) throw new Error(`could not locate logo slot for badge "${label}${message}"`);
    const box = { x: +m[1], y: +m[2], w: +m[3], h: +m[4] };
    svg = svg.replace(IMAGE_RE, inlineIcon(logo, box, logoColor));
  } else if (IMAGE_RE.test(svg)) {
    throw new Error('unexpected logo slot');
  }

  if (svg.includes('data:')) throw new Error('badge still contains a data URI');

  const heading = title || [label, message].filter(Boolean).join(' ');
  svg = svg
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(heading)}</title>`)
    .replace(/aria-label="[^"]*"/, `aria-label="${escapeText(heading)}"`)
    .replace(/<text[^>]*textLength="0"[^>]*><\/text>/g, '');

  return svg;
}

function parseBadge(svg) {
  const width = Number(svg.match(/^<svg[^>]*\swidth="([\d.]+)"/)[1]);
  const height = Number(svg.match(/^<svg[^>]*\sheight="([\d.]+)"/)[1]);
  const body = svg
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[^<]*<\/title>/g, '');

  return { width, height, body };
}

/**
 * Lays several badges out on one horizontal strip and returns a single SVG.
 * Used for badge groups that are not links, where one file beats N requests.
 */
function renderRow(badges, { gap = 6, title = '' } = {}) {
  const parts = badges.map((b) => parseBadge(renderBadge(b)));
  const height = Math.max(...parts.map((p) => p.height));

  let x = 0;
  const groups = parts.map((p) => {
    const g = `<g transform="translate(${num(x)},${num((height - p.height) / 2)})">${p.body}</g>`;
    x += p.width + gap;
    return g;
  });

  const width = x - gap;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${num(width)}" height="${num(height)}" ` +
    `viewBox="0 0 ${num(width)} ${num(height)}" role="img" aria-label="${escapeText(title)}">` +
    `<title>${escapeText(title)}</title>${groups.join('')}</svg>\n`
  );
}

function renderSingle(badge) {
  return renderBadge(badge) + '\n';
}

module.exports = { renderBadge, renderRow, renderSingle, escapeText, num };
