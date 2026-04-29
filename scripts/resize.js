#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.resolve(process.cwd(), 'assets', 'originals', 'events');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'images', 'events');
const WIDTHS = [320, 640, 1024, 1600];

if (!fs.existsSync(INPUT_DIR)) {
  console.error(`Input directory not found: ${INPUT_DIR}`);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext).replace(/\s+/g, '-').toLowerCase();
  const infile = path.join(INPUT_DIR, file);

  for (const w of WIDTHS) {
    const outWebp = path.join(OUT_DIR, `${name}-${w}.webp`);
    const outJpg = path.join(OUT_DIR, `${name}-${w}.jpg`);

    try {
      await sharp(infile)
        .resize(w)
        .webp({ quality: 80 })
        .toFile(outWebp);

      await sharp(infile)
        .resize(w)
        .jpeg({ quality: 82 })
        .toFile(outJpg);

      console.log(`Wrote: ${outWebp} and ${outJpg}`);
    } catch (err) {
      console.error(`Failed to process ${file} @ ${w}px:`, err.message || err);
    }
  }
}

async function main() {
  const files = fs.readdirSync(INPUT_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  if (files.length === 0) {
    console.error('No image files found in', INPUT_DIR);
    process.exit(1);
  }

  for (const f of files) await processFile(f);
  console.log('All done. Output directory:', OUT_DIR);
}

main().catch((err) => { console.error(err); process.exit(1); });
