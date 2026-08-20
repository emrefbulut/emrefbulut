'use strict';

// Single source of truth for every badge rendered into assets/.
// Colours and text mirror the shields.io URLs the README used previously.

const W = '#FFFFFF';
const B = '#000000';

// Logo-only badges. These stay as individual files because each one is wrapped
// in an <a>, and a merged strip would lose per-badge click targets.
const contact = {
  'badge-portfolio.svg': { color: '1F6FEB', logo: 'googlechrome', logoColor: W, title: 'Portfolio' },
  'badge-linkedin.svg': { color: '0A66C2', logo: 'linkedin', logoColor: W, title: 'LinkedIn' },
  'badge-gmail.svg': { color: 'EA4335', logo: 'gmail', logoColor: W, title: 'Email' },
  'badge-github.svg': { color: '181717', logo: 'github', logoColor: W, title: 'GitHub' },
  'badge-pypi.svg': { color: '3775A9', logo: 'pypi', logoColor: W, title: 'PyPI' },
};

// Tech-stack rows: not links, so each row collapses into one SVG.
const stack = {
  'stack-ai.svg': {
    title: 'AI & Deep Learning',
    badges: [
      { message: 'PyTorch', color: 'EE4C2C', logo: 'pytorch', logoColor: W },
      { message: 'Hugging Face', color: 'FFD21E', logo: 'huggingface', logoColor: B },
      { message: 'YOLO', color: '00B0FF' },
      { message: 'OpenCV', color: '5C3EE8', logo: 'opencv', logoColor: W },
    ],
  },
  'stack-rf.svg': {
    title: 'RF & Signal Processing',
    badges: [
      { message: 'SDR / IQ', color: '4C1D95' },
      { message: 'SigMF', color: '6D28D9' },
      { message: 'NumPy', color: '013243', logo: 'numpy', logoColor: W },
      { message: 'SciPy', color: '8CAAE6', logo: 'scipy', logoColor: W },
    ],
  },
  'stack-languages.svg': {
    title: 'Languages',
    badges: [
      { message: 'Python', color: '3776AB', logo: 'python', logoColor: W },
      { message: 'C', color: 'A8B9CC', logo: 'c', logoColor: B },
      { message: 'Java', color: 'ED8B00', logo: 'openjdk', logoColor: W },
    ],
  },
  'stack-hardware.svg': {
    title: 'Hardware & IoT',
    badges: [
      { message: 'ESP32', color: 'E7352C', logo: 'espressif', logoColor: W },
      { message: 'MQTT', color: '660066', logo: 'mqtt', logoColor: W },
      { message: 'Arduino', color: '00979D', logo: 'arduino', logoColor: W },
      { message: 'Raspberry Pi', color: 'A22846', logo: 'raspberrypi', logoColor: W },
    ],
  },
  'stack-systems.svg': {
    title: 'Systems',
    badges: [
      { message: 'VMware vSphere', color: '607078', logo: 'vmware', logoColor: W },
      { message: 'Red Hat Enterprise Linux', color: 'EE0000', logo: 'redhat', logoColor: W },
      { message: 'Linux', color: 'FCC624', logo: 'linux', logoColor: B },
    ],
  },
  'stack-data.svg': {
    title: 'Data & Tooling',
    badges: [
      { message: 'SQLite', color: '003B57', logo: 'sqlite', logoColor: W },
      { message: 'Git', color: 'F05032', logo: 'git', logoColor: W },
      { message: 'GitHub', color: '181717', logo: 'github', logoColor: W },
    ],
  },
};

const MIT = { label: 'License', message: 'MIT', color: '6E7681', style: 'flat-square' };
const PY = { message: 'Python', color: '3776AB', logo: 'python', logoColor: W, style: 'flat-square' };

// Featured-project rows, all flat-square. Only the PyPI version badge is a
// link, so it is generated separately (and refreshed by the stats workflow).
const project = {
  'proj-iqforge-mit.svg': { single: MIT },
  'proj-iqforge-tech.svg': {
    title: 'Python, PyTorch, SDR / SigMF',
    badges: [PY, { message: 'PyTorch', color: 'EE4C2C', logo: 'pytorch', logoColor: W }, { message: 'SDR / SigMF', color: '4C1D95' }],
  },
  'proj-roomgate-top.svg': {
    title: 'Computer Vision, Edge',
    badges: [{ message: 'Computer Vision', color: '0F766E' }, { message: 'Edge', color: '1F6FEB' }],
  },
  'proj-roomgate-tech.svg': {
    title: 'Python, YOLO26, OpenCV',
    badges: [PY, { message: 'YOLO26', color: '00B0FF' }, { message: 'OpenCV', color: '5C3EE8', logo: 'opencv', logoColor: W }],
  },
  'proj-iot-top.svg': {
    title: 'IoT Telemetry, MIT licence',
    badges: [{ message: 'IoT Telemetry', color: 'B45309' }, MIT],
  },
  'proj-iot-tech.svg': {
    title: 'Python, ESP32, MQTT, SQLite',
    badges: [
      PY,
      { message: 'ESP32', color: 'E7352C', logo: 'espressif', logoColor: W },
      { message: 'MQTT', color: '660066', logo: 'mqtt', logoColor: W },
      { message: 'SQLite', color: '003B57', logo: 'sqlite', logoColor: W },
    ],
  },
  'proj-voltpilot-top.svg': {
    title: 'Power Systems, MIT licence',
    badges: [{ message: 'Power Systems', color: '1E40AF' }, MIT],
  },
  'proj-voltpilot-tech.svg': {
    title: 'Grid Simulation, EV Charging, Telemetry',
    badges: [
      { message: 'Grid Simulation', color: '0F766E' },
      { message: 'EV Charging', color: '047857' },
      { message: 'Telemetry', color: '6D28D9' },
    ],
  },
};

function pypiVersionBadge(version) {
  return {
    label: 'PyPI',
    message: version,
    color: '3775A9',
    style: 'flat-square',
    logo: 'pypi',
    logoColor: W,
    title: `PyPI ${version}`,
  };
}

module.exports = { contact, stack, project, pypiVersionBadge };
