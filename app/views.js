// Page renderers. Each returns HTML for #app. Every figure carries its source
// and year next to it; nothing renders without a source line.
import { YEARS, SERIES, FACTS_2024, FINDINGS, PROVINCES, REGIONS, SOURCES, fmtId, density } from './data.js';
import { lineChart, barChart, hbarChart, PALETTE } from './charts.js';

const wrap = (inner) => `<div class="wrap">${inner}</div>`;
const src = (text) => `<p class="src">Sumber: ${text}</p>`;

export function yearIndex(year) {
  return YEARS.indexOf(year);
}

function kpiCard(label, value, unit, sub, cls = '') {
  return `<div class="kpi ${cls}"><div class="kpi-label">${label}</div>` +
    `<div class="kpi-num">${value} <span class="kpi-unit">${unit}</span></div>` +
    `<div class="kpi-sub">${sub}</div></div>`;
}

export function home(year) {
  const i = yearIndex(year);
  const pop = SERIES.population.values[i];
  const gdp = SERIES.gdpGrowth.values[i];
  const inf = SERIES.inflation.values[i];
  const unemp = SERIES.unemployment.values[i];
  const pov = SERIES.poverty.values[i];
  const gdpUsd = SERIES.gdpUsd.values[i];
  const prev = i > 0 ? SERIES.gdpGrowth.values[i - 1] : null;
  const dGdp = prev === null ? '' : `<span class="kpi-delta ${gdp >= prev ? 'up' : 'down'}">${gdp >= prev ? '▲' : '▼'} ${Math.abs(gdp - prev).toFixed(2)} poin dari ${YEARS[i - 1]}</span>`;
  return `
  <section class="hero"><div class="wrap">
    <div class="eyebrow">Indonesia · ${year} · Data resmi</div>
    <h1>Indonesia dalam angka, dibaca dalam semenit.</h1>
    <p class="lede">Arunika merangkum penduduk, ekonomi, dan kesejahteraan Indonesia dari publikasi resmi — lengkap dengan sumber dan tahun di setiap angka.</p>
    <p class="meta-line">38 provinsi · 17.000+ pulau · Data resmi BPS, Bank Indonesia, dan Bank Dunia · Diperbarui November 2026</p>
  </div></section>
  ${wrap(`
    <div class="kpis" id="kpis">
      ${kpiCard('Penduduk', fmtId(pop, 1), 'jt jiwa', 'BPS, estimasi pertengahan tahun ' + year)}
      ${kpiCard('Pertumbuhan PDB', fmtId(gdp, 2), '%', dGdp || 'BPS ' + year, 'warm')}
      ${kpiCard('Inflasi (Des, yoy)', fmtId(inf, 2), '%', 'BPS, IHK ' + year, 'gold')}
      ${kpiCard('Pengangguran', fmtId(unemp, 2), '%', 'BPS, Sakernas Agustus ' + year)}
      ${kpiCard('Kemiskinan', fmtId(pov, 2), '%', 'BPS, Susenas Maret ' + year, 'warm')}
      ${kpiCard('PDB nominal', 'US$ ' + fmtId(gdpUsd, 0), 'miliar', year === 2024 ? 'Rp 22.139 triliun (BPS 2024)' : 'Bank Dunia ' + year, 'gold')}
    </div>
    <div class="grid2">
      <div class="card">
        <h2>Pertumbuhan ekonomi, 2021–2024</h2>
        <div class="tabs" role="group" aria-label="Pilih indikator">
          <button data-chart="gdpGrowth" aria-pressed="true">Pertumbuhan PDB</button>
          <button data-chart="inflation" aria-pressed="false">Inflasi</button>
          <button data-chart="unemployment" aria-pressed="false">Pengangguran</button>
          <button data-chart="poverty" aria-pressed="false">Kemiskinan</button>
        </div>
        <div id="home-chart">${lineChart({ labels: YEARS.map(String), values: SERIES.gdpGrowth.values, color: PALETTE.GREEN, unit: '%', decimals: 2 })}</div>
        <p class="chart-note" id="home-chart-note">Pertumbuhan PDB riil tahunan. Setelah 3,69% pada 2021, ekonomi tumbuh di atas 5% tiga tahun berturut-turut.</p>
        ${src('BPS, pertumbuhan PDB riil 2021–2024.')}
      </div>
      <div class="card">
        <h2>Penduduk terus bertambah</h2>
        <p class="big-stat">${fmtId(pop, 1)} <span>juta jiwa · ${year}</span></p>
        <p>Indonesia adalah negara berpenduduk terbesar keempat di dunia. Pulau Jawa dihuni 156,9 juta jiwa — 56% dari seluruh penduduk — di atas 7% luas daratan.</p>
        ${barChart({ labels: YEARS.map(String), values: SERIES.population.values, color: PALETTE.TERRA, unit: ' jt', decimals: 1 })}
        ${src('BPS, estimasi penduduk pertengahan tahun 2021–2024; sebaran pulau: BPS 2024.')}
      </div>
    </div>
    <h2>Temuan terbaru</h2>
    <div class="strip">
      ${FINDINGS.map((f) => `<article class="finding"><b>${f.title}</b><p>${f.text}</p><p class="src">Sumber: ${f.source}</p></article>`).join('')}
    </div>
    <div class="card">
      <h2>Jelajahi datanya</h2>
      <p><a href="#/penduduk">Penduduk</a> — struktur umur dan sebaran pulau · <a href="#/ekonomi">Ekonomi</a> — PDB, inflasi, perdagangan · <a href="#/sosial">Sosial</a> — kemiskinan, pengangguran, pendidikan, kesehatan · <a href="#/daerah">Daerah</a> — semua 38 provinsi, bisa dicari dan diurutkan · <a href="#/metodologi">Metodologi</a> — dari mana setiap angka berasal.</p>
    </div>
  `)}`;
}

export function penduduk(year) {
  const i = yearIndex(year);
  const pop = SERIES.population.values[i];
  return wrap(`
    <div class="page-head"><div class="eyebrow">Penduduk · ${year}</div>
    <h1>${fmtId(pop, 1)} juta jiwa, tersebar di 17.000 pulau.</h1>
    <p>Indonesia berpenduduk ${fmtId(pop, 1)} juta jiwa pada pertengahan ${year} (BPS). Lebih dari separuh tinggal di Jawa, pulau terpadat di dunia.</p></div>
    <div class="grid2wide">
      <div class="card">
        <h2>Pertumbuhan penduduk, 2021–2024</h2>
        ${barChart({ labels: YEARS.map(String), values: SERIES.population.values, color: PALETTE.GREEN, unit: ' jt', decimals: 1 })}
        ${src('BPS, estimasi penduduk pertengahan tahun.')}
      </div>
      <div class="card">
        <h2>Sekilas ${year}</h2>
        <p><span class="big-stat">${fmtId(pop, 1)}</span> <span class="kpi-unit">juta jiwa</span></p>
        <ul class="tight">
          <li><b>Kepadatan:</b> ${FACTS_2024.density} (${FACTS_2024.densitySource})</li>
          <li><b>Usia median:</b> ${FACTS_2024.medianAge} (${FACTS_2024.medianAgeSource})</li>
          <li><b>Usia 0–14 tahun:</b> ${FACTS_2024.age014} · <b>65+:</b> ${FACTS_2024.age65} (${FACTS_2024.ageSource})</li>
          <li><b>Harapan hidup:</b> ${FACTS_2024.lifeExpectancy} (${FACTS_2024.lifeExpectancySource})</li>
        </ul>
        ${src('BPS 2024; UN WPP 2024.')}
      </div>
    </div>
    <div class="card">
      <h2>Di mana penduduk tinggal?</h2>
      <p>Jawa menampung 156,9 juta jiwa (56% penduduk) dan Sumatera 61,5 juta jiwa. Papua — pulau terbesar — dihuni kurang dari 5 juta jiwa di enam provinsi.</p>
      ${hbarChart({ rows: [
        { label: 'Jawa', value: 156.9 },
        { label: 'Sumatera', value: 61.5 },
        { label: 'Kalimantan', value: 17.6 },
        { label: 'Sulawesi', value: 20.0 },
        { label: 'Nusa Tenggara', value: 15.7 },
        { label: 'Maluku', value: 3.3 },
        { label: 'Papua', value: 6.7 },
      ], color: PALETTE.TEAL, unit: ' jt', decimals: 1 })}
      ${src('BPS 2024, penduduk pertengahan tahun per gugus pulau (Wikipedia, tabel provinsi, bersumber BPS). Angka Sulawesi, Maluku, dan Papua dihitung dari tabel provinsi.')}
    </div>
  `);
}

export function ekonomi(year) {
  const i = yearIndex(year);
  const gdp = SERIES.gdpGrowth.values[i];
  return wrap(`
    <div class="page-head"><div class="eyebrow">Ekonomi · ${year}</div>
    <h1>Pertumbuhan, harga, dan perdagangan Indonesia.</h1>
    <p>Pada ${year}, ekonomi tumbuh ${fmtId(gdp, 2)}% dan inflasi Desember ${fmtId(SERIES.inflation.values[i], 2)}%. PDB nominal 2024 mencapai Rp 22.139 triliun (BPS).</p></div>
    <div class="grid2">
      <div class="card">
        <h2>Pertumbuhan PDB riil, 2021–2024</h2>
        ${lineChart({ labels: YEARS.map(String), values: SERIES.gdpGrowth.values, color: PALETTE.GREEN, unit: '%', decimals: 2 })}
        <p class="chart-note">Pada ${year}, ekonomi tumbuh ${fmtId(gdp, 2)}%.</p>
        ${src('BPS, pertumbuhan PDB riil.')}
      </div>
      <div class="card">
        <h2>Inflasi Desember (yoy), 2021–2024</h2>
        ${lineChart({ labels: YEARS.map(String), values: SERIES.inflation.values, color: PALETTE.TERRA, unit: '%', decimals: 2 })}
        <p class="chart-note">Inflasi memuncak 5,51% pada Desember 2022, lalu turun tiga tahun berturut-turut.</p>
        ${src('BPS, IHK Desember year-on-year.')}
      </div>
    </div>
    <div class="card">
      <h2>Indikator ekonomi 2021–2024</h2>
      <table class="data">
        <thead><tr><th>Indikator</th><th class="num">2021</th><th class="num">2022</th><th class="num">2023</th><th class="num">2024</th><th>Sumber</th></tr></thead>
        <tbody>
          <tr><td>Pertumbuhan PDB riil</td><td class="num">3,69%</td><td class="num">5,31%</td><td class="num">5,05%</td><td class="num">5,03%</td><td>BPS</td></tr>
          <tr><td>Inflasi Desember (yoy)</td><td class="num">1,87%</td><td class="num">5,51%</td><td class="num">2,61%</td><td class="num">1,57%</td><td>BPS</td></tr>
          <tr><td>PDB nominal (US$ miliar)</td><td class="num">1.187</td><td class="num">1.319</td><td class="num">1.371</td><td class="num">1.396</td><td>Bank Dunia</td></tr>
          <tr><td>Pengangguran (Agustus)</td><td class="num">6,49%</td><td class="num">5,86%</td><td class="num">5,32%</td><td class="num">4,91%</td><td>BPS</td></tr>
          <tr><td>Kemiskinan (Maret)</td><td class="num">10,14%</td><td class="num">9,54%</td><td class="num">9,36%</td><td class="num">9,03%</td><td>BPS</td></tr>
        </tbody>
      </table>
      ${src('BPS dan Bank Dunia, seperti tercantum per baris.')}
    </div>
    <div class="grid2" style="margin-top:16px">
      <div class="card">
        <h2>Perdagangan dan cadangan</h2>
        <ul class="tight">
          <li><b>Ekspor barang 2024:</b> ${FACTS_2024.exports} (${FACTS_2024.exportsSource})</li>
          <li><b>Cadangan devisa:</b> ${FACTS_2024.reserves} (${FACTS_2024.reservesSource})</li>
          <li><b>PDB per kapita 2024:</b> ${FACTS_2024.gdpPerCapita} (${FACTS_2024.gdpPerCapitaSource})</li>
        </ul>
      </div>
      <div class="card">
        <h2>Cara membaca halaman ini</h2>
        <p>Pertumbuhan PDB adalah perubahan volume (riil), bukan nilai rupiah. Inflasi di sini memakai IHK Desember year-on-year dari BPS — angka rata-rata tahunan Bank Dunia berbeda (2024: 2,3%).</p>
      </div>
    </div>
  `);
}

export function sosial(year) {
  const i = yearIndex(year);
  const unemp = SERIES.unemployment.values[i];
  const pov = SERIES.poverty.values[i];
  return wrap(`
    <div class="page-head"><div class="eyebrow">Sosial · ${year}</div>
    <h1>Kesejahteraan membaik, tapi belum merata.</h1>
    <p>Pada ${year}, pengangguran ${fmtId(unemp, 2)}% dan kemiskinan ${fmtId(pov, 2)}% — keduanya terendah dalam empat tahun. Harapan hidup mencapai 74,15 tahun.</p></div>
    <div class="grid2">
      <div class="card">
        <h2>Pengangguran terbuka (Agustus), 2021–2024</h2>
        ${lineChart({ labels: YEARS.map(String), values: SERIES.unemployment.values, color: PALETTE.TERRA, unit: '%', decimals: 2 })}
        <p class="chart-note">Februari 2025: ${FACTS_2024.unemploymentFeb25} (${FACTS_2024.unemploymentFeb25Source}).</p>
        ${src('BPS, Sakernas Agustus.')}
      </div>
      <div class="card">
        <h2>Kemiskinan (Maret), 2021–2024</h2>
        ${lineChart({ labels: YEARS.map(String), values: SERIES.poverty.values, color: PALETTE.GREEN, unit: '%', decimals: 2 })}
        <p class="chart-note">Maret 2025 turun lagi ke 8,47% — ${FACTS_2024.povertyPeople} (${FACTS_2024.povertyPeopleSource}).</p>
        ${src('BPS, Susenas Maret.')}
      </div>
    </div>
    <div class="grid2">
      <div class="card">
        <h2>Pendidikan dan kesehatan</h2>
        <ul class="tight">
          <li><b>Harapan hidup:</b> ${FACTS_2024.lifeExpectancy} (${FACTS_2024.lifeExpectancySource})</li>
          <li><b>Indeks Pembangunan Manusia:</b> ${FACTS_2024.hdi} (${FACTS_2024.hdiSource})</li>
          <li><b>Melek huruf (15+):</b> ${FACTS_2024.literacy} (${FACTS_2024.literacySource})</li>
          <li><b>Rata-rata lama sekolah (25+):</b> ${FACTS_2024.schooling} (${FACTS_2024.schoolingSource})</li>
          <li><b>Harapan lama sekolah:</b> 13,21 tahun (BPS 2024)</li>
        </ul>
      </div>
      <div class="card">
        <h2>Apa artinya?</h2>
        <p>IPM 75,02 menempatkan Indonesia pada kategori pembangunan manusia “tinggi”. Kemiskinan turun setiap tahun sejak 2021, tapi 1 dari 11 penduduk masih hidup di bawah garis kemiskinan pada Maret 2024.</p>
        ${src('BPS 2024, IPM dan indikator kesejahteraan.')}
      </div>
    </div>
  `);
}

export function daerah() {
  return wrap(`
    <div class="page-head"><div class="eyebrow">Daerah · 38 provinsi</div>
    <h1>Dari Jawa Barat sampai Papua Selatan.</h1>
    <p>Semua 38 provinsi Indonesia, penduduk pertengahan 2024. Cari nama provinsi, saring per pulau, atau urutkan kolomnya. Klik sebuah provinsi untuk melihat rinciannya.</p></div>
    <div class="controls">
      <input type="search" id="prov-search" placeholder="Cari provinsi… (mis. Jawa, Papua, Bali)" aria-label="Cari provinsi">
      <select id="prov-sort" aria-label="Urutkan provinsi">
        <option value="pop-desc">Penduduk: terbanyak dulu</option>
        <option value="pop-asc">Penduduk: tersedikit dulu</option>
        <option value="name-asc">Nama: A–Z</option>
        <option value="density-desc">Kepadatan: tertinggi dulu</option>
        <option value="density-asc">Kepadatan: terendah dulu</option>
      </select>
    </div>
    <div class="chip-row" id="region-chips" role="group" aria-label="Saring per pulau">
      ${REGIONS.map((r) => `<button class="chip" data-region="${r}" aria-pressed="${r === 'Semua'}">${r}</button>`).join('')}
    </div>
    <div id="prov-detail"></div>
    <div class="card" style="margin-top:14px">
      <h2>Provinsi terbesar</h2>
      <div id="prov-bars"></div>
      ${src('BPS, estimasi penduduk pertengahan 2024.')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2>Semua provinsi <span id="prov-count" style="font-size:15px;color:var(--muted)"></span></h2>
      <table class="data">
        <thead><tr>
          <th><button class="sortbtn" data-sort="name-asc">Provinsi ↕</button></th>
          <th><button class="sortbtn" data-sort="pop-desc">Penduduk ↕</button></th>
          <th class="num hide-phone"><button class="sortbtn" data-sort="density-desc">Kepadatan ↕</button></th>
          <th class="hide-phone">Ibu kota</th>
          <th>Pulau</th>
        </tr></thead>
        <tbody id="prov-rows"></tbody>
      </table>
      ${src('BPS, estimasi penduduk pertengahan 2024; luas wilayah per provinsi (Wikipedia, bersumber BPS). Kepadatan dihitung dari kedua kolom itu.')}
    </div>
  `);
}

export function metodologi() {
  return wrap(`
    <div class="page-head"><div class="eyebrow">Metodologi</div>
    <h1>Dari mana setiap angka berasal.</h1>
    <p>Arunika merangkum publikasi resmi. Setiap grafik dan tabel di situs ini mencantumkan sumber dan tahunnya; halaman ini mengumpulkan semuanya di satu tempat.</p></div>
    <div class="card">
      <h2>Sumber data</h2>
      <ul class="tight">
        ${SOURCES.map((s) => `<li><b>${s.name}.</b> ${s.note}</li>`).join('')}
      </ul>
    </div>
    <div class="card" style="margin-top:16px">
      <h2>Definisi yang dipakai</h2>
      <ul class="tight">
        <li><b>Inflasi</b> memakai IHK Desember year-on-year BPS. Angka rata-rata tahunan (mis. Bank Dunia, 2024: 2,3%) berbeda karena mengukur rata-rata 12 bulan, bukan Desember ke Desember.</li>
        <li><b>Pengangguran</b> adalah tingkat pengangguran terbuka (TPT) dari Sakernas Agustus; Februari 2025 memakai Sakernas Februari.</li>
        <li><b>Kemiskinan</b> memakai Susenas Maret; garis kemiskinan dihitung dari kebutuhan minimum makanan dan non-makanan.</li>
        <li><b>Penduduk</b> memakai estimasi pertengahan tahun BPS. Estimasi PBB/World Bank sedikit lebih tinggi (283,5 juta pada 2024) karena memakai asumsi yang berbeda.</li>
        <li><b>Kepadatan provinsi</b> dihitung dari penduduk pertengahan 2024 dibagi luas wilayah daratan provinsi.</li>
      </ul>
    </div>
    <div class="card" style="margin-top:16px">
      <h2>Tentang Arunika</h2>
      <p>Arunika adalah situs statistik independen yang dibuat untuk memudahkan pembacaan angka Indonesia. Situs ini bukan situs resmi pemerintah dan tidak berafiliasi dengan Badan Pusat Statistik. Angka ditampilkan apa adanya dari sumbernya; pembaruan terakhir November 2026. Seluruh situs berjalan tanpa koneksi internet: semua data tersimpan di dalam berkas situs ini.</p>
    </div>
  `);
}

export function notFound() {
  return wrap(`<div class="notfound"><h1>Halaman tidak ditemukan.</h1>
  <p>Halaman yang Anda cari tidak ada. Kembali ke <a href="#/">Beranda</a> atau jelajahi <a href="#/daerah">semua provinsi</a>.</p></div>`);
}
