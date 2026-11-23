#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const KEYWORDS_DIR = path.join(ROOT_DIR, 'data', 'keywords')
const NAV_FILE = path.join(ROOT_DIR, 'data', 'navigation.ts')

const PATHS = {
  seeds: path.join(KEYWORDS_DIR, 'seeds.json'),
  longtails: path.join(KEYWORDS_DIR, 'longtails.json'),
  urlMap: path.join(KEYWORDS_DIR, 'keyword-url-map.json'),
  roadmap: path.join(KEYWORDS_DIR, 'content-roadmap.json'),
  history: path.join(KEYWORDS_DIR, 'history.json')
}

export const DEFAULT_WEIGHTS = {
  searchDemandFit: 0.22,
  topicRelevance: 0.18,
  commercialIntent: 0.12,
  coverageGap: 0.15,
  sourceCompleteness: 0.20,
  productionEfficiency: 0.05,
  competitionHeadroom: 0.08
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '')
  return JSON.parse(raw)
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function normalizeKeyword(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function normalizeUrl(value) {
  if (!value) return '/'
  let trimmed = String(value).trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      trimmed = new URL(trimmed).pathname
    } catch {
      // keep raw value if URL parsing fails
    }
  }
  if (!trimmed.startsWith('/')) trimmed = `/${trimmed}`
  if (trimmed !== '/' && !trimmed.endsWith('/')) trimmed = `${trimmed}/`
  return trimmed
}

function clamp100(num) {
  const n = Number(num)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, n))
}

function round2(num) {
  return Math.round(num * 100) / 100
}

/**
 * Extracts static route literals declared in data/navigation.ts so we can
 * verify 100% route-to-keyword coverage without needing a TS compiler runtime.
 */
function extractStaticRoutesFromNavigation() {
  if (!fs.existsSync(NAV_FILE)) return []
  const content = fs.readFileSync(NAV_FILE, 'utf8')
  const matches = content.match(/link:\s*'([^']+)'/g) || []
  const routes = new Set(['/'])
  for (const m of matches) {
    const route = m.replace(/^link:\s*'/, '').replace(/'$/, '')
    routes.add(normalizeUrl(route))
  }
  return Array.from(routes)
}

/**
 * Parses CSV text cleanly with support for quoted commas, escaped quotes, and UTF-8 BOM.
 */
function parseCsv(text) {
  const clean = text.replace(/^\uFEFF/, '')
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < clean.length; i += 1) {
    const ch = clean[i]
    const next = clean[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i += 1
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
      continue
    }

    if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(cell.trim())
      cell = ''
    } else if (ch === '\r' && next === '\n') {
      row.push(cell.trim())
      if (row.some((v) => v !== '')) rows.push(row)
      row = []
      cell = ''
      i += 1
    } else if (ch === '\n' || ch === '\r') {
      row.push(cell.trim())
      if (row.some((v) => v !== '')) rows.push(row)
      row = []
      cell = ''
    } else {
      cell += ch
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim())
    if (row.some((v) => v !== '')) rows.push(row)
  }

  if (rows.length < 2) return []
  const headers = rows[0].map((h) => h.trim())
  return rows.slice(1).map((values) => {
    const obj = {}
    headers.forEach((h, idx) => {
      obj[h] = values[idx] ?? ''
    })
    return obj
  })
}

function parseMetricNumber(val) {
  if (val === null || val === undefined || val === '') return null
  const str = String(val).replace(/[,%]/g, '').trim()
  if (!str) return null
  const num = Number(str)
  if (!Number.isFinite(num)) return null
  return String(val).includes('%') ? round2(num / 100) : num
}

function pickField(record, candidates) {
  const keys = Object.keys(record)
  for (const candidate of candidates) {
    const found = keys.find((k) => k.trim().toLowerCase() === candidate.toLowerCase())
    if (found !== undefined && record[found] !== '') return record[found]
  }
  return null
}

/**
 * Loads real GSC or Bing Webmaster export files (CSV or JSON).
 */
function loadExternalReport(filePath) {
  const absPath = path.resolve(process.cwd(), filePath)
  if (!fs.existsSync(absPath)) {
    throw new Error(`Import file not found: ${absPath}`)
  }

  const raw = fs.readFileSync(absPath, 'utf8').replace(/^\uFEFF/, '')
  let records
  if (absPath.toLowerCase().endsWith('.json')) {
    const parsed = JSON.parse(raw)
    records = Array.isArray(parsed) ? parsed : Array.isArray(parsed.rows) ? parsed.rows : []
  } else {
    records = parseCsv(raw)
  }

  return records
    .map((rec) => {
      const query = pickField(rec, ['Query', 'Top queries', 'Keyword', 'Queries', '热门查询', '查询', '关键词'])
      const page = pickField(rec, ['Page', 'Top pages', 'URL', 'Landing Page', '网页', '网址'])
      const impressions = parseMetricNumber(pickField(rec, ['Impressions', '展示次数', 'Impr.']))
      const clicks = parseMetricNumber(pickField(rec, ['Clicks', '点击次数']))
      const ctr = parseMetricNumber(pickField(rec, ['CTR', '点击率']))
      const position = parseMetricNumber(pickField(rec, ['Position', 'Avg. Position', 'Average Position', '平均排名', '排名']))

      return {
        query: query ? String(query).trim() : null,
        url: page ? normalizeUrl(page) : null,
        impressions,
        clicks,
        ctr,
        avgPosition: position
      }
    })
    .filter((row) => row.query || row.url)
}

/**
 * Checks keyword-url-map.json, seeds.json, longtails.json, and navigation.ts for collisions and missing links.
 */
function runIntegrityChecks({ urlMapData, seedsData, longtailsData }) {
  const primaryOwners = new Map()
  const urlOwners = new Map()
  const secondaryOwners = new Map()
  const primaryCollisions = []
  const urlCollisions = []
  const secondaryCollisions = []

  for (const entry of urlMapData.mappings || []) {
    const normPk = normalizeKeyword(entry.primaryKeyword)
    const normUrl = normalizeUrl(entry.url)

    if (primaryOwners.has(normPk)) {
      primaryCollisions.push({
        keyword: entry.primaryKeyword,
        urls: [primaryOwners.get(normPk), normUrl]
      })
    } else {
      primaryOwners.set(normPk, normUrl)
    }

    if (urlOwners.has(normUrl)) {
      urlCollisions.push({
        url: normUrl,
        keywords: [urlOwners.get(normUrl), entry.primaryKeyword]
      })
    } else {
      urlOwners.set(normUrl, entry.primaryKeyword)
    }

    for (const sec of entry.secondaryKeywords || []) {
      const normSec = normalizeKeyword(sec)
      if (!secondaryOwners.has(normSec)) secondaryOwners.set(normSec, [])
      secondaryOwners.get(normSec).push(normUrl)
    }
  }

  for (const [normPk, ownerUrl] of primaryOwners.entries()) {
    const secUrls = secondaryOwners.get(normPk) || []
    for (const secUrl of secUrls) {
      if (secUrl !== ownerUrl) {
        secondaryCollisions.push({
          primaryKeyword: normPk,
          primaryUrl: ownerUrl,
          conflictingSecondaryUrl: secUrl
        })
      }
    }
  }

  const missingSeedUrls = []
  for (const seed of seedsData.seeds || []) {
    const normUrl = normalizeUrl(seed.targetUrl)
    if (!urlOwners.has(normUrl)) {
      missingSeedUrls.push({ id: seed.id, keyword: seed.keyword, targetUrl: normUrl })
    }
  }

  const missingLongtailUrls = []
  for (const lt of longtailsData.longtails || []) {
    const normUrl = normalizeUrl(lt.targetUrl)
    if (!urlOwners.has(normUrl)) {
      missingLongtailUrls.push({ id: lt.id, keyword: lt.keyword, targetUrl: normUrl })
    }
  }

  const staticRoutes = extractStaticRoutesFromNavigation()
  const unmappedStaticRoutes = staticRoutes.filter((route) => !urlOwners.has(route))

  return {
    totalMappedUrls: urlOwners.size,
    totalStaticRoutes: staticRoutes.length,
    primaryCollisions,
    urlCollisions,
    secondaryCollisions,
    missingSeedUrls,
    missingLongtailUrls,
    unmappedStaticRoutes,
    hasFatalErrors:
      primaryCollisions.length > 0 ||
      urlCollisions.length > 0 ||
      secondaryCollisions.length > 0 ||
      missingSeedUrls.length > 0 ||
      missingLongtailUrls.length > 0 ||
      unmappedStaticRoutes.length > 0
  }
}

/**
 * Computes transparent weighted score + optional Search Console adjustment (0 when null).
 */
export function scoreRoadmapItem(item, weights = DEFAULT_WEIGHTS) {
  const f = item.factors || {}
  const searchDemandFit = clamp100(f.searchDemandFit)
  const topicRelevance = clamp100(f.topicRelevance)
  const commercialIntent = clamp100(f.commercialIntent)
  const coverageGap = clamp100(f.coverageGap)
  const sourceCompleteness = clamp100(f.sourceCompleteness)
  const productionCost = clamp100(f.productionCost)
  const competitionRisk = clamp100(f.competitionRisk)

  const productionEfficiency = 100 - productionCost
  const competitionHeadroom = 100 - competitionRisk

  const baseBreakdown = {
    searchDemandFit: round2(searchDemandFit * weights.searchDemandFit),
    topicRelevance: round2(topicRelevance * weights.topicRelevance),
    commercialIntent: round2(commercialIntent * weights.commercialIntent),
    coverageGap: round2(coverageGap * weights.coverageGap),
    sourceCompleteness: round2(sourceCompleteness * weights.sourceCompleteness),
    productionEfficiency: round2(productionEfficiency * weights.productionEfficiency),
    competitionHeadroom: round2(competitionHeadroom * weights.competitionHeadroom)
  }

  const baseScore = round2(
    Object.values(baseBreakdown).reduce((acc, v) => acc + v, 0)
  )

  const gscImpr = item.externalMetrics?.gsc?.impressions
  const bingImpr = item.externalMetrics?.bing?.impressions
  const gscPos = item.externalMetrics?.gsc?.avgPosition
  const bingPos = item.externalMetrics?.bing?.avgPosition

  let searchConsoleAdjustment = 0
  if (typeof gscImpr === 'number' || typeof bingImpr === 'number') {
    const combinedImpr = (gscImpr || 0) + (bingImpr || 0)
    const imprBoost = Math.min(5, Math.log10(combinedImpr + 1) * 1.4)
    const activePos = typeof gscPos === 'number' ? gscPos : bingPos
    const positionOpportunity =
      typeof activePos === 'number' && activePos >= 4 && activePos <= 30 ? 3 : 0
    searchConsoleAdjustment = round2(Math.min(8, imprBoost + positionOpportunity))
  }

  const totalScore = round2(Math.min(100, baseScore + searchConsoleAdjustment))

  let priorityTier = 'P3'
  if (totalScore >= 78) priorityTier = 'P0'
  else if (totalScore >= 66) priorityTier = 'P1'
  else if (totalScore >= 54) priorityTier = 'P2'

  return {
    baseScore,
    searchConsoleAdjustment,
    totalScore,
    priorityTier,
    scoreBreakdown: {
      ...baseBreakdown,
      searchConsoleAdjustment
    }
  }
}

function mergeExternalMetrics(items, urlMapByUrl, rows, sourceKey, importedAt) {
  const itemByUrl = new Map(items.map((item) => [normalizeUrl(item.url), item]))
  const itemByKeyword = new Map()
  for (const item of items) {
    itemByKeyword.set(normalizeKeyword(item.primaryKeyword), item)
    const mapped = urlMapByUrl.get(normalizeUrl(item.url))
    for (const sec of mapped?.secondaryKeywords || []) {
      if (!itemByKeyword.has(normalizeKeyword(sec))) {
        itemByKeyword.set(normalizeKeyword(sec), item)
      }
    }
  }

  let matchedCount = 0
  const unmatched = []

  for (const row of rows) {
    const target =
      (row.query && itemByKeyword.get(normalizeKeyword(row.query))) ||
      (row.url && itemByUrl.get(normalizeUrl(row.url)))

    if (!target) {
      unmatched.push({ source: sourceKey, ...row })
      continue
    }

    matchedCount += 1
    if (!target.externalMetrics) {
      target.externalMetrics = {
        gsc: { impressions: null, clicks: null, ctr: null, avgPosition: null, lastImportedAt: null },
        bing: { impressions: null, clicks: null, avgPosition: null, lastImportedAt: null }
      }
    }

    const prev = target.externalMetrics[sourceKey] || {}
    target.externalMetrics[sourceKey] = {
      impressions:
        typeof row.impressions === 'number'
          ? (prev.impressions || 0) + row.impressions
          : prev.impressions ?? null,
      clicks:
        typeof row.clicks === 'number'
          ? (prev.clicks || 0) + row.clicks
          : prev.clicks ?? null,
      ...(sourceKey === 'gsc'
        ? { ctr: row.ctr ?? prev.ctr ?? null }
        : {}),
      avgPosition: row.avgPosition ?? prev.avgPosition ?? null,
      lastImportedAt: importedAt
    }
  }

  return { matchedCount, unmatched }
}

function parseArgs(argv) {
  const args = {
    importGsc: null,
    importBing: null,
    dryRun: false,
    strict: false,
    json: false,
    recordHistory: false,
    pillar: null,
    limit: 20
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--import-gsc' && argv[i + 1]) args.importGsc = argv[++i]
    else if (arg === '--import-bing' && argv[i + 1]) args.importBing = argv[++i]
    else if (arg === '--dry-run') args.dryRun = true
    else if (arg === '--strict') args.strict = true
    else if (arg === '--json') args.json = true
    else if (arg === '--record-history') args.recordHistory = true
    else if (arg === '--pillar' && argv[i + 1]) args.pillar = argv[++i]
    else if (arg === '--limit' && argv[i + 1]) args.limit = Number(argv[++i]) || 20
  }
  return args
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const seedsData = readJson(PATHS.seeds)
  const longtailsData = readJson(PATHS.longtails)
  const urlMapData = readJson(PATHS.urlMap)
  const roadmapData = readJson(PATHS.roadmap)
  const historyData = fs.existsSync(PATHS.history)
    ? readJson(PATHS.history)
    : { schemaVersion: '1.0.0', runs: [] }

  const checks = runIntegrityChecks({ urlMapData, seedsData, longtailsData })
  const urlMapByUrl = new Map(
    (urlMapData.mappings || []).map((m) => [normalizeUrl(m.url), m])
  )

  const weights = roadmapData.scoringModel?.weights || DEFAULT_WEIGHTS
  const nowIso = new Date().toISOString()
  const items = (roadmapData.items || []).map((item) => {
    const mapped = urlMapByUrl.get(normalizeUrl(item.url))
    return {
      ...item,
      url: normalizeUrl(item.url),
      primaryKeyword: mapped ? mapped.primaryKeyword : item.primaryKeyword,
      pillar: mapped ? mapped.pillar : item.pillar,
      intent: mapped ? mapped.intent : item.intent
    }
  })

  const importSummary = []
  let unmatchedExternalQueries = roadmapData.unmatchedExternalQueries || []

  if (args.importGsc) {
    const gscRows = loadExternalReport(args.importGsc)
    const res = mergeExternalMetrics(items, urlMapByUrl, gscRows, 'gsc', nowIso)
    importSummary.push({ source: 'gsc', file: args.importGsc, totalRows: gscRows.length, matchedCount: res.matchedCount, unmatchedCount: res.unmatched.length })
    unmatchedExternalQueries = res.unmatched.slice(0, 50)
  }

  if (args.importBing) {
    const bingRows = loadExternalReport(args.importBing)
    const res = mergeExternalMetrics(items, urlMapByUrl, bingRows, 'bing', nowIso)
    importSummary.push({ source: 'bing', file: args.importBing, totalRows: bingRows.length, matchedCount: res.matchedCount, unmatchedCount: res.unmatched.length })
    unmatchedExternalQueries = [...unmatchedExternalQueries, ...res.unmatched].slice(0, 50)
  }

  const scoredItems = items.map((item) => {
    const scored = scoreRoadmapItem(item, weights)
    return {
      ...item,
      totalScore: scored.totalScore,
      priorityTier: scored.priorityTier,
      scoreBreakdown: scored.scoreBreakdown
    }
  })

  scoredItems.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore
    return a.url.localeCompare(b.url)
  })

  scoredItems.forEach((item, index) => {
    item.priorityRank = index + 1
  })

  const tierCounts = scoredItems.reduce((acc, item) => {
    acc[item.priorityTier] = (acc[item.priorityTier] || 0) + 1
    return acc
  }, {})

  const updatedRoadmap = {
    ...roadmapData,
    updatedAt: nowIso.slice(0, 10),
    lastScoredAt: nowIso,
    summary: {
      totalItems: scoredItems.length,
      tierCounts,
      gscImported: scoredItems.some((i) => i.externalMetrics?.gsc?.impressions !== null),
      bingImported: scoredItems.some((i) => i.externalMetrics?.bing?.impressions !== null),
      pendingVerificationCount: scoredItems.filter((i) => (i.pendingVerification || []).length > 0).length
    },
    unmatchedExternalQueries,
    items: scoredItems
  }

  if (!args.dryRun) {
    writeJson(PATHS.roadmap, updatedRoadmap)

    if (importSummary.length > 0 || args.recordHistory) {
      historyData.runs = historyData.runs || []
      historyData.runs.push({
        runId: `run-${nowIso}`,
        timestamp: nowIso,
        action: importSummary.length > 0 ? 'import-and-rescore' : 'rescore',
        totalMappedUrls: checks.totalMappedUrls,
        totalScoredItems: scoredItems.length,
        tierCounts,
        imports: importSummary,
        collisionsDetected: checks.primaryCollisions.length + checks.urlCollisions.length + checks.secondaryCollisions.length
      })
      writeJson(PATHS.history, historyData)
    }
  }

  const filtered = args.pillar
    ? scoredItems.filter((item) => item.pillar === args.pillar)
    : scoredItems

  if (args.json) {
    console.log(JSON.stringify({ checks, summary: updatedRoadmap.summary, topItems: filtered.slice(0, args.limit) }, null, 2))
  } else {
    console.log('=== aijiesuo.biz Keyword Discovery & Scoring Report ===')
    console.log(`Mapped URLs: ${checks.totalMappedUrls} | Static Routes in navigation.ts: ${checks.totalStaticRoutes}`)
    console.log(`Primary collisions: ${checks.primaryCollisions.length} | URL collisions: ${checks.urlCollisions.length} | Secondary collisions: ${checks.secondaryCollisions.length}`)
    console.log(`Unmapped static routes: ${checks.unmappedStaticRoutes.length} | Missing seed URLs: ${checks.missingSeedUrls.length} | Missing longtail URLs: ${checks.missingLongtailUrls.length}`)
    console.log(`Roadmap items scored: ${scoredItems.length} | Tiers: ${JSON.stringify(tierCounts)}`)
    console.log(`GSC imported: ${updatedRoadmap.summary.gscImported} | Bing imported: ${updatedRoadmap.summary.bingImported}`)
    if (importSummary.length > 0) {
      console.log('Imports:', JSON.stringify(importSummary))
    }
    if (checks.hasFatalErrors) {
      console.log('\n[COLLISION / INTEGRITY WARNINGS]')
      if (checks.primaryCollisions.length) console.log('Primary Collisions:', checks.primaryCollisions)
      if (checks.urlCollisions.length) console.log('URL Collisions:', checks.urlCollisions)
      if (checks.secondaryCollisions.length) console.log('Secondary Collisions:', checks.secondaryCollisions)
      if (checks.unmappedStaticRoutes.length) console.log('Unmapped Static Routes:', checks.unmappedStaticRoutes)
      if (checks.missingSeedUrls.length) console.log('Missing Seed URLs:', checks.missingSeedUrls)
      if (checks.missingLongtailUrls.length) console.log('Missing Longtail URLs:', checks.missingLongtailUrls)
    }

    console.log(`\nTop ${Math.min(args.limit, filtered.length)} Ranked Pages${args.pillar ? ` (pillar=${args.pillar})` : ''}:`)
    for (const item of filtered.slice(0, args.limit)) {
      const pendingTag = item.pendingVerification?.length ? ` [待核实:${item.pendingVerification.length}]` : ''
      console.log(
        `#${String(item.priorityRank).padStart(3, '0')} [${item.priorityTier}] ${item.totalScore.toFixed(2)} | ${item.url} -> "${item.primaryKeyword}" (${item.dataStatus})${pendingTag}`
      )
    }
  }

  if (args.strict && checks.hasFatalErrors) {
    process.exitCode = 1
  }
}

main()
