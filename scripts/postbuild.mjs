import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const DIST_DIR = path.join(DOCS_DIR, '.vitepress', 'dist');

const SITE_URL = 'https://aijiesuo.biz';
const SITE_TITLE = 'AI解锁 (aijiesuo.biz)';
const SITE_DESCRIPTION = 'AI 服务访问、代理客户端配置、网络故障排查与机场品牌实测研究知识库。';
const MAX_RSS_ITEMS = 100;

/**
 * Recursively collect files matching a predicate.
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

/**
 * Strip surrounding single/double quotes from a YAML scalar string.
 */
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
 * Lightweight zero-dependency YAML frontmatter parser for Markdown files.
 */
function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized };
  }

  const endIdx = normalized.indexOf('\n---', 4);
  if (endIdx === -1) {
    return { data: {}, body: normalized };
  }

  const yamlBlock = normalized.slice(4, endIdx);
  const body = normalized.slice(endIdx + 4).replace(/^\n+/, '');
  const data = {};

  const lines = yamlBlock.split('\n');
  let currentKey = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // Top-level array item for previous key
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(unquote(listMatch[1]));
      continue;
    }

    // Ignore deeper nested YAML objects (e.g. hero:, head:)
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

  return { data, body };
}

/**
 * Escape XML special characters.
 */
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Decode basic HTML entities when falling back to rendered HTML tags.
 */
function decodeHtmlEntities(str) {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Extract first Markdown H1 outside fenced code blocks.
 */
function extractMarkdownH1(body) {
  const stripped = body.replace(/```[\s\S]*?```/g, '');
  const h1Match = stripped.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  const htmlH1 = stripped.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return htmlH1 ? htmlH1[1].replace(/<[^>]+>/g, '').trim() : '';
}

/**
 * Extract fallback title and meta description from built HTML file.
 */
function extractHtmlMeta(htmlPath) {
  if (!fs.existsSync(htmlPath)) return { title: '', description: '' };
  const html = fs.readFileSync(htmlPath, 'utf8');

  let title = '';
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    title = decodeHtmlEntities(titleMatch[1].trim()).replace(/\s*\|\s*AI解锁.*$/, '').trim();
  }

  let description = '';
  const descMatch =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i) ||
    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["'][^>]*>/i);
  if (descMatch) {
    description = decodeHtmlEntities(descMatch[1].trim());
  }

  return { title, description };
}

/**
 * Parse a date string safely, falling back to file mtime.
 */
function resolveDate(dateInput, fallbackDate) {
  if (dateInput) {
    const parsed = new Date(String(dateInput));
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return fallbackDate;
}

/**
 * Verify sitemap.xml exists, count URLs, and detect whether clean URLs are used.
 */
function checkSitemap() {
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(
      `Missing ${path.relative(ROOT_DIR, sitemapPath)}. Ensure VitePress sitemap generation is enabled in docs/.vitepress/config.*`
    );
  }

  const xml = fs.readFileSync(sitemapPath, 'utf8');
  if (!xml.includes('<urlset')) {
    throw new Error('sitemap.xml exists but does not contain a valid <urlset> root element.');
  }

  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) {
    throw new Error('sitemap.xml contains 0 <loc> URLs.');
  }

  // Detect whether non-index pages in sitemap omit `.html` (VitePress cleanUrls: true)
  const hasHtmlSuffix = locs.some((u) => u.endsWith('.html'));
  const hasCleanRoute = locs.some((u) => {
    const pathname = u.replace(/^https?:\/\/[^/]+/, '');
    return pathname !== '/' && !pathname.endsWith('/') && !pathname.endsWith('.html');
  });

  const cleanUrls = hasCleanRoute && !hasHtmlSuffix;
  console.log(`[postbuild] Verified sitemap.xml: ${locs.length} URLs (cleanUrls=${cleanUrls}).`);
  return { count: locs.length, cleanUrls };
}

/**
 * Ensure dist/robots.txt exists and matches production rules.
 */
function ensureRobotsTxt() {
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  const expectedRobots = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  if (fs.existsSync(robotsPath)) {
    const existing = fs.readFileSync(robotsPath, 'utf8');
    const hasSitemap = existing.includes(`Sitemap: ${SITE_URL}/sitemap.xml`);
    const hasUserAgent = /User-agent:\s*\*/i.test(existing);
    const blocksAll = /Disallow:\s*\/\s*$/m.test(existing);
    if (hasSitemap && hasUserAgent && !blocksAll) {
      console.log('[postbuild] Verified existing robots.txt matches production rules.');
      return;
    }
  }

  fs.writeFileSync(robotsPath, expectedRobots, 'utf8');
  console.log('[postbuild] Generated dist/robots.txt.');
}

/**
 * Map a docs Markdown path to its built HTML path and canonical URL path.
 */
function resolveRoute(relMdPath, cleanUrls) {
  const posixRel = relMdPath.split(path.sep).join('/');
  const builtHtmlRel = posixRel.replace(/\.md$/, '.html');
  const builtHtmlAbs = path.join(DIST_DIR, ...builtHtmlRel.split('/'));

  let urlPath;
  if (posixRel === 'index.md') {
    urlPath = '/';
  } else if (posixRel.endsWith('/index.md')) {
    urlPath = `/${posixRel.slice(0, -'index.md'.length)}`;
  } else if (cleanUrls) {
    urlPath = `/${posixRel.slice(0, -'.md'.length)}`;
  } else {
    urlPath = `/${builtHtmlRel}`;
  }

  const encodedPath = urlPath
    .split('/')
    .map((seg) => (seg ? encodeURIComponent(seg) : ''))
    .join('/');

  return {
    builtHtmlAbs,
    url: `${SITE_URL}${encodedPath}`,
  };
}

/**
 * Generate valid RSS 2.0 XML at docs/.vitepress/dist/rss.xml.
 */
function generateRss(cleanUrls) {
  const ignoreDirs = new Set(['.vitepress', 'public', 'node_modules']);
  const mdFiles = walkFiles(
    DOCS_DIR,
    (_full, name) => name.endsWith('.md'),
    ignoreDirs
  );

  const items = [];

  for (const mdPath of mdFiles) {
    const relPath = path.relative(DOCS_DIR, mdPath);
    if (relPath.toLowerCase() === '404.md') continue;

    const raw = fs.readFileSync(mdPath, 'utf8');
    const { data, body } = parseFrontmatter(raw);

    if (data.draft === true) continue;
    if (typeof data.robots === 'string' && /noindex/i.test(data.robots)) continue;

    const { builtHtmlAbs, url } = resolveRoute(relPath, cleanUrls);
    if (!fs.existsSync(builtHtmlAbs)) continue;

    const builtHtml = fs.readFileSync(builtHtmlAbs, 'utf8');
    if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(builtHtml)) {
      continue;
    }

    const htmlMeta = extractHtmlMeta(builtHtmlAbs);
    const title = String(data.title || extractMarkdownH1(body) || htmlMeta.title || relPath).trim();
    const description = String(data.description || htmlMeta.description || SITE_DESCRIPTION).trim();
    const stat = fs.statSync(mdPath);
    const pubDate = resolveDate(data.updated || data.date, stat.mtime);
    const category = data.category ? String(data.category).trim() : '';

    items.push({
      title,
      url,
      description,
      category,
      pubDate,
    });
  }

  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  const selected = items.slice(0, MAX_RSS_ITEMS);

  const nowUtc = new Date().toUTCString();
  const itemXml = selected
    .map((item) => {
      const categoryTag = item.category
        ? `\n      <category>${escapeXml(item.category)}</category>`
        : '';
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>${categoryTag}
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${nowUtc}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>
`;

  const rssPath = path.join(DIST_DIR, 'rss.xml');
  fs.writeFileSync(rssPath, rssXml, 'utf8');
  console.log(`[postbuild] Generated dist/rss.xml with ${selected.length} items.`);
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`[postbuild] Build output directory not found: ${DIST_DIR}`);
    process.exit(1);
  }

  const { cleanUrls } = checkSitemap();
  ensureRobotsTxt();
  generateRss(cleanUrls);
  console.log('[postbuild] Post-build verification & feed generation completed.');
}

try {
  main();
} catch (err) {
  console.error(`[postbuild] Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
