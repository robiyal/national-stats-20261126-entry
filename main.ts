// Arunika — Statistik Indonesia. Hands in the site: copies app/ and
// screenshots/ from beside this file into the output directory and writes
// /output/dossier.json with the vendored make.fun library. Node 22, standard
// library only. Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program only creates directories and copies files in; it never deletes
// the output directory itself (the grader mounts it).

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Runtime gate: refuse to write a dossier for a half-built entry instead of
// handing in an empty site. This fails loudly in the grader log rather than
// silently producing a broken submission.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('app/index.html is missing: the site was not built');
}
const shotFiles = ['1-home.jpg', '2-ekonomi.jpg', '3-perbandingan.jpg', '4-home-phone.jpg'];
for (const f of shotFiles) {
  if (!existsSync(join(here, 'screenshots', f))) throw new Error(`screenshots/${f} is missing: take the screenshots first`);
}

// The scorer's own caps: only text_max_bytes shapes the bytes; the others
// refuse an entry the scorer would refuse (more than 4 screenshots or one
// over 256 KiB; more than 993 files in app/ or 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
