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
 * Build a slug→label map from processed pages.
 * Priority: title > sidebar_label > slug-derived.
 */
function buildLabelMap(pages) {
  const map = {};
  for (const page of pages) {
    const label = page.title || page.sidebar_label || slugToLabel(page.id);
    if (label) map[page.id] = label;
  }
  return map;
}

function slugToLabel(slug) {
  const segment = slug.split("/").pop() || slug;
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Enrich a resolved sidebar tree with labels from page frontmatter.
 * - Leaf strings become { slug, label }
 * - Categories get label set from frontmatter if missing
 * - Recurses into children
 */
function enrichSidebarLabels(labelMap, items) {
  if (!Array.isArray(items)) return items;
  return items.map((item) => {
    if (typeof item === "string") {
      const label = labelMap[item];
      return label ? { slug: item, label } : item;
    }
    if (typeof item === "object" && item !== null) {
      const link = item.link || item.id || "";
      if (!item.label && link && labelMap[link]) {
        item.label = labelMap[link];
      }
      if (Array.isArray(item.items)) {
        item.items = enrichSidebarLabels(labelMap, item.items);
      }
    }
    return item;
  });
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
 * Scan all pages for image references and return only the images
 * that are actually used in the markdown content.
 *
 * Handles two reference styles:
 *   1. HTML: src="/images/foo/bar.png"  → top-level images/ directory
 *   2. Markdown: ![alt](./screenshot.png) → co-located relative to the .md file
 */
function collectReferencedImages(pages) {
  const found = new Map(); // filePath → { stagePath, filePath }

  // Build basename→filePath index for images/ and docs/ directories (for fallback lookup)
  const basenameIndex = {};
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name));
      } else if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(entry.name)) {
        basenameIndex[entry.name] = path.join(dir, entry.name);
      }
    }
  };
  if (fs.existsSync(IMAGES_DIR)) walk(IMAGES_DIR);
  walk(DOCS_DIR);

  // Regex patterns for image references
  const htmlImgRe = /src="\s*(\/images\/[^"]+\S)"/g;
  const mdImgRe = /!\[[^\]]*\]\((\.[^)]+)\)/g;

  // Resolve an HTML image ref to { filePath, stagePath } or null
  function resolveHtmlRef(ref) {
    // Try /images/docs/guardrails/... → docs/...
    const guardrailsPrefix = "/images/docs/guardrails/";
    if (ref.startsWith(guardrailsPrefix)) {
      const docsRelPath = ref.slice(guardrailsPrefix.length);
      const fp = path.join(DOCS_DIR, docsRelPath);
      if (fs.existsSync(fp)) {
        return { filePath: fp, stagePath: path.join("docs", docsRelPath) };
      }
    }

    // Try literal path: /images/... → images/...
    const relPath = ref.replace(/^\//, "");
    const fp = path.resolve(__dirname, "..", relPath);
    if (fs.existsSync(fp)) {
      return { filePath: fp, stagePath: relPath };
    }

    // Fallback: basename lookup
    const bn = path.basename(relPath);
    const actual = basenameIndex[bn];
    if (actual) {
      return {
        filePath: actual,
        stagePath: path.relative(path.resolve(__dirname, ".."), actual),
      };
    }

    return null;
  }

  // Resolve a markdown image ref to { filePath, stagePath } or null
  function resolveMdRef(ref, pageDir) {
    const resolved = path.resolve(DOCS_DIR, pageDir, ref);
    if (fs.existsSync(resolved)) {
      const relInDocs = path.relative(DOCS_DIR, resolved);
      return { filePath: resolved, stagePath: path.join("docs", relInDocs) };
    }

    // Fallback: basename lookup
    const bn = path.basename(ref);
    const actual = basenameIndex[bn];
    if (actual) {
      return {
        filePath: actual,
        stagePath: path.relative(path.resolve(__dirname, ".."), actual),
      };
    }

    return null;
  }

  for (const page of pages) {
    const raw = page.content;
    const pageDir = path.dirname(page.path);

    let match;
    while ((match = htmlImgRe.exec(raw)) !== null) {
      const result = resolveHtmlRef(match[1]);
      if (result && !found.has(result.filePath)) {
        found.set(result.filePath, result);
      }
    }

    while ((match = mdImgRe.exec(raw)) !== null) {
      const result = resolveMdRef(match[1], pageDir);
      if (result && !found.has(result.filePath)) {
        found.set(result.filePath, result);
      }
    }
  }

  return {
    images: Array.from(found.values()).sort((a, b) =>
      a.stagePath.localeCompare(b.stagePath)
    ),
    resolveHtmlRef,
    resolveMdRef,
  };
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

  const convertedPaths = new Set();
  for (const { stagePath, filePath } of images) {
    const ext = path.extname(filePath).toLowerCase();

    if (canConvert && ext === ".png") {
      const webpStagePath = stagePath.replace(/\.png$/i, ".webp");
      const dest = path.join(STAGING_DIR, webpStagePath);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      try {
        execSync(`cwebp -q 80 "${filePath}" -o "${dest}"`, { stdio: "ignore" });
        convertedPaths.add(stagePath);
        continue;
      } catch {
        // Fall through to copy original on conversion failure
      }
    }

    const dest = path.join(STAGING_DIR, stagePath);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(filePath, dest);
  }

  if (convertedPaths.size > 0) {
    console.log(`  Converted ${convertedPaths.size} PNGs to WebP`);
  }

  return convertedPaths;
}

/**
 * Rewrite image references in page content to use archive-relative paths.
 *
 * Transforms virtual/relative refs into the actual stagePath within the archive,
 * and updates .png → .webp for images that were converted.
 *
 * Examples:
 *   src="/images/docs/guardrails/foo/bar.png"  → src="docs/foo/bar.webp"
 *   ![alt](./screenshot.png)                    → ![alt](docs/page-dir/screenshot.webp)
 *   src="/images/servicenow/foo.png"            → src="images/servicenow/foo.webp"
 */
function rewriteImageRefs(pages, convertedPaths, resolveHtmlRef, resolveMdRef) {
  let totalRewrites = 0;

  for (const page of pages) {
    const pageDir = path.dirname(page.path);

    // 1. HTML-style: src="/images/..."
    page.content = page.content.replace(
      /src="(\s*\/images\/[^"]+\S)"/g,
      (match, ref) => {
        const result = resolveHtmlRef(ref);
        if (!result) return match;
        let newPath = result.stagePath;
        if (convertedPaths.has(newPath)) {
          newPath = newPath.replace(/\.png$/i, ".webp");
        }
        totalRewrites++;
        return `src="${newPath}"`;
      }
    );

    // 2. Markdown-style: ![alt](./...)
    page.content = page.content.replace(
      /(!\[[^\]]*\]\()(\.[^)]+)(\))/g,
      (match, prefix, ref, suffix) => {
        const result = resolveMdRef(ref, pageDir);
        if (!result) return match;
        let newPath = result.stagePath;
        if (convertedPaths.has(newPath)) {
          newPath = newPath.replace(/\.png$/i, ".webp");
        }
        totalRewrites++;
        return prefix + newPath + suffix;
      }
    );
  }

  console.log(`  Rewrote ${totalRewrites} image references to archive paths`);
}

async function main() {
  const opts = parseArgs();

  console.log(`Building docs export v${opts.version}...`);

  // Clean staging directory
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  fs.mkdirSync(STAGING_DIR, { recursive: true });

  // Resolve sidebar (expand placeholders)
  const sidebarPath = path.join(DOCS_DIR, "sidebar.json");
  console.log("Resolving sidebar...");
  const resolvedSidebar = resolveSidebar(sidebarPath);

  // Process pages
  console.log("Processing pages...");
  const pages = await processPages();
  console.log(`  Found ${pages.length} pages`);

  // Enrich sidebar with labels from page frontmatter
  console.log("Enriching sidebar labels...");
  const labelMap = buildLabelMap(pages);
  const sidebar = enrichSidebarLabels(labelMap, resolvedSidebar);

  // Collect only images referenced by markdown content
  console.log("Collecting referenced images...");
  const { images, resolveHtmlRef, resolveMdRef } =
    collectReferencedImages(pages);
  console.log(`  Found ${images.length} referenced images`);

  let convertedPaths = new Set();
  if (images.length > 0) {
    console.log("Staging images...");
    convertedPaths = stageImages(images);
  }

  // Rewrite image refs in page content to use archive-relative paths
  console.log("Rewriting image references...");
  rewriteImageRefs(pages, convertedPaths, resolveHtmlRef, resolveMdRef);

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
