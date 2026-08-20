'use strict';

// Shared chrome for the generated stat cards. Palette is taken from
// assets/header.svg so the cards read as part of the same banner family, and
// every card paints an opaque dark background so it stays legible under both
// GitHub light and dark themes.
const PALETTE = {
  bgTop: '#0D1117',
  bgBottom: '#010409',
  border: '#1F6FEB',
  title: '#FFFFFF',
  text: '#C9D1D9',
  muted: '#6E7681',
  accent: '#58A6FF',
  primary: '#1F6FEB',
};

const SANS = '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif';

const num = (n) => String(Math.round(n * 1000) / 1000);

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const group = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function text(content, { x, y, size = 13, weight = 400, fill = PALETTE.text, anchor = 'start', opacity }) {
  const op = opacity === undefined ? '' : ` opacity="${num(opacity)}"`;
  return (
    `<text x="${num(x)}" y="${num(y)}" font-family="${SANS}" font-size="${num(size)}" ` +
    `font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${op}>${esc(content)}</text>`
  );
}

/** A labelled figure: large accent number above a muted caption. */
function metric(value, label, { x, y, anchor = 'middle', size = 26 }) {
  return (
    text(value, { x, y, size, weight: 700, fill: PALETTE.accent, anchor }) +
    text(label, { x, y: y + 17, size: 11, weight: 500, fill: PALETTE.muted, anchor })
  );
}

/** Wraps card body markup in the standard frame (gradient fill + blue hairline). */
function frame({ id, width, height, title, body }) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${num(width)}" height="${num(height)}" ` +
    `viewBox="0 0 ${num(width)} ${num(height)}" role="img" aria-label="${esc(title)}">\n` +
    `  <title>${esc(title)}</title>\n` +
    `  <defs>\n` +
    `    <linearGradient id="${id}Base" x1="0" y1="0" x2="0" y2="1">\n` +
    `      <stop offset="0%" stop-color="${PALETTE.bgTop}"/>\n` +
    `      <stop offset="100%" stop-color="${PALETTE.bgBottom}"/>\n` +
    `    </linearGradient>\n` +
    `  </defs>\n` +
    `  <rect x="0.5" y="0.5" width="${num(width - 1)}" height="${num(height - 1)}" rx="10" ` +
    `fill="url(#${id}Base)" stroke="${PALETTE.border}" stroke-opacity="0.4"/>\n` +
    body +
    `\n</svg>\n`
  );
}

module.exports = { PALETTE, SANS, frame, text, metric, esc, num, group };
