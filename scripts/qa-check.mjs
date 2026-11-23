import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const PUBLIC_DIR = path.join(DOCS_DIR, 'public');
const DIST_DIR = path.join(DOCS_DIR, '.vitepress', 'dist');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const REPORT_PATH = path.join(ROOT_DIR, 'QA-REPORT.md');

const REQUIRED_FM_KEYS = ['title', 'description', 'updated', 'category', 'entity', 'intent', 'pillar'];
const MIN_BODY_CHARS = 300;
const CANONICAL_HOST = 'aijiesuo.biz';

// Superlative patterns often flagged as unverified vendor claims unless qualified
const SUPERLATIVE_REGEX =
  /(全网最强|全网最快|全网最稳|行业第一|宇宙第一|绝对不跑路|永不跑路|永久免费|100%解锁|100%稳定|秒开一切|吊打所有|最强机场|第一机场|零延迟|永不失联)/g;
const CAVEAT_CONTEXT_REGEX =
  /(宣称|自称|宣传|话术|噱头|不要轻信|勿轻信|警惕|所谓|常见|待核实|并未|无法保证|不存在|夸张|虚假|风险)/;

/**
 * Recursively walk directory and return files matching predicate.
 */
function walkFiles(dir, filterFn, ignoreDirs = new Set()) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      results.push(...walkFiles(fullPath, filterFn, ignoreDirs));
    } else if (entry.isFile() && filterFn(fullPath, entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function relFromRoot(absPath) {
  return path.relative(ROOT_DIR, absPath).split(path.sep).join('/');
}

function unquote(val) {
  const trimmed = val.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Zero-dependency YAML frontmatter parser.
 */
function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { hasFrontmatter: false, data: {}, body: normalized };
  }

  const endIdx = normalized.indexOf('\n---', 4);
  if (endIdx === -1) {
    return { hasFrontmatter: false, data: {}, body: normalized };
  }

  const yamlBlock = normalized.slice(4, endIdx);
  const body = normalized.slice(endIdx + 4).replace(/^\n+/, '');
  const data = {};

  const lines = yamlBlock.split('\n');
  let currentKey = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(unquote(listMatch[1]));
      continue;
    }

    if (/^\s+/.test(line)) continue;

    const kvMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kvMatch) continue;

    const [, key, rawVal] = kvMatch;
    currentKey = key;
    const val = rawVal.trim();

    if (val === '') {
      data[key] = '';
    } else if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      data[key] = inner
        ? inner.split(',').map((item) => unquote(item)).filter(Boolean)
        : [];
    } else if (val === 'true') {
      data[key] = true;
    } else if (val === 'false') {
      data[key] = false;
    } else {
      data[key] = unquote(val);
    }
  }

  return { hasFrontmatter: true, data, body };
}

function stripFencedCodeBlocks(mdBody) {
  return mdBody.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '');
}

function extractH1(mdBody) {
  const clean = stripFencedCodeBlocks(mdBody);
  const h1Match = clean.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  const htmlH1 = clean.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return htmlH1 ? htmlH1[1].replace(/<[^>]+>/g, '').trim() : '';
}

function countProseChars(mdBody) {
  const plain = stripFencedCodeBlocks(mdBody)
    .replace(/`[^`]+`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>|`-]/g, ' ')
    .replace(/\s+/g, '');
  return plain.length;
}

function safeDecode(uri) {
  try {
    return decodeURIComponent(uri);
  } catch {
    return uri;
  }
}

/**
 * Collect affiliate/vendor URLs declared in data/ so rendered HTML link checks
 * can enforce `rel="nofollow sponsored noopener"` accurately.
 */
function collectDataAffiliateUrls() {
  const urls = new Set();
  if (!fs.existsSync(DATA_DIR)) return urls;

  const dataFiles = walkFiles(DATA_DIR, (_p, name) =>
    /\.(ts|mts|js|mjs|json)$/i.test(name)
  );
  for (const file of dataFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/https?:\/\/[^\s"'`)<>]+/g) || [];
    for (const rawUrl of matches) {
      if (
        /aff\.|aff=|code=|invite|ref=|register|channel=|utm_/i.test(rawUrl) ||
        /affiliate|affUrl|registerUrl|promoUrl/i.test(
          content.slice(Math.max(0, content.indexOf(rawUrl) - 60), content.indexOf(rawUrl))
        )
      ) {
        urls.add(rawUrl.replace(/[;,]+$/, ''));
      }
    }
  }
  return urls;
}

/**
 * Resolve an internal link against dist/ and return whether a static target exists.
 */
function internalTargetExistsInDist(href, currentHtmlPath) {
  const clean = href.split('#')[0].split('?')[0].trim();
  if (!clean) return true;

  const decoded = safeDecode(clean);
  let targetAbs;

  if (decoded.startsWith('/')) {
    const rel = decoded.replace(/^\/+/, '');
    targetAbs = path.join(DIST_DIR, ...rel.split('/'));
  } else {
    targetAbs = path.resolve(path.dirname(currentHtmlPath), decoded);
  }

  // Must remain inside DIST_DIR
  const normalizedDist = path.resolve(DIST_DIR);
  const normalizedTarget = path.resolve(targetAbs);
  if (
    normalizedTarget !== normalizedDist &&
    !normalizedTarget.startsWith(normalizedDist + path.sep)
  ) {
    return false;
  }

  if (fs.existsSync(normalizedTarget) && fs.statSync(normalizedTarget).isFile()) {
    return true;
  }
  if (
    fs.existsSync(`${normalizedTarget}.html`) &&
    fs.statSync(`${normalizedTarget}.html`).isFile()
  ) {
    return true;
  }
  const indexCandidate = path.join(normalizedTarget, 'index.html');
  if (fs.existsSync(indexCandidate) && fs.statSync(indexCandidate).isFile()) {
    return true;
  }

  return false;
}

/**
 * Resolve a Markdown relative/root link against docs/ source files (used when dist checks run alongside source).
 */
function verifyLocalImagePath(imgPath, sourceFile) {
  const clean = safeDecode(imgPath.split('#')[0].split('?')[0].trim());
  if (!clean) return { ok: true, resolved: '' };

  let publicCandidate;
  if (clean.startsWith('/')) {
    publicCandidate = path.join(PUBLIC_DIR, ...clean.replace(/^\/+/, '').split('/'));
  } else {
    publicCandidate = path.resolve(path.dirname(sourceFile), clean);
  }

  const existsInPublic =
    fs.existsSync(publicCandidate) && fs.statSync(publicCandidate).isFile();

  let existsInDist = true;
  if (fs.existsSync(DIST_DIR) && clean.startsWith('/')) {
    const distCandidate = path.join(DIST_DIR, ...clean.replace(/^\/+/, '').split('/'));
    existsInDist = fs.existsSync(distCandidate) && fs.statSync(distCandidate).isFile();
  }

  return {
    ok: existsInPublic && existsInDist,
    resolved: relFromRoot(publicCandidate),
  };
}

function main() {
  const criticalErrors = [];
  const warnings = [];
  const stats = {
    markdownFiles: 0,
    htmlFiles: 0,
    internalLinksChecked: 0,
    localImagesChecked: 0,
    externalAffiliateLinksChecked: 0,
    jsonLdBlocksChecked: 0,
    sitemapUrls: 0,
    rssItems: 0,
  };

  const addError = (category, file, detail) => {
    criticalErrors.push({ category, file, detail });
  };

  const addWarning = (category, file, detail) => {
    warnings.push({ category, file, detail });
  };

  // ---------------------------------------------------------------------------
  // 1. Scan Markdown Source Files (docs/**/*.md)
  // ---------------------------------------------------------------------------
  const mdFiles = walkFiles(
    DOCS_DIR,
    (_p, name) => name.endsWith('.md'),
    new Set(['.vitepress', 'public', 'node_modules'])
  );
  stats.markdownFiles = mdFiles.length;

  const titleMap = new Map();
  const descMap = new Map();
  const h1Map = new Map();
  const keywordMap = new Map();
  const urlMap = new Map();
  const imageRefs = [];

  for (const mdPath of mdFiles) {
    const rel = relFromRoot(mdPath);
    const docsRel = path.relative(DOCS_DIR, mdPath).split(path.sep).join('/');
    const is404 = docsRel.toLowerCase() === '404.md';

    const raw = fs.readFileSync(mdPath, 'utf8');
    const { hasFrontmatter, data, body } = parseFrontmatter(raw);
    const isHome = data.layout === 'home' || docsRel === 'index.md';

    // Canonical route check
    const canonicalRoute =
      docsRel === 'index.md'
        ? '/'
        : docsRel.endsWith('/index.md')
          ? `/${docsRel.slice(0, -'index.md'.length)}`
          : `/${docsRel.replace(/\.md$/, '')}`;

    if (urlMap.has(canonicalRoute)) {
      addError(
        'Duplicate URL',
        rel,
        `Route "${canonicalRoute}" collides with ${urlMap.get(canonicalRoute)}`
      );
    } else {
      urlMap.set(canonicalRoute, rel);
    }

    if (!is404) {
      if (!hasFrontmatter) {
        addError('Missing Frontmatter', rel, 'Missing YAML frontmatter block.');
      } else {
        for (const key of REQUIRED_FM_KEYS) {
          const val = data[key];
          const isEmpty =
            val === undefined ||
            val === null ||
            (typeof val === 'string' && val.trim() === '') ||
            (Array.isArray(val) && val.length === 0);

          if (!isEmpty) continue;

          if (key === 'title' || key === 'description') {
            addError('Missing Required Frontmatter', rel, `Missing required frontmatter key "${key}".`);
          } else if (!isHome) {
            addWarning('Missing Metadata Frontmatter', rel, `Missing frontmatter key "${key}".`);
          }
        }
      }

      // Duplicate title
      if (typeof data.title === 'string' && data.title.trim()) {
        const t = data.title.trim();
        if (titleMap.has(t)) {
          addError('Duplicate Title', rel, `Title "${t}" duplicates ${titleMap.get(t)}`);
        } else {
          titleMap.set(t, rel);
        }
      }

      // Duplicate description
      if (typeof data.description === 'string' && data.description.trim()) {
        const d = data.description.trim();
        if (descMap.has(d)) {
          addError(
            'Duplicate Description',
            rel,
            `Description duplicates ${descMap.get(d)} ("${d.slice(0, 60)}...")`
          );
        } else {
          descMap.set(d, rel);
        }
      }

      // Duplicate H1
      const h1 = extractH1(body);
      if (h1) {
        if (h1Map.has(h1)) {
          addError('Duplicate H1', rel, `H1 "${h1}" duplicates ${h1Map.get(h1)}`);
        } else {
          h1Map.set(h1, rel);
        }
      } else if (!isHome) {
        addWarning('Missing H1', rel, 'No top-level "# H1" heading found in Markdown body.');
      }

      // Duplicate primary keywords[0]
      if (Array.isArray(data.keywords) && data.keywords.length > 0) {
        const primaryKw = String(data.keywords[0]).trim().toLowerCase();
        if (primaryKw) {
          if (keywordMap.has(primaryKw)) {
            addWarning(
              'Duplicate Primary Keyword',
              rel,
              `keywords[0] "${data.keywords[0]}" duplicates ${keywordMap.get(primaryKw)}`
            );
          } else {
            keywordMap.set(primaryKw, rel);
          }
        }
      }

      // Thin / stub page check
      if (!isHome) {
        const charCount = countProseChars(body);
        if (charCount < MIN_BODY_CHARS) {
          addWarning(
            'Thin Content / Stub',
            rel,
            `Body prose length is ${charCount} chars (< ${MIN_BODY_CHARS} chars).`
          );
        }
      }
    }

    // Hardcoded affiliate URLs inside Markdown (outside data/)
    const cleanBody = stripFencedCodeBlocks(body);
    const affDomainRegex = /\bhttps?:\/\/[^\s"'`<>)]*(?:aff\.com|aff\.cc)[^\s"'`<>)]*/gi;
    const rawAffMatches = raw.match(affDomainRegex) || [];
    const bareAffDomainMatches = raw.match(/\b(?:aff\.com|aff\.cc)\b/gi) || [];
    const urlCodeParamMatches =
      raw.match(/https?:\/\/[^\s"'`<>)]*[?&](?:code|aff|invite)=[^\s"'`<>)]*/gi) || [];
    const proseCodeMatches =
      cleanBody.replace(/`[^`]+`/g, '').match(/\bcode=[A-Za-z0-9_-]+/gi) || [];

    const hardcodedFindings = new Set([
      ...rawAffMatches,
      ...bareAffDomainMatches,
      ...urlCodeParamMatches,
      ...proseCodeMatches,
    ]);
    for (const match of hardcodedFindings) {
      addError(
        'Hardcoded Affiliate Link',
        rel,
        `Found hardcoded affiliate pattern "${match}" in Markdown (must be centralized in data/).`
      );
    }

    // Unmarked vendor superlatives
    const lines = cleanBody.split('\n');
    lines.forEach((line, idx) => {
      const matches = line.match(SUPERLATIVE_REGEX);
      if (matches && !CAVEAT_CONTEXT_REGEX.test(line)) {
        addWarning(
          'Unmarked Vendor Superlative',
          `${rel}:${idx + 1}`,
          `Contains unattributed superlative(s): ${[...new Set(matches)].join(', ')}`
        );
      }
    });

    // Collect local image references in Markdown
    const mdImgRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    for (const m of body.matchAll(mdImgRegex)) {
      if (!/^https?:\/\//i.test(m[1]) && !m[1].startsWith('data:')) {
        imageRefs.push({ src: m[1], file: rel, sourceAbs: mdPath });
      }
    }
    const htmlImgRegex = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
    for (const m of body.matchAll(htmlImgRegex)) {
      if (!/^https?:\/\//i.test(m[1]) && !m[1].startsWith('data:')) {
        imageRefs.push({ src: m[1], file: rel, sourceAbs: mdPath });
      }
    }
    const rootImagesRegex = /["'(`](\/images\/[^"'\s)`<>]+)["'`)]/g;
    for (const m of raw.matchAll(rootImagesRegex)) {
      imageRefs.push({ src: m[1], file: rel, sourceAbs: mdPath });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Scan data/ for local image references
  // ---------------------------------------------------------------------------
  if (fs.existsSync(DATA_DIR)) {
    const dataFiles = walkFiles(DATA_DIR, (_p, name) =>
      /\.(ts|mts|js|mjs|json)$/i.test(name)
    );
    for (const df of dataFiles) {
      const content = fs.readFileSync(df, 'utf8');
      const rel = relFromRoot(df);
      for (const m of content.matchAll(/["'`](\/images\/[^"'`\s<>]+)["'`]/g)) {
        imageRefs.push({ src: m[1], file: rel, sourceAbs: df });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Built Output Checks (docs/.vitepress/dist)
  // ---------------------------------------------------------------------------
  const dataAffiliateUrls = collectDataAffiliateUrls();

  if (!fs.existsSync(DIST_DIR)) {
    addError(
      'Missing Build Output',
      'docs/.vitepress/dist',
      'Build directory does not exist. Run "npm run docs:build" before "npm run qa".'
    );
  } else {
    // Verify SEO files
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      addError('Missing SEO File', 'docs/.vitepress/dist/sitemap.xml', 'sitemap.xml not found.');
    } else {
      const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
      const locs = [...sitemapXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)];
      stats.sitemapUrls = locs.length;
      if (locs.length === 0) {
        addError('Invalid SEO File', 'docs/.vitepress/dist/sitemap.xml', 'sitemap.xml has 0 URLs.');
      }
    }

    const robotsPath = path.join(DIST_DIR, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      addError('Missing SEO File', 'docs/.vitepress/dist/robots.txt', 'robots.txt not found.');
    } else {
      const robots = fs.readFileSync(robotsPath, 'utf8');
      if (!robots.includes(`https://${CANONICAL_HOST}/sitemap.xml`)) {
        addError(
          'Invalid SEO File',
          'docs/.vitepress/dist/robots.txt',
          `robots.txt does not reference https://${CANONICAL_HOST}/sitemap.xml`
        );
      }
    }

    const rssPath = path.join(DIST_DIR, 'rss.xml');
    if (!fs.existsSync(rssPath)) {
      addError('Missing SEO File', 'docs/.vitepress/dist/rss.xml', 'rss.xml not found.');
    } else {
      const rss = fs.readFileSync(rssPath, 'utf8');
      const items = [...rss.matchAll(/<item>/g)];
      stats.rssItems = items.length;
      if (!rss.includes('<rss version="2.0"')) {
        addError('Invalid SEO File', 'docs/.vitepress/dist/rss.xml', 'rss.xml is not valid RSS 2.0.');
      }
    }

    const html404Path = path.join(DIST_DIR, '404.html');
    if (!fs.existsSync(html404Path)) {
      addWarning('Missing 404 Page', 'docs/.vitepress/dist/404.html', 'Custom 404.html not found in dist.');
    }

    // Inspect all rendered HTML files
    const htmlFiles = walkFiles(DIST_DIR, (_p, name) => name.endsWith('.html'));
    stats.htmlFiles = htmlFiles.length;

    const checkedInternalLinks = new Set();

    for (const htmlPath of htmlFiles) {
      const rel = relFromRoot(htmlPath);
      const html = fs.readFileSync(htmlPath, 'utf8');

      // 3a. Validate JSON-LD blocks
      const jsonLdRegex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      for (const m of html.matchAll(jsonLdRegex)) {
        stats.jsonLdBlocksChecked += 1;
        const payload = m[1].trim();
        try {
          const parsed = JSON.parse(payload);
          const items = Array.isArray(parsed) ? parsed : [parsed];
          for (const item of items) {
            if (!item || typeof item !== 'object' || !item['@type']) {
              addError('Invalid JSON-LD', rel, 'JSON-LD object missing "@type".');
            }
          }
        } catch (err) {
          addError(
            'Invalid JSON-LD',
            rel,
            `JSON.parse failed: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      }

      // 3b. Inspect rendered <img> tags for local image references
      for (const m of html.matchAll(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
        const src = m[1];
        if (src.startsWith('/images/')) {
          imageRefs.push({ src, file: rel, sourceAbs: htmlPath });
        }
      }

      // 3c. Inspect all <a ...> tags (internal links + external rel attributes)
      const anchorRegex = /<a\b([^>]*)>/gi;
      for (const m of html.matchAll(anchorRegex)) {
        const attrs = m[1];
        const hrefMatch =
          attrs.match(/\bhref\s*=\s*"([^"]*)"/i) || attrs.match(/\bhref\s*=\s*'([^']*)'/i);
        if (!hrefMatch) continue;

        const href = hrefMatch[1].trim();
        if (
          !href ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('javascript:') ||
          href.startsWith('data:')
        ) {
          continue;
        }

        if (/^https?:\/\//i.test(href) || href.startsWith('//')) {
          // External link checks
          let hostname = '';
          try {
            hostname = new URL(href.startsWith('//') ? `https:${href}` : href).hostname.toLowerCase();
          } catch {
            continue;
          }
          if (hostname === CANONICAL_HOST || hostname === `www.${CANONICAL_HOST}`) {
            continue;
          }

          const relMatch =
            attrs.match(/\brel\s*=\s*"([^"]*)"/i) || attrs.match(/\brel\s*=\s*'([^']*)'/i);
          const relTokens = new Set(
            (relMatch ? relMatch[1] : '')
              .toLowerCase()
              .split(/\s+/)
              .filter(Boolean)
          );

          const isAffiliateOrVendor =
            dataAffiliateUrls.has(href) ||
            /(?:aff\.|aff=|code=|invite|ref=|#\/register|register\?|channel=)/i.test(href) ||
            /\b(?:brand-cta|aff-link|affiliate|sponsor)\b/i.test(attrs) ||
            relTokens.has('sponsored');

          if (isAffiliateOrVendor) {
            stats.externalAffiliateLinksChecked += 1;
            const missingRels = ['nofollow', 'sponsored', 'noopener'].filter(
              (token) => !relTokens.has(token)
            );
            if (missingRels.length > 0) {
              addError(
                'Missing Affiliate Link rel',
                rel,
                `External vendor/affiliate link "${href}" missing rel token(s): ${missingRels.join(', ')}`
              );
            }
          } else if (/\btarget\s*=\s*["']_blank["']/i.test(attrs) && !relTokens.has('noopener')) {
            addWarning(
              'External Link Security',
              rel,
              `External target="_blank" link "${href}" missing rel="noopener".`
            );
          }
        } else {
          // Internal link check
          const cacheKey = `${path.dirname(htmlPath)}::${href}`;
          if (!checkedInternalLinks.has(cacheKey)) {
            checkedInternalLinks.add(cacheKey);
            stats.internalLinksChecked += 1;
            if (!internalTargetExistsInDist(href, htmlPath)) {
              addError('Broken Internal Link', rel, `Target not found in dist/: "${href}"`);
            }
          }
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Verify All Collected Local Image References
  // ---------------------------------------------------------------------------
  const seenImages = new Set();
  for (const ref of imageRefs) {
    const key = `${ref.src}::${ref.file}`;
    if (seenImages.has(key)) continue;
    seenImages.add(key);

    if (!ref.src.startsWith('/images/') && !/\.(png|jpe?g|webp|avif|gif|svg|ico)(\?.*)?$/i.test(ref.src)) {
      continue;
    }

    stats.localImagesChecked += 1;
    const { ok, resolved } = verifyLocalImagePath(ref.src, ref.sourceAbs);
    if (!ok) {
      addError(
        'Missing Local Image',
        ref.file,
        `Referenced image "${ref.src}" not found at "${resolved}" (or missing in dist).`
      );
    }
  }

  // ---------------------------------------------------------------------------
  // 5. Generate QA-REPORT.md
  // ---------------------------------------------------------------------------
  const statusBadge = criticalErrors.length === 0 ? 'PASS' : 'FAIL';
  const generatedAt = new Date().toISOString();

  const formatFindings = (items) => {
    if (items.length === 0) return '_None._\n';
    const rows = items.map(
      (item, i) =>
        `| ${i + 1} | ${item.category} | \`${item.file}\` | ${item.detail.replace(/\|/g, '\\|')} |`
    );
    return [
      '| # | Category | Source | Detail |',
      '| --- | --- | --- | --- |',
      ...rows,
      '',
    ].join('\n');
  };

  const report = `# QA Report — aijiesuo.biz (AI解锁)

- **Status:** **${statusBadge}**
- **Generated At:** \`${generatedAt}\`
- **Critical Errors:** ${criticalErrors.length}
- **Warnings:** ${warnings.length}

## Summary Metrics

| Check Metric | Count |
| --- | --- |
| Markdown source files scanned | ${stats.markdownFiles} |
| Built HTML files scanned | ${stats.htmlFiles} |
| Sitemap URLs verified | ${stats.sitemapUrls} |
| RSS 2.0 items verified | ${stats.rssItems} |
| Internal links verified | ${stats.internalLinksChecked} |
| Local image references verified | ${stats.localImagesChecked} |
| Vendor / affiliate external links audited | ${stats.externalAffiliateLinksChecked} |
| JSON-LD blocks validated | ${stats.jsonLdBlocksChecked} |

## Critical Errors (Build/Deploy Blockers)

${formatFindings(criticalErrors)}
## Warnings (Review Recommended)

${formatFindings(warnings)}
`;

  fs.writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(
    `[qa] Wrote QA-REPORT.md — Status: ${statusBadge} (${criticalErrors.length} critical errors, ${warnings.length} warnings)`
  );

  if (criticalErrors.length > 0) {
    for (const err of criticalErrors) {
      console.error(`[qa] ERROR [${err.category}] ${err.file}: ${err.detail}`);
    }
    process.exit(1);
  }
}

try {
  main();
} catch (err) {
  console.error(`[qa] Fatal error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
