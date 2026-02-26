#!/usr/bin/env node

/**
 * Build docs export tarball for the Turbot Registry.
 *
 * Reads all markdown files from docs/, parses frontmatter,
 * resolves the sidebar navigation, and produces a tarball
 * containing guardrails-docs.json + original image files.
 *
 * Usage:
 *   node scripts/build-docs-export.js \
 *     --version "2026.02.26" \
 *     --commit-sha "abc123" \
 *     --branch "main"
 *
 * Output:
 *   dist/guardrails-docs.tar.gz
 *     ├── guardrails-docs.json
 *     └── images/
 *         ├── foo.png
 *         └── ...
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const matter = require("gray-matter");
const { glob } = require("glob");

const DOCS_DIR = path.resolve(__dirname, "../docs");
const IMAGES_DIR = path.resolve(__dirname, "../images");
const OUTPUT_DIR = path.resolve(__dirname, "../dist");
const STAGING_DIR = path.join(OUTPUT_DIR, "staging");
const OUTPUT_TARBALL = path.join(OUTPUT_DIR, "guardrails-docs.tar.gz");

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    version: null,
    commitSha: null,
    branch: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--version":
        opts.version = args[++i];
        break;
      case "--commit-sha":
        opts.commitSha = args[++i];
        break;
      case "--branch":
        opts.branch = args[++i];
        break;
    }
  }

  if (!opts.version) {
    const now = new Date();
    opts.version = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}.${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
  }

  return opts;
}

/**
 * Resolve sidebar JSON, expanding placeholder entries that reference
 * external sidebar files.
 */
function resolveSidebar(sidebarPath) {
  const raw = JSON.parse(fs.readFileSync(sidebarPath, "utf-8"));
  return resolveItems(raw, path.dirname(sidebarPath));
}

function resolveItems(items, baseDir) {
  const resolved = [];

  for (const item of items) {
    if (typeof item === "string") {
      resolved.push(item);
      continue;
    }

    if (item.type === "placeholder" && item.file) {
      const filePath = path.resolve(baseDir, item.file);
      if (fs.existsSync(filePath)) {
        const subItems = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const resolvedSub = resolveItems(
          Array.isArray(subItems) ? subItems : [subItems],
          path.dirname(filePath)
        );
        resolved.push(...resolvedSub);
      } else {
        console.warn(`Warning: placeholder file not found: ${filePath}`);
      }
      continue;
    }

    const resolvedItem = { ...item };
    if (item.items && Array.isArray(item.items)) {
      resolvedItem.items = resolveItems(item.items, baseDir);
    }
    resolved.push(resolvedItem);
  }

  return resolved;
}

/**
 * Process all markdown files in docs/.
 */
async function processPages() {
  const files = await glob("**/*.md", { cwd: DOCS_DIR });
  const pages = [];

  for (const file of files.sort()) {
    const filePath = path.join(DOCS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(raw);

    // Derive page ID from file path (strip .md, strip trailing /index)
    let id = file.replace(/\.md$/, "");
    if (id.endsWith("/index")) {
      id = id.replace(/\/index$/, "");
    }
    if (id === "index") {
      id = "index";
    }

    pages.push({
      id,
      path: file,
      title: frontmatter.title || null,
      sidebar_label: frontmatter.sidebar_label || null,
      slug: frontmatter.slug || null,
      content: content.trim(),
    });
  }

  return pages;
}

/**
 * Collect all images: co-located images next to markdown files in docs/,
 * and images from the top-level images/ directory.
 */
async function collectImages() {
  const found = [];

  // 1. Co-located images inside docs/ (e.g., docs/foo/bar/screenshot.png)
  const docsImages = await glob("**/*.{png,jpg,jpeg,gif,svg,webp}", {
    cwd: DOCS_DIR,
  });
  for (const file of docsImages.sort()) {
    found.push({
      stagePath: path.join("docs", file),
      filePath: path.join(DOCS_DIR, file),
    });
  }

  // 2. Top-level images/ directory
  if (fs.existsSync(IMAGES_DIR)) {
    const topImages = await glob("**/*.{png,jpg,jpeg,gif,svg,webp}", {
      cwd: IMAGES_DIR,
    });
    for (const file of topImages.sort()) {
      found.push({
        stagePath: path.join("images", file),
        filePath: path.join(IMAGES_DIR, file),
      });
    }
  }

  return found;
}

/**
 * Check if cwebp is available for PNG→WebP conversion.
 */
function hasCwebp() {
  try {
    execSync("cwebp -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Copy images into the staging directory, converting PNGs to WebP
 * when cwebp is available.
 */
function stageImages(images) {
  const canConvert = hasCwebp();
  if (canConvert) {
    console.log("  cwebp found — converting PNGs to WebP");
  } else {
    console.log("  cwebp not found — copying PNGs as-is (install webp package for smaller output)");
  }

  let converted = 0;
  for (const { stagePath, filePath } of images) {
    const ext = path.extname(filePath).toLowerCase();

    if (canConvert && ext === ".png") {
      const webpStagePath = stagePath.replace(/\.png$/i, ".webp");
      const dest = path.join(STAGING_DIR, webpStagePath);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      try {
        execSync(`cwebp -q 80 "${filePath}" -o "${dest}"`, { stdio: "ignore" });
        converted++;
        continue;
      } catch {
        // Fall through to copy original on conversion failure
      }
    }

    const dest = path.join(STAGING_DIR, stagePath);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(filePath, dest);
  }

  if (converted > 0) {
    console.log(`  Converted ${converted} PNGs to WebP`);
  }
}

async function main() {
  const opts = parseArgs();

  console.log(`Building docs export v${opts.version}...`);

  // Clean staging directory
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  fs.mkdirSync(STAGING_DIR, { recursive: true });

  // Resolve sidebar
  const sidebarPath = path.join(DOCS_DIR, "sidebar.json");
  console.log("Resolving sidebar...");
  const sidebar = resolveSidebar(sidebarPath);

  // Process pages
  console.log("Processing pages...");
  const pages = await processPages();
  console.log(`  Found ${pages.length} pages`);

  // Collect and stage images
  console.log("Collecting images...");
  const images = await collectImages();
  console.log(`  Found ${images.length} images`);

  if (images.length > 0) {
    console.log("Staging images...");
    stageImages(images);
  }

  // Assemble JSON
  const output = {
    metadata: {
      exportedAt: new Date().toISOString(),
      commitSha: opts.commitSha,
      branch: opts.branch,
      version: opts.version,
      pageCount: pages.length,
      imageCount: images.length,
    },
    sidebar,
    pages,
  };

  // Write JSON to staging
  const jsonPath = path.join(STAGING_DIR, "guardrails-docs.json");
  const json = JSON.stringify(output, null, 2);
  fs.writeFileSync(jsonPath, json);

  // Create tarball
  console.log("Creating tarball...");
  execSync(`tar -czf "${OUTPUT_TARBALL}" -C "${STAGING_DIR}" .`, {
    stdio: "inherit",
  });

  // Clean up staging
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });

  const tarballSize = fs.statSync(OUTPUT_TARBALL).size;
  const jsonSize = Buffer.byteLength(json);
  console.log(`\nExport complete:`);
  console.log(`  Output: ${OUTPUT_TARBALL}`);
  console.log(`  JSON size: ${(jsonSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Tarball size: ${(tarballSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Pages: ${pages.length}`);
  console.log(`  Images: ${images.length}`);
  console.log(`  Version: ${opts.version}`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
