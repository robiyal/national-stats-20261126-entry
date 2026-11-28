// Arunika — figures. Every number below was checked against a published source
// (BPS first, then Bank Indonesia / World Bank / UN WPP) in Nov 2026.
// Inflation is December year-on-year (BPS); unemployment is the August survey
// (BPS); poverty is the March survey (BPS). Population is the BPS mid-year
// estimate; UN/WPP estimates run slightly higher (283.5m in 2024).

export const YEARS = [2021, 2022, 2023, 2024];

// Series are aligned with YEARS. Values are numbers; units in the labels.
export const SERIES = {
  population: { label: 'Penduduk', unit: ' jt jiwa', decimals: 1, source: 'BPS, estimasi pertengahan tahun', values: [273.8, 275.8, 278.7, 281.6] },
  gdpGrowth: { label: 'Pertumbuhan PDB riil', unit: '%', decimals: 2, source: 'BPS', values: [3.69, 5.31, 5.05, 5.03] },
  inflation: { label: 'Inflasi (Desember, yoy)', unit: '%', decimals: 2, source: 'BPS, IHK Desember yoy', values: [1.87, 5.51, 2.61, 1.57] },
  unemployment: { label: 'Pengangguran terbuka (Agustus)', unit: '%', decimals: 2, source: 'BPS, Sakernas Agustus', values: [6.49, 5.86, 5.32, 4.91] },
  poverty: { label: 'Kemiskinan (Maret)', unit: '%', decimals: 2, source: 'BPS, Susenas Maret', values: [10.14, 9.54, 9.36, 9.03] },
  gdpUsd: { label: 'PDB nominal', unit: ' mld US$', decimals: 0, source: 'Bank Dunia', values: [1187, 1319, 1371, 1396] },
  // IPM nasional 2021–2024 (BPS, seri terbaru publikasi IPM; siaran pers
  // 15 Nov 2024 dan 5 Nov 2025). Angka 2021–2022 sesuai seri yang dipakai
  // BPS saat ini — 2021 adalah 73,16, bukan 72,29 dari rilis awal 2021,
  // karena BPS memutakhirkan seri IPM-nya.
  hdi: { label: 'IPM nasional', unit: '', decimals: 2, source: 'BPS, publikasi Indeks Pembangunan Manusia', values: [73.16, 73.77, 74.39, 75.02] },
};

// 2024-only headline facts, shown with their own year labels.
export const FACTS_2024 = {
  gdpRp: 'Rp 22.139 triliun',
  gdpRpSource: 'BPS 2024',
  gdpPerCapita: 'US$ 4.960',
  gdpPerCapitaSource: 'BPS 2024 (Rp 78,62 juta)',
  exports: 'US$ 264,7 miliar',
  exportsSource: 'BPS 2024, ekspor barang',
  reserves: 'US$ 155,7 miliar',
  reservesSource: 'Bank Indonesia, akhir Des 2024',
  lifeExpectancy: '74,15 tahun',
  lifeExpectancySource: 'BPS 2024',
  hdi: '75,02',
  hdiSource: 'BPS 2024, IPM',
  literacy: '96,67%',
  literacySource: 'BPS 2024, penduduk 15+',
  schooling: '8,85 tahun',
  schoolingSource: 'BPS 2024, rata-rata lama sekolah 25+',
  density: '148 jiwa/km²',
  densitySource: 'BPS 2024',
  medianAge: '30,1 tahun',
  medianAgeSource: 'UN WPP 2024',
  age014: '24,6%',
  age65: '7,3%',
  ageSource: 'UN WPP 2024',
  povertyPeople: '23,85 juta jiwa',
  povertyPeopleSource: 'BPS, Maret 2025 (8,47%)',
  unemploymentFeb25: '4,76%',
  unemploymentFeb25Source: 'BPS, Februari 2025',
};

export const FINDINGS = [
  {
    title: 'Ekonomi tumbuh 5,03% pada 2024',
    text: 'Pertumbuhan ditopang konsumsi rumah tangga dan investasi; PDB nominal mencapai Rp 22.139 triliun.',
    source: 'BPS 2024',
  },
  {
    title: 'Inflasi Desember 2024: 1,57%',
    text: 'Inflasi tahunan terendah dalam empat tahun terakhir, turun dari 5,51% pada Desember 2022.',
    source: 'BPS 2024',
  },
  {
    title: 'Kemiskinan turun ke 9,03%',
    text: 'Pada Maret 2024, 25,22 juta penduduk hidup di bawah garis kemiskinan; Maret 2025 turun lagi ke 8,47%.',
    source: 'BPS 2024–2025',
  },
];

// Provinces: mid-2024 population and land area (BPS estimates via Wikipedia's
// province table, sourced to BPS). Density is computed from those two columns.
export const PROVINCES = [
  { name: 'Jawa Barat', region: 'Jawa', pop: 50345200, area: 37045, capital: 'Bandung' },
  { name: 'Jawa Timur', region: 'Jawa', pop: 41814500, area: 48037, capital: 'Surabaya' },
  { name: 'Jawa Tengah', region: 'Jawa', pop: 37892300, area: 34337, capital: 'Semarang' },
  { name: 'Sumatera Utara', region: 'Sumatera', pop: 15588500, area: 72461, capital: 'Medan' },
  { name: 'Banten', region: 'Jawa', pop: 12431400, area: 9353, capital: 'Serang' },
  { name: 'DKI Jakarta', region: 'Jawa', pop: 10684900, area: 661, capital: 'Jakarta' },
  { name: 'Sulawesi Selatan', region: 'Sulawesi', pop: 9463400, area: 45331, capital: 'Makassar' },
  { name: 'Lampung', region: 'Sumatera', pop: 9419600, area: 33570, capital: 'Bandar Lampung' },
  { name: 'Sumatera Selatan', region: 'Sumatera', pop: 8837300, area: 86772, capital: 'Palembang' },
  { name: 'Riau', region: 'Sumatera', pop: 6728100, area: 89936, capital: 'Pekanbaru' },
  { name: 'Sumatera Barat', region: 'Sumatera', pop: 5836200, area: 42120, capital: 'Padang' },
  { name: 'Kalimantan Barat', region: 'Kalimantan', pop: 5695500, area: 147037, capital: 'Pontianak' },
  { name: 'Nusa Tenggara Timur', region: 'Nusa Tenggara', pop: 5656000, area: 46447, capital: 'Kupang' },
  { name: 'Nusa Tenggara Barat', region: 'Nusa Tenggara', pop: 5646000, area: 19676, capital: 'Mataram' },
  { name: 'Aceh', region: 'Sumatera', pop: 5554800, area: 56835, capital: 'Banda Aceh' },
  { name: 'Bali', region: 'Nusa Tenggara', pop: 4433300, area: 5590, capital: 'Denpasar' },
  { name: 'Kalimantan Selatan', region: 'Kalimantan', pop: 4273400, area: 37135, capital: 'Banjarbaru' },
  { name: 'Kalimantan Timur', region: 'Kalimantan', pop: 4045900, area: 126981, capital: 'Samarinda' },
  { name: 'DI Yogyakarta', region: 'Jawa', pop: 3759500, area: 3171, capital: 'Yogyakarta' },
  { name: 'Jambi', region: 'Sumatera', pop: 3724300, area: 49027, capital: 'Jambi' },
  { name: 'Sulawesi Tengah', region: 'Sulawesi', pop: 3121800, area: 61606, capital: 'Palu' },
  { name: 'Kalimantan Tengah', region: 'Kalimantan', pop: 2809700, area: 153444, capital: 'Palangka Raya' },
  { name: 'Sulawesi Tenggara', region: 'Sulawesi', pop: 2793100, area: 36160, capital: 'Kendari' },
  { name: 'Sulawesi Utara', region: 'Sulawesi', pop: 2701800, area: 14500, capital: 'Manado' },
  { name: 'Kepulauan Riau', region: 'Sumatera', pop: 2183300, area: 8270, capital: 'Tanjung Pinang' },
  { name: 'Bengkulu', region: 'Sumatera', pop: 2112200, area: 20128, capital: 'Bengkulu' },
  { name: 'Maluku', region: 'Maluku', pop: 1945600, area: 46158, capital: 'Ambon' },
  { name: 'Kepulauan Bangka Belitung', region: 'Sumatera', pop: 1531500, area: 16690, capital: 'Pangkal Pinang' },
  { name: 'Sulawesi Barat', region: 'Sulawesi', pop: 1503200, area: 16595, capital: 'Mamuju' },
  { name: 'Papua Tengah', region: 'Papua', pop: 1472900, area: 61073, capital: 'Wanggar' },
  { name: 'Papua Pegunungan', region: 'Papua', pop: 1467000, area: 51213, capital: 'Jayawijaya' },
  { name: 'Maluku Utara', region: 'Maluku', pop: 1355600, area: 32999, capital: 'Sofifi' },
  { name: 'Gorontalo', region: 'Sulawesi', pop: 1227800, area: 12025, capital: 'Gorontalo' },
  { name: 'Papua', region: 'Papua', pop: 1060600, area: 82681, capital: 'Jayapura' },
  { name: 'Kalimantan Utara', region: 'Kalimantan', pop: 739800, area: 70101, capital: 'Tanjung Selor' },
  { name: 'Papua Barat Daya', region: 'Papua', pop: 627100, area: 39123, capital: 'Sorong' },
  { name: 'Papua Barat', region: 'Papua', pop: 578700, area: 60275, capital: 'Manokwari' },
  { name: 'Papua Selatan', region: 'Papua', pop: 542100, area: 117849, capital: 'Merauke' },
];

export const REGIONS = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Nusa Tenggara', 'Maluku', 'Papua'];

// IPM per provinsi 2024 (BPS, rilis 15 November 2024; IPM nasional 75,02).
// Nilai di bawah disalin dari tabel resmi BPS per provinsi.
export const IPM_2024 = {
  'Aceh': 75.36, 'Sumatera Utara': 75.76, 'Sumatera Barat': 76.43, 'Riau': 75.67,
  'Jambi': 74.36, 'Sumatera Selatan': 73.84, 'Bengkulu': 74.91, 'Lampung': 73.13,
  'Kepulauan Bangka Belitung': 74.55, 'Kepulauan Riau': 79.89, 'DKI Jakarta': 84.15,
  'Jawa Barat': 74.92, 'Jawa Tengah': 73.87, 'DI Yogyakarta': 81.62, 'Jawa Timur': 75.35,
  'Banten': 76.35, 'Bali': 78.63, 'Nusa Tenggara Barat': 73.10, 'Nusa Tenggara Timur': 69.14,
  'Kalimantan Barat': 71.19, 'Kalimantan Tengah': 74.28, 'Kalimantan Selatan': 75.19,
  'Kalimantan Timur': 78.79, 'Kalimantan Utara': 73.41, 'Sulawesi Utara': 75.68,
  'Sulawesi Tengah': 72.24, 'Sulawesi Selatan': 75.18, 'Sulawesi Tenggara': 73.62,
  'Gorontalo': 72.01, 'Sulawesi Barat': 70.46, 'Maluku': 73.40, 'Maluku Utara': 71.84,
  'Papua Barat': 67.69, 'Papua Barat Daya': 69.65, 'Papua': 73.83, 'Papua Selatan': 68.86,
  'Papua Tengah': 60.25, 'Papua Pegunungan': 54.43,
};

// PDRB per kapita ADHB (seri 2010) per provinsi 2024, dalam ribu rupiah
// (BPS, "[Seri 2010] Produk Domestik Regional Bruto Per Kapita (Ribu
// Rupiah), 2024"; angka 2024 masih sementara). Rata-rata nasional 78.617
// ribu rupiah = Rp 78,62 juta — cocok dengan PDB per kapita di FACTS_2024.
export const PDRB_PC_2024 = {
  'Aceh': 43782, 'Sumatera Utara': 73575, 'Sumatera Barat': 57047, 'Riau': 165350,
  'Jambi': 86722, 'Sumatera Selatan': 75132, 'Bengkulu': 49233, 'Lampung': 51370,
  'Kepulauan Bangka Belitung': 70194, 'Kepulauan Riau': 161424, 'DKI Jakarta': 344349,
  'Jawa Barat': 56080, 'Jawa Tengah': 47972, 'DI Yogyakarta': 51473, 'Jawa Timur': 75770,
  'Banten': 70275, 'Bali': 67318, 'Nusa Tenggara Barat': 32282, 'Nusa Tenggara Timur': 24272,
  'Kalimantan Barat': 52703, 'Kalimantan Tengah': 79320, 'Kalimantan Selatan': 67117,
  'Kalimantan Timur': 212175, 'Kalimantan Utara': 198429, 'Sulawesi Utara': 69352,
  'Sulawesi Tengah': 120750, 'Sulawesi Selatan': 73573, 'Sulawesi Tenggara': 67840,
  'Gorontalo': 44433, 'Sulawesi Barat': 42718, 'Maluku': 32198, 'Maluku Utara': 70659,
  'Papua Barat': 131637, 'Papua Barat Daya': 59064, 'Papua': 81009, 'Papua Selatan': 61583,
  'Papua Tengah': 118774, 'Papua Pegunungan': 18105,
};

export const SOURCES = [
  { name: 'Badan Pusat Statistik (BPS)', note: 'Estimasi penduduk pertengahan tahun; PDB dan pertumbuhan ekonomi; IHK Desember; Sakernas Agustus; Susenas Maret; IPM dan indikator kesejahteraan 2024.' },
  { name: 'Bank Indonesia', note: 'Cadangan devisa akhir Desember 2024.' },
  { name: 'Badan Pusat Statistik (BPS) — IPM', note: 'Indeks Pembangunan Manusia menurut provinsi 2024, rilis 15 November 2024; IPM nasional 2021–2024 dari publikasi Indeks Pembangunan Manusia.' },
  { name: 'Badan Pusat Statistik (BPS) — PDRB per kapita', note: 'PDRB per kapita ADHB (seri 2010) menurut provinsi 2024; angka 2024 masih sementara dan dapat direvisi.' },
  { name: 'Bank Dunia (World Bank)', note: 'PDB nominal dalam dolar AS dan PDB per kapita; World Development Indicators.' },
  { name: 'Perserikatan Bangsa-Bangsa (UN WPP 2024)', note: 'Usia median dan struktur umur penduduk.' },
  { name: 'Wikipedia — Provinces of Indonesia', note: 'Tabel provinsi: penduduk pertengahan 2024 dan luas wilayah, bersumber pada estimasi BPS.' },
];

export function fmtId(n, digits = 0) {
  return Number(n).toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function density(p) {
  return p.pop / p.area;
}
