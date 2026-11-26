// Arunika router + controls. Hash routes, one page per route; the year selector
// re-renders the national pages with that year's figures. window.__shotReady
// is false while a page renders and true once it is on screen, so a
// screenshot script knows when to capture.
import { YEARS, SERIES, PROVINCES, fmtId, density } from './data.js';
import { home, penduduk, ekonomi, sosial, daerah, metodologi, notFound } from './views.js';
import { lineChart, hbarChart, PALETTE } from './charts.js';

const app = document.getElementById('app');
const yearSelect = document.getElementById('year');
let year = Number(yearSelect.value) || 2024;
let chartKey = 'gdpGrowth';

const CHART_NOTES = {
  gdpGrowth: 'Pertumbuhan PDB riil tahunan. Setelah 3,69% pada 2021, ekonomi tumbuh di atas 5% tiga tahun berturut-turut.',
  inflation: 'Inflasi Desember year-on-year. Memuncak 5,51% pada 2022, lalu turun tiga tahun berturut-turut ke 1,57%.',
  unemployment: 'Tingkat pengangguran terbuka, survei Agustus. Turun setiap tahun sejak 2021, ke 4,91% pada 2024.',
  poverty: 'Tingkat kemiskinan, survei Maret. Turun setiap tahun sejak 2021, ke 9,03% pada 2024.',
};
const CHART_COLORS = { gdpGrowth: PALETTE.GREEN, inflation: PALETTE.TERRA, unemployment: PALETTE.TERRA, poverty: PALETTE.GREEN };

function setActiveNav(route) {
  document.querySelectorAll('nav.main a').forEach((a) => {
    a.classList.toggle('active', (a.dataset.route || '') === route);
  });
}

// ---- Daerah page state ----
const daerahState = { query: '', sort: 'pop-desc', region: 'Semua', selected: null };

function filteredProvinces() {
  const q = daerahState.query.trim().toLowerCase();
  let list = PROVINCES.filter((p) => (daerahState.region === 'Semua' || p.region === daerahState.region));
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  const by = {
    'pop-desc': (a, b) => b.pop - a.pop,
    'pop-asc': (a, b) => a.pop - b.pop,
    'name-asc': (a, b) => a.name.localeCompare(b.name, 'id'),
    'density-desc': (a, b) => density(b) - density(a),
    'density-asc': (a, b) => density(a) - density(b),
  }[daerahState.sort] || ((a, b) => b.pop - a.pop);
  return [...list].sort(by);
}

function renderDaerahLists() {
  const rows = document.getElementById('prov-rows');
  const count = document.getElementById('prov-count');
  const bars = document.getElementById('prov-bars');
  const detail = document.getElementById('prov-detail');
  if (!rows) return;
  const list = filteredProvinces();
  const totalPop = PROVINCES.reduce((s, p) => s + p.pop, 0);
  count.textContent = `— ${list.length} dari 38 provinsi`;
  rows.innerHTML = list.length ? list.map((p) => `
    <tr data-prov="${p.name}">
      <td><b>${p.name}</b></td>
      <td class="num">${fmtId(p.pop)}</td>
      <td class="num hide-phone">${fmtId(density(p), 0)} /km²</td>
      <td class="hide-phone">${p.capital}</td>
      <td>${p.region}</td>
    </tr>`).join('') : `<tr><td colspan="5" class="empty">Tidak ada provinsi yang cocok dengan “${daerahState.query}”. Hapus kata kunci atau ubah saringan pulau.</td></tr>`;
  rows.querySelectorAll('tr[data-prov]').forEach((tr) => {
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', () => { daerahState.selected = tr.dataset.prov; renderDaerahLists(); });
  });
  const top = [...list].sort((a, b) => b.pop - a.pop).slice(0, 8);
  bars.innerHTML = top.length ? hbarChart({ rows: top.map((p) => ({ label: p.name, value: p.pop / 1e6 })), color: PALETTE.GREEN, unit: ' jt', decimals: 1 }) : '';
  if (daerahState.selected) {
    const p = PROVINCES.find((x) => x.name === daerahState.selected);
    if (p) {
      detail.innerHTML = `<div class="prov-detail"><h3>${p.name} — ibu kota ${p.capital}</h3>
      <p><b>Penduduk:</b> ${fmtId(p.pop)} jiwa (${fmtId((p.pop / totalPop) * 100, 1)}% dari Indonesia) ·
      <b>Luas:</b> ${fmtId(p.area)} km² · <b>Kepadatan:</b> ${fmtId(density(p), 0)} jiwa/km² ·
      <b>Pulau:</b> ${p.region}. Sumber: BPS, pertengahan 2024.</p></div>`;
    } else { detail.innerHTML = ''; }
  } else { detail.innerHTML = ''; }
}

function wireDaerah() {
  const search = document.getElementById('prov-search');
  const sort = document.getElementById('prov-sort');
  const chips = document.getElementById('region-chips');
  if (!search) return;
  search.addEventListener('input', () => { daerahState.query = search.value; renderDaerahLists(); });
  sort.addEventListener('change', () => { daerahState.sort = sort.value; renderDaerahLists(); });
  chips.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-region]');
    if (!btn) return;
    daerahState.region = btn.dataset.region;
    chips.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === btn)));
    renderDaerahLists();
  });
  document.querySelectorAll('[data-sort]').forEach((b) => {
    b.addEventListener('click', () => { daerahState.sort = b.dataset.sort; sort.value = b.dataset.sort; renderDaerahLists(); });
  });
  renderDaerahLists();
}

function wireHomeChart() {
  const box = document.getElementById('home-chart');
  if (!box) return;
  document.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      chartKey = btn.dataset.chart;
      document.querySelectorAll('[data-chart]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const s = SERIES[chartKey];
      box.innerHTML = lineChart({ labels: YEARS.map(String), values: s.values, color: CHART_COLORS[chartKey], unit: s.unit, decimals: s.decimals });
      document.getElementById('home-chart-note').textContent = CHART_NOTES[chartKey];
    });
  });
}

const TITLES = {
  '': 'Arunika · Statistik Indonesia',
  penduduk: 'Penduduk | Arunika',
  ekonomi: 'Ekonomi | Arunika',
  sosial: 'Sosial | Arunika',
  daerah: 'Daerah · 38 Provinsi | Arunika',
  metodologi: 'Metodologi | Arunika',
};

function render() {
  window.__shotReady = false;
  const route = (location.hash.replace(/^#\/?/, '').split('?')[0] || '');
  const pages = { '': () => home(year), penduduk: () => penduduk(year), ekonomi: () => ekonomi(year), sosial: () => sosial(year), daerah, metodologi };
  const fn = pages[route];
  document.title = TITLES[route] ?? 'Arunika · Statistik Indonesia';
  app.innerHTML = fn ? fn() : notFound();
  setActiveNav(route);
  if (route === '') wireHomeChart();
  if (route === 'daerah') wireDaerah();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

yearSelect.addEventListener('change', () => {
  year = Number(yearSelect.value) || 2024;
  render();
});

window.addEventListener('hashchange', render);
render();
