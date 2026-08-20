'use strict';

const fs = require('fs');
const path = require('path');

// Self-hosted replacement for readme-typing-svg.demolab.com.
//
// Two constraints shape this file. GitHub serves README images under
// `Content-Security-Policy: default-src 'none'`, so @font-face and any data:
// URI is dead on arrival — layout may only rely on locally installed fonts.
// Every glyph run therefore carries an explicit `textLength`, which pins the
// advance width regardless of which monospace face actually resolves.
//
// The reveal is driven by clip-rect widths rather than opacity: `fill="freeze"`
// on opacity was observed to drop text once the timeline ended, whereas a
// width track with repeatCount="indefinite" never freezes and the unanimated
// attribute values stay meaningful for renderers that ignore SMIL.

const LINES = [
  'AI, Deep Learning & LLMs',
  'RF & Microwave Engineering',
  'Machine Learning on SDR / IQ Signals',
  'Hardware-Software Integration',
];

const WIDTH = 700;
const HEIGHT = 48;
const FONT_SIZE = 20;
const ADVANCE = FONT_SIZE * 0.6; // monospace advance ratio, held true by textLength
const BASELINE = 31;

const SLOT = 4.0;
const TYPE = 1.8;
const HOLD = 1.3;
const ERASE = 0.6;
const CYCLE = LINES.length * SLOT;

const FONT_STACK =
  'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, DejaVu Sans Mono, monospace';

const num = (n) => String(Math.round(n * 1000) / 1000);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Builds the discrete keyTimes/values tracks for one line: type in one
 * character at a time, hold, backspace out, then stay empty until the cycle
 * wraps. Returned widths are clip widths; caret positions share the keyTimes.
 */
function track(index, charCount) {
  const start = index * SLOT;
  const typeEnd = start + TYPE;
  const holdEnd = typeEnd + HOLD;
  const eraseEnd = holdEnd + ERASE;

  const times = [];
  const chars = [];

  const push = (t, c) => {
    times.push(Math.min(t / CYCLE, 1));
    chars.push(c);
  };

  push(0, 0);
  if (start > 0) push(start, 0);

  for (let c = 1; c <= charCount; c++) push(start + (TYPE * c) / charCount, c);

  const steps = Math.min(charCount, 12);
  for (let k = 1; k <= steps; k++) {
    push(holdEnd + (ERASE * k) / steps, Math.round(charCount * (1 - k / steps)));
  }

  push(eraseEnd, 0);
  push(CYCLE, 0);

  // Discrete interpolation requires a monotonic keyTimes list.
  const t = [];
  const c = [];
  for (let i = 0; i < times.length; i++) {
    if (i > 0 && times[i] <= t[t.length - 1]) continue;
    t.push(times[i]);
    c.push(chars[i]);
  }
  if (t[t.length - 1] !== 1) {
    t.push(1);
    c.push(0);
  }

  return { times: t, chars: c, start, eraseEnd };
}

function animate(attr, times, values) {
  return (
    `<animate attributeName="${attr}" dur="${num(CYCLE)}s" repeatCount="indefinite" ` +
    `calcMode="discrete" keyTimes="${times.map((v) => num(v)).join(';')}" ` +
    `values="${values.map((v) => num(v)).join(';')}"/>`
  );
}

const clips = [];
const texts = [];
const carets = [];

LINES.forEach((line, i) => {
  const textWidth = line.length * ADVANCE;
  const startX = (WIDTH - textWidth) / 2;
  const { times, chars, start, eraseEnd } = track(i, line.length);

  // Unanimated fallback: the first line renders complete, the rest stay hidden.
  const restWidth = i === 0 ? textWidth : 0;

  clips.push(
    `  <clipPath id="reveal${i}">\n` +
      `    <rect x="${num(startX)}" y="0" width="${num(restWidth)}" height="${HEIGHT}">\n` +
      `      ${animate('width', times, chars.map((c) => c * ADVANCE))}\n` +
      `    </rect>\n  </clipPath>`
  );

  texts.push(
    `  <g clip-path="url(#reveal${i})">\n` +
      `    <text x="${num(startX)}" y="${BASELINE}" textLength="${num(textWidth)}" ` +
      `font-family="${FONT_STACK}" font-size="${FONT_SIZE}" font-weight="600" ` +
      `fill="#58A6FF">${esc(line)}</text>\n  </g>`
  );

  const caretTimes = [0];
  const caretWidths = [i === 0 ? 2 : 0];
  if (start > 0) {
    caretTimes.push(start / CYCLE);
    caretWidths.push(2);
  }
  caretTimes.push(eraseEnd / CYCLE, 1);
  caretWidths.push(0, 0);

  carets.push(
    `  <rect x="${num(startX + restWidth)}" y="${BASELINE - 15}" width="${i === 0 ? 2 : 0}" height="20" fill="#58A6FF">\n` +
      `    ${animate('x', times, chars.map((c) => startX + c * ADVANCE))}\n` +
      `    ${animate('width', caretTimes, caretWidths)}\n` +
      `    <animate attributeName="opacity" dur="1.06s" repeatCount="indefinite" ` +
      `calcMode="discrete" keyTimes="0;0.5" values="1;0.15"/>\n  </rect>`
  );
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Focus areas: ${esc(LINES.join(', '))}">
  <title>Focus areas: ${esc(LINES.join(', '))}</title>
  <defs>
    <linearGradient id="typingBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0D1117"/>
      <stop offset="100%" stop-color="#010409"/>
    </linearGradient>
${clips.join('\n')}
  </defs>

  <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="9" fill="url(#typingBase)" stroke="#1F6FEB" stroke-opacity="0.45"/>

${texts.join('\n')}

${carets.join('\n')}
</svg>
`;

fs.writeFileSync(path.join(__dirname, '..', 'assets', 'typing.svg'), svg, 'utf8');
console.log(`typing.svg  ${svg.length} bytes`);
