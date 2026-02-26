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
 *     --branch "main" \
 *     [--include-images]
 *
 * Output:
 *   dist/guardrails-docs.tar.gz
 *     ├── guardrails-docs.json
 *     └── images/          (if --include-images)
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
    includeImages: false,
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
      case "--include-images":
        opts.includeImages = true;
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
 * Collect image references from page content.
 * Returns the set of image paths found in the repo.
 */
function collectImages(pages) {
  const imageRefs = new Set();

  for (const page of pages) {
    // Match <img src="/images/..." /> patterns
    const imgTagRegex = /src="(\/images\/[^"]+)"/g;
    let match;
    while ((match = imgTagRegex.exec(page.content)) !== null) {
      imageRefs.add(match[1]);
    }

    // Match ![alt](/images/...) markdown patterns
    const mdImgRegex = /!\[[^\]]*\]\((\/images\/[^)]+)\)/g;
    while ((match = mdImgRegex.exec(page.content)) !== null) {
      imageRefs.add(match[1]);
    }
  }

  const found = [];
  const repoRoot = path.resolve(__dirname, "..");

  for (const ref of [...imageRefs].sort()) {
    const filePath = path.join(repoRoot, ref);
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: referenced image not found: ${ref}`);
      continue;
    }
    found.push({ ref, filePath });
  }

  return found;
}

/**
 * Copy images into the staging directory preserving their path structure.
 */
function stageImages(images) {
  for (const { ref, filePath } of images) {
    // ref is like /images/foo/bar.png → stage as images/foo/bar.png
    const dest = path.join(STAGING_DIR, ref.replace(/^\//, ""));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(filePath, dest);
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

  // Collect images
  console.log("Collecting images...");
  const images = collectImages(pages);
  console.log(`  Found ${images.length} images in repo`);

  // Assemble JSON
  const output = {
    metadata: {
      exportedAt: new Date().toISOString(),
      commitSha: opts.commitSha,
      branch: opts.branch,
      version: opts.version,
      pageCount: pages.length,
      imageCount: opts.includeImages ? images.length : 0,
    },
    sidebar,
    pages,
  };

  // Write JSON to staging
  const jsonPath = path.join(STAGING_DIR, "guardrails-docs.json");
  const json = JSON.stringify(output, null, 2);
  fs.writeFileSync(jsonPath, json);

  // Copy images to staging if requested
  if (opts.includeImages && images.length > 0) {
    console.log("Staging images...");
    stageImages(images);
  }

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
  console.log(`  Images: ${opts.includeImages ? images.length : 0} (${opts.includeImages ? "included" : "excluded"})`);
  console.log(`  Version: ${opts.version}`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
