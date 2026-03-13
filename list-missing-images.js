const fs = require('fs');
const path = require('path');
const DOCS_DIR = path.resolve(__dirname, 'docs');
const IMAGES_DIR = path.resolve(__dirname, 'images');

// Build basename index
const basenameIndex = new Set();
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(path.join(dir, entry.name));
    else basenameIndex.add(entry.name);
  }
};
if (fs.existsSync(IMAGES_DIR)) walk(IMAGES_DIR);

const htmlImgRe = /src="\s*(\/images\/[^"]+\S)"/g;
const mdImgRe = /!\[[^\]]*\]\((\.[^)]+)\)/g;
const missing = [];

const files = fs.readdirSync(DOCS_DIR, { recursive: true }).filter(f => f.endsWith('.md'));
for (const file of files) {
  const raw = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');

  let m;
  while ((m = htmlImgRe.exec(raw)) !== null) {
    const ref = m[1];
    const relPath = ref.replace(/^\//, '');
    const literal = path.resolve(__dirname, relPath);
    const bn = path.basename(ref);
    if (!fs.existsSync(literal) && !basenameIndex.has(bn)) {
      missing.push({ file, ref });
    }
  }

  while ((m = mdImgRe.exec(raw)) !== null) {
    const ref = m[1];
    const resolved = path.resolve(DOCS_DIR, path.dirname(file), ref);
    const bn = path.basename(ref);
    if (!fs.existsSync(resolved) && !basenameIndex.has(bn)) {
      missing.push({ file, ref });
    }
  }
}

console.log(`Total missing images: ${missing.length}\n`);
for (const { file, ref } of missing) {
  console.log(`${file}  →  ${ref}`);
}
