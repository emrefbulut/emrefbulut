'use strict';

const fs = require('fs');
const path = require('path');
const { renderRow, renderSingle } = require('./lib/badge');
const defs = require('./lib/badge-defs');

const ASSETS = path.join(__dirname, '..', 'assets');

function write(name, svg) {
  fs.writeFileSync(path.join(ASSETS, name), svg, 'utf8');
  console.log(`${name}  ${svg.length} bytes`);
}

fs.mkdirSync(ASSETS, { recursive: true });

for (const [name, badge] of Object.entries(defs.contact)) {
  write(name, renderSingle({ ...badge, style: 'for-the-badge' }));
}

for (const [name, row] of Object.entries(defs.stack)) {
  write(name, renderRow(row.badges.map((b) => ({ ...b, style: 'for-the-badge' })), { gap: 6, title: row.title }));
}

for (const [name, row] of Object.entries(defs.project)) {
  if (row.single) write(name, renderSingle({ style: 'flat-square', ...row.single }));
  else
    write(
      name,
      renderRow(row.badges.map((b) => ({ style: 'flat-square', ...b })), { gap: 4, title: row.title })
    );
}
