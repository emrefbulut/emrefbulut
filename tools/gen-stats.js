'use strict';

// Renders the GitHub Stats cards into assets/ from live API data.
//
// These are the only numbers on the profile that cannot be frozen at authoring
// time, so instead of pointing the README at a third-party card service the
// workflow in .github/workflows/update-stats.yml runs this script on a schedule
// and commits the result. If the API call or this script fails, nothing is
// committed and the previously generated SVGs stay in place — the README has no
// runtime dependency on anything outside the repository.

const fs = require('fs');
const path = require('path');
const { PALETTE, frame, text, metric, num, group } = require('./lib/card');
const { renderSingle } = require('./lib/badge');
const { pypiVersionBadge } = require('./lib/badge-defs');

const LOGIN = process.env.STATS_LOGIN || 'emrefbulut';
const TOKEN = process.env.GITHUB_TOKEN;
const ASSETS = path.join(__dirname, '..', 'assets');

if (!TOKEN) {
  console.error('GITHUB_TOKEN is required');
  process.exit(1);
}

async function gql(query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': `${LOGIN}-profile-stats`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const bodyText = await res.text();
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}: ${bodyText.slice(0, 500)}`);

  const json = JSON.parse(bodyText);
  if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  return json.data;
}

const PROFILE_QUERY = `
query($login: String!) {
  user(login: $login) {
    name
    login
    createdAt
    followers { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        primaryLanguage { name color }
        languages(first: 12, orderBy: {field: SIZE, direction: DESC}) {
          edges { size node { name color } }
        }
      }
    }
  }
}`;

const CONTRIB_QUERY = `
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

async function collect() {
  const { user } = await gql(PROFILE_QUERY, { login: LOGIN });

  const firstYear = new Date(user.createdAt).getUTCFullYear();
  const thisYear = new Date().getUTCFullYear();

  const totals = { commits: 0, prs: 0, issues: 0, reviews: 0, contributions: 0 };
  const days = new Map();
  let lastYearContributions = 0;

  for (let year = firstYear; year <= thisYear; year++) {
    const from = `${year}-01-01T00:00:00Z`;
    const to = year === thisYear ? new Date().toISOString() : `${year}-12-31T23:59:59Z`;
    const data = await gql(CONTRIB_QUERY, { login: LOGIN, from, to });
    const c = data.user.contributionsCollection;

    totals.commits += c.totalCommitContributions;
    totals.prs += c.totalPullRequestContributions;
    totals.issues += c.totalIssueContributions;
    totals.reviews += c.totalPullRequestReviewContributions;
    totals.contributions += c.contributionCalendar.totalContributions;
    if (year === thisYear) lastYearContributions = c.contributionCalendar.totalContributions;

    for (const week of c.contributionCalendar.weeks) {
      for (const day of week.contributionDays) days.set(day.date, day.contributionCount);
    }
  }

  const repos = user.repositories.nodes;
  const stars = repos.reduce((a, r) => a + r.stargazerCount, 0);

  const reposPerLanguage = new Map();
  const bytesPerLanguage = new Map();
  const colors = new Map();

  for (const repo of repos) {
    if (repo.primaryLanguage) {
      const { name, color } = repo.primaryLanguage;
      reposPerLanguage.set(name, (reposPerLanguage.get(name) || 0) + 1);
      colors.set(name, color || PALETTE.primary);
    }
    for (const edge of repo.languages.edges) {
      const { name, color } = edge.node;
      bytesPerLanguage.set(name, (bytesPerLanguage.get(name) || 0) + edge.size);
      if (!colors.has(name)) colors.set(name, color || PALETTE.primary);
    }
  }

  return {
    user,
    totals,
    stars,
    repoCount: user.repositories.totalCount,
    lastYearContributions,
    days,
    reposPerLanguage,
    bytesPerLanguage,
    colors,
  };
}

function streaks(days) {
  const today = new Date().toISOString().slice(0, 10);
  const dates = [...days.keys()].filter((d) => d <= today).sort();

  let longest = 0;
  let run = 0;
  let longestEnd = null;

  for (const date of dates) {
    if (days.get(date) > 0) {
      run += 1;
      if (run > longest) {
        longest = run;
        longestEnd = date;
      }
    } else {
      run = 0;
    }
  }

  // A day with no contributions yet does not break the streak until it is over.
  let current = 0;
  for (let i = dates.length - 1; i >= 0; i--) {
    const count = days.get(dates[i]);
    if (count > 0) current += 1;
    else if (i === dates.length - 1) continue;
    else break;
  }

  return { current, longest, longestEnd };
}

const W = 854;

function statsCard(d) {
  const updated = new Date().toISOString().slice(0, 10);
  const height = 196;

  const cells = [
    ['Total commits', group(d.totals.commits)],
    ['Total stars earned', group(d.stars)],
    ['Public repositories', group(d.repoCount)],
    ['Followers', group(d.user.followers.totalCount)],
    ['Pull requests', group(d.totals.prs)],
    ['Issues', group(d.totals.issues)],
    ['Code reviews', group(d.totals.reviews)],
    ['Contributions in ' + new Date().getUTCFullYear(), group(d.lastYearContributions)],
  ];

  let body =
    '  ' +
    text('GitHub Stats', { x: 28, y: 38, size: 21, weight: 700, fill: PALETTE.title }) +
    '\n  ' +
    text(`@${d.user.login} · updated ${updated}`, { x: W - 28, y: 38, size: 12, fill: PALETTE.muted, anchor: 'end' }) +
    '\n  ' +
    `<line x1="28" y1="54" x2="${W - 28}" y2="54" stroke="${PALETTE.border}" stroke-opacity="0.3"/>`;

  const colW = (W - 56) / 4;
  cells.forEach(([label, value], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 28 + colW * col + colW / 2;
    const y = 104 + row * 62;
    body += '\n  ' + metric(value, label, { x, y });
  });

  return frame({ id: 'stats', width: W, height, title: `GitHub statistics for ${d.user.login}`, body });
}

function languagesCard(d) {
  const height = 236;
  const half = W / 2;

  const byRepos = [...d.reposPerLanguage.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const byBytes = [...d.bytesPerLanguage.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  let body =
    '  ' +
    text('Repositories per language', { x: 28, y: 36, size: 15, weight: 600, fill: PALETTE.title }) +
    '\n  ' +
    text('Top languages by code size', { x: half + 28, y: 36, size: 15, weight: 600, fill: PALETTE.title }) +
    '\n  ' +
    `<line x1="${half}" y1="24" x2="${half}" y2="${height - 24}" stroke="${PALETTE.border}" stroke-opacity="0.25"/>`;

  // Donut assembled from dash segments, which avoids arc-path maths entirely.
  const totalRepos = byRepos.reduce((a, [, n]) => a + n, 0) || 1;
  const cx = 108;
  const cy = 142;
  const r = 46;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  body += `\n  <g transform="rotate(-90 ${cx} ${cy})">`;
  body += `\n    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#161B22" stroke-width="20"/>`;
  for (const [name, count] of byRepos) {
    const len = (count / totalRepos) * circumference;
    body +=
      `\n    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.colors.get(name) || PALETTE.primary}" ` +
      `stroke-width="20" stroke-dasharray="${num(len)} ${num(circumference - len)}" ` +
      `stroke-dashoffset="${num(-offset)}"/>`;
    offset += len;
  }
  body += '\n  </g>';

  byRepos.forEach(([name, count], i) => {
    const y = 92 + i * 22;
    body +=
      `\n  <rect x="186" y="${y - 8}" width="9" height="9" rx="2" fill="${d.colors.get(name) || PALETTE.primary}"/>` +
      '\n  ' +
      text(name, { x: 203, y, size: 12, weight: 500 }) +
      '\n  ' +
      text(String(count), { x: half - 28, y, size: 12, weight: 600, fill: PALETTE.muted, anchor: 'end' });
  });

  const totalBytes = byBytes.reduce((a, [, n]) => a + n, 0) || 1;
  const barX = half + 28;
  const barW = half - 56;

  byBytes.forEach(([name, size], i) => {
    const y = 74 + i * 26;
    const share = size / totalBytes;
    const pct = (share * 100).toFixed(1) + '%';
    body +=
      '\n  ' +
      text(name, { x: barX, y, size: 12, weight: 500 }) +
      '\n  ' +
      text(pct, { x: barX + barW, y, size: 11, weight: 600, fill: PALETTE.muted, anchor: 'end' }) +
      `\n  <rect x="${num(barX)}" y="${y + 5}" width="${num(barW)}" height="6" rx="3" fill="#161B22"/>` +
      `\n  <rect x="${num(barX)}" y="${y + 5}" width="${num(Math.max(share * barW, 2))}" height="6" rx="3" ` +
      `fill="${d.colors.get(name) || PALETTE.primary}"/>`;
  });

  return frame({ id: 'langs', width: W, height, title: `Language breakdown for ${d.user.login}`, body });
}

function streakCard(d) {
  const { current, longest } = streaks(d.days);

  const cell = 11;
  const gap = 2;
  const gridW = 53 * (cell + gap) - gap;
  const gridH = 7 * (cell + gap) - gap;
  const gridX = (W - gridW) / 2;
  const gridY = 132;
  const legendY = gridY + gridH + 13;
  const height = legendY + 16;

  let body =
    '  ' +
    text('Contribution activity', { x: 28, y: 36, size: 15, weight: 600, fill: PALETTE.title }) +
    '\n  ' +
    `<line x1="28" y1="52" x2="${W - 28}" y2="52" stroke="${PALETTE.border}" stroke-opacity="0.3"/>`;

  const metrics = [
    [group(current) + (current === 1 ? ' day' : ' days'), 'Current streak'],
    [group(longest) + (longest === 1 ? ' day' : ' days'), 'Longest streak'],
    [group(d.totals.contributions), 'Total contributions'],
  ];

  metrics.forEach(([value, label], i) => {
    const x = 28 + ((W - 56) / 3) * (i + 0.5);
    body += '\n  ' + metric(value, label, { x, y: 92, size: 24 });
  });

  // 53-week heatmap of the trailing year, laid out like GitHub's own graph.
  const today = new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  start.setUTCDate(start.getUTCDate() - 7 * 52 - start.getUTCDay());

  const scale = (n) => {
    if (n <= 0) return '#161B22';
    if (n <= 2) return '#0D2E5C';
    if (n <= 5) return '#14508C';
    if (n <= 9) return PALETTE.primary;
    return PALETTE.accent;
  };

  const todayKey = today.toISOString().slice(0, 10);
  body += `\n  <g transform="translate(${num(gridX)},${gridY})">`;
  for (let week = 0; week < 53; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + week * 7 + day);
      const key = date.toISOString().slice(0, 10);
      if (key > todayKey) continue;
      const count = d.days.get(key) || 0;
      body +=
        `\n    <rect x="${week * (cell + gap)}" y="${day * (cell + gap)}" width="${cell}" height="${cell}" ` +
        `rx="2" fill="${scale(count)}"/>`;
    }
  }
  body += '\n  </g>';

  // Scale key, aligned to the right edge of the grid like GitHub's own legend.
  const keyRight = gridX + gridW;
  const swatches = [0, 1, 3, 7, 12];
  const keyLeft = keyRight - (32 + swatches.length * 13 + 30);

  body += '\n  ' + text('Less', { x: keyLeft, y: legendY, size: 10, fill: PALETTE.muted });
  swatches.forEach((n, i) => {
    body +=
      `\n  <rect x="${num(keyLeft + 28 + i * 13)}" y="${num(legendY - 9)}" width="9" height="9" ` +
      `rx="2" fill="${scale(n)}"/>`;
  });
  body +=
    '\n  ' +
    text('More', { x: keyRight, y: legendY, size: 10, fill: PALETTE.muted, anchor: 'end' });

  return frame({ id: 'streak', width: W, height, title: `Contribution activity for ${d.user.login}`, body });
}

async function pypiBadge() {
  const target = path.join(ASSETS, 'badge-iqforge-pypi.svg');
  try {
    const res = await fetch('https://pypi.org/pypi/iqforge/json', {
      headers: { 'User-Agent': `${LOGIN}-profile-stats` },
    });
    if (!res.ok) throw new Error(`PyPI HTTP ${res.status}`);
    const version = (await res.json()).info.version;
    fs.writeFileSync(target, renderSingle(pypiVersionBadge('v' + version)), 'utf8');
    console.log(`badge-iqforge-pypi.svg  v${version}`);
  } catch (err) {
    // Keeping the previous badge is always better than shipping a broken one.
    if (!fs.existsSync(target)) throw err;
    console.warn(`PyPI lookup failed (${err.message}); keeping existing badge`);
  }
}

(async () => {
  const data = await collect();

  const files = {
    'stats.svg': statsCard(data),
    'languages.svg': languagesCard(data),
    'streak.svg': streakCard(data),
  };

  for (const [name, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(ASSETS, name), svg, 'utf8');
    console.log(`${name}  ${svg.length} bytes`);
  }

  await pypiBadge();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
