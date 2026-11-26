// Hand-rolled SVG charts. No libraries, no network. Every chart gets a title,
// labelled axes and values on the points/bars so it reads in a screenshot.

const GREEN = '#14532d';
const TERRA = '#c2410c';
const AMBER = '#d97706';
const TEAL = '#0f766e';
const GRID = '#e4dccb';
const MUTED = '#7a766a';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fmt(v, digits = 1) {
  return Number(v).toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

// Line chart with dots + value labels. labels: year strings, values: numbers.
export function lineChart({ labels, values, color = GREEN, unit = '', height = 230, ymin = null, ymax = null, decimals = 1 }) {
  const W = 640, H = height, L = 46, R = 14, T = 26, B = 34;
  const lo = ymin !== null ? ymin : Math.min(...values) * 0.92;
  const hi = ymax !== null ? ymax : Math.max(...values) * 1.05;
  const span = hi - lo || 1;
  const x = (i) => L + (i * (W - L - R)) / Math.max(labels.length - 1, 1);
  const y = (v) => T + (1 - (v - lo) / span) * (H - T - B);
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  // Gridlines carry no numbers: every point already carries its own value
  // label, so axis numbers would only collide with them.
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gy = T + f * (H - T - B);
    return `<line x1="${L}" y1="${gy}" x2="${W - R}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
  }).join('');
  const dots = values.map((v, i) => {
    // First/last labels anchor inward so they never overlap the y-axis labels.
    const anchor = i === 0 ? 'start' : (i === values.length - 1 ? 'end' : 'middle');
    const lx = i === 0 ? x(i) + 9 : (i === values.length - 1 ? x(i) - 9 : x(i));
    return `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="${color}"/>` +
      `<text x="${lx}" y="${y(v) - 10}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="#1d2019">${fmt(v, decimals)}${unit}</text>`;
  }).join('');
  const xlabels = labels.map((t, i) =>
    `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(t)}</text>`
  ).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Grafik garis">${grid}` +
    `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>` +
    `${dots}${xlabels}</svg>`;
}

// Vertical bars with value labels on top.
export function barChart({ labels, values, color = GREEN, unit = '', height = 230, decimals = 1, colors = null }) {
  const W = 640, H = height, L = 40, R = 10, T = 28, B = 34;
  const max = Math.max(...values) * 1.12 || 1;
  const slot = (W - L - R) / values.length;
  const bw = Math.min(64, slot * 0.62);
  const bars = values.map((v, i) => {
    const h = (v / max) * (H - T - B);
    const bx = L + i * slot + (slot - bw) / 2;
    const by = H - B - h;
    const c = colors ? colors[i % colors.length] : color;
    return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="4" fill="${c}"/>` +
      `<text x="${(bx + bw / 2).toFixed(1)}" y="${(by - 7).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1d2019">${fmt(v, decimals)}${unit}</text>` +
      `<text x="${(bx + bw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(labels[i])}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Grafik batang">${bars}</svg>`;
}

// Horizontal bars for ranked lists (province view). rows: [{label, value}].
export function hbarChart({ rows, color = GREEN, unit = '', decimals = 1, maxLabel = 18 }) {
  const W = 640, rowH = 30, T = 6, B = 8;
  const H = T + rows.length * rowH + B;
  const max = Math.max(...rows.map((r) => r.value)) || 1;
  const labelW = 132;
  const lines = rows.map((r, i) => {
    const y = T + i * rowH + 8;
    const w = Math.max(3, ((r.value / max) * (W - labelW - 74)).toFixed(1));
    const label = r.label.length > maxLabel ? r.label.slice(0, maxLabel - 1) + '…' : r.label;
    return `<text x="0" y="${y + 11}" font-size="12.5" fill="#1d2019">${esc(label)}</text>` +
      `<rect x="${labelW}" y="${y}" width="${w}" height="13" rx="3" fill="${color}"/>` +
      `<text x="${labelW + Number(w) + 7}" y="${y + 11}" font-size="12" font-weight="700" fill="#1d2019">${fmt(r.value, decimals)}${unit}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Grafik batang horizontal">${lines}</svg>`;
}

export const PALETTE = { GREEN, TERRA, AMBER, TEAL };
