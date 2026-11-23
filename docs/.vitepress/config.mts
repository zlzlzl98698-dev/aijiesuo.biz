import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type DefaultTheme, type HeadConfig } from 'vitepress'
import { ALL_BRANDS, getBrandBySlug } from '../../data/links'
import clientsData from '../../data/clients.json'
import type { BrandRecord, ClientAppRecord, ClientsDatabase } from '../../data/types'
import {
  buildVitePressNav,
  buildVitePressSidebar,
  getBreadcrumbsForPath,
  type NavSubItem,
} from '../../data/navigation'

const SITE_URL = 'https://aijiesuo.biz'
const SITE_NAME = 'AI解锁'
const SITE_DESC =
  'AI 服务访问、网络代理客户端配置、故障排查与机场品牌实测研究知识库'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-cover.png`

const NOINDEX_BRAND_SLUGS = new Set(
  ALL_BRANDS.filter((b) => b.isHistoricalOnly || b.plans.length === 0).map((b) => b.slug)
)

const NOINDEX_ROUTES = new Set<string>(
  Array.from(NOINDEX_BRAND_SLUGS).flatMap((slug) => [`/brands/${slug}/`, `/reviews/${slug}/`])
)

const FAVICON_SVG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
      '<rect width="32" height="32" rx="7" fill="#0f2544"/>' +
      '<path d="M9 22L16 8l7 14h-3.2l-1.4-3h-4.8l-1.4 3H9zm5.7-5.6h2.6L16 13.4l-1.3 3z" fill="#38bdf8"/>' +
      '<circle cx="24" cy="9" r="2.5" fill="#0e7490"/>' +
      '</svg>'
  )

const CLIENTS_DB = clientsData as ClientsDatabase

const INDEXABLE_BRANDS = ALL_BRANDS.filter((b) => !NOINDEX_BRAND_SLUGS.has(b.slug))

const brandSidebarItems: NavSubItem[] = INDEXABLE_BRANDS.map((brand) => ({
  text: brand.commercialRank
    ? `${brand.name} (#${brand.commercialRank})`
    : brand.name,
  link: `/brands/${brand.slug}/`,
  description: brand.positioning,
}))

const reviewSidebarItems: NavSubItem[] = INDEXABLE_BRANDS.map((brand) => ({
  text: `${brand.name} 评测`,
  link: `/reviews/${brand.slug}/`,
  description: `实测状态与风险核查 (${brand.researchScore}/100)`,
}))

function tokenizeCjkAndLatin(text: string): string[] {
  const lower = text.toLowerCase()
  const tokens: string[] = []
  const latinMatches = lower.match(/[a-z0-9_.-]+/g)
  if (latinMatches) {
    tokens.push(...latinMatches)
  }
  const cjkRuns = lower.match(/[\u4e00-\u9fff]+/g)
  if (cjkRuns) {
    for (const run of cjkRuns) {
      for (let i = 0; i < run.length; i += 1) {
        tokens.push(run[i])
        if (i + 1 < run.length) {
          tokens.push(run.slice(i, i + 2))
        }
      }
    }
  }
  return tokens
}

function buildSearchConfig(): DefaultTheme.Config['search'] {
  const algoliaAppId = process.env.VITE_ALGOLIA_APP_ID
  const algoliaApiKey = process.env.VITE_ALGOLIA_API_KEY
  const algoliaIndexName = process.env.VITE_ALGOLIA_INDEX_NAME

  if (algoliaAppId && algoliaApiKey && algoliaIndexName) {
    return {
      provider: 'algolia',
      options: {
        appId: algoliaAppId,
        apiKey: algoliaApiKey,
        indexName: algoliaIndexName,
        placeholder: '搜索 AI 访问、客户端、错误码或机场品牌',
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            searchBox: {
              resetButtonTitle: '清空查询',
              resetButtonAriaLabel: '清空查询',
              cancelButtonText: '取消',
              cancelButtonAriaLabel: '取消',
            },
            startScreen: {
              recentSearchesTitle: '最近搜索',
              noRecentSearchesText: '暂无最近搜索记录',
              saveRecentSearchButtonTitle: '保存本次搜索',
              removeRecentSearchButtonTitle: '删除此记录',
              favoriteSearchesTitle: '收藏',
              removeFavoriteSearchButtonTitle: '取消收藏',
            },
            errorScreen: {
              titleText: '无法获取搜索结果',
              helpText: '请检查网络连接后重试',
            },
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              searchByText: '搜索技术支持：',
            },
            noResultsScreen: {
              noResultsText: '未找到相关文档',
              suggestedQueryText: '尝试搜索其他关键词',
              reportMissingResultsText: '认为缺少该条目？',
              reportMissingResultsLinkText: '反馈建议',
            },
          },
        },
      },
    }
  }

  return {
    provider: 'local',
    options: {
      detailedView: true,
      translations: {
        button: {
          buttonText: '搜索知识库',
          buttonAriaLabel: '搜索知识库',
        },
        modal: {
          displayDetails: '显示详细上下文',
          resetButtonTitle: '清空搜索条件',
          backButtonTitle: '返回',
          noResultsText: '未找到匹配的文档或品牌条目',
          footer: {
            selectText: '进入',
            selectKeyAriaLabel: '回车确认',
            navigateText: '上下选择',
            navigateUpKeyAriaLabel: '上一条',
            navigateDownKeyAriaLabel: '下一条',
            closeText: '关闭',
            closeKeyAriaLabel: 'Esc 关闭',
          },
        },
      },
      miniSearch: {
        options: {
          tokenize: tokenizeCjkAndLatin,
          processTerm: (term: string) => term.toLowerCase(),
        },
        searchOptions: {
          fuzzy: 0.15,
          prefix: true,
          boost: {
            title: 4,
            text: 2,
            titles: 3,
          },
        },
      },
    },
  }
}

function relativePathToRoute(relativePath: string): string {
  const posix = relativePath.split('\\').join('/')
  if (posix === 'index.md') return '/'
  if (posix.endsWith('/index.md')) {
    return `/${posix.slice(0, -'index.md'.length)}`
  }
  return `/${posix.replace(/\.md$/, '.html')}`
}

function encodeRouteUrl(routePath: string): string {
  const encodedPath = routePath
    .split('/')
    .map((seg) => (seg ? encodeURIComponent(seg) : ''))
    .join('/')
  return `${SITE_URL}${encodedPath}`
}

const CLIENT_PAGE_METADATA: Record<
  string,
  { name: string; os: string[]; slugs: string[] }
> = {
  'clash-verge-rev': {
    name: 'Clash Verge Rev',
    os: ['Windows', 'macOS', 'Linux'],
    slugs: ['clash-verge-rev'],
  },
  'clash-meta': {
    name: 'Clash Meta for Android',
    os: ['Android'],
    slugs: ['clash-meta-for-android'],
  },
  mihomo: {
    name: 'Mihomo 内核',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'OpenWrt'],
    slugs: ['clash-verge-rev', 'flclash', 'openclash', 'nikki'],
  },
  v2rayn: {
    name: 'v2rayN',
    os: ['Windows', 'macOS', 'Linux'],
    slugs: ['v2rayn'],
  },
  'sing-box': {
    name: 'sing-box',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    slugs: ['sing-box-for-android', 'sing-box-ios', 'sing-box-macos', 'sing-box-desktop'],
  },
  flclash: {
    name: 'FlClash',
    os: ['Windows', 'macOS', 'Linux', 'Android'],
    slugs: ['flclash'],
  },
  hiddify: {
    name: 'Hiddify',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    slugs: ['hiddify'],
  },
  karing: {
    name: 'Karing',
    os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    slugs: ['karing'],
  },
  'clash-nyanpasu': {
    name: 'Clash Nyanpasu',
    os: ['Windows', 'macOS', 'Linux'],
    slugs: ['clash-nyanpasu'],
  },
  shadowrocket: {
    name: 'Shadowrocket (小火箭)',
    os: ['iOS', 'iPadOS'],
    slugs: ['shadowrocket'],
  },
  v2rayng: {
    name: 'v2rayNG',
    os: ['Android'],
    slugs: ['v2rayng'],
  },
  nekobox: {
    name: 'NekoBox for Android',
    os: ['Android'],
    slugs: ['nekobox-for-android'],
  },
  stash: {
    name: 'Stash',
    os: ['iOS', 'iPadOS', 'macOS'],
    slugs: ['stash'],
  },
  'quantumult-x': {
    name: 'Quantumult X (圈 X)',
    os: ['iOS', 'iPadOS'],
    slugs: ['quantumult-x'],
  },
  surge: {
    name: 'Surge',
    os: ['iOS', 'iPadOS', 'macOS'],
    slugs: ['surge-5', 'surge-mac'],
  },
  openclash: {
    name: 'OpenClash',
    os: ['OpenWrt', 'Linux'],
    slugs: ['openclash'],
  },
  passwall2: {
    name: 'PassWall2',
    os: ['OpenWrt', 'Linux'],
    slugs: ['passwall2'],
  },
  nikki: {
    name: 'Nikki',
    os: ['OpenWrt 24.10+', 'Linux'],
    slugs: ['nikki'],
  },
}

function findClientRecordsForSlugs(slugs: string[]): ClientAppRecord[] {
  const allApps = Object.values(CLIENTS_DB.platforms).flat()
  return allApps.filter((app) => slugs.includes(app.slug))
}

function buildProductJsonLd(brand: BrandRecord, pageUrl: string): Record<string, unknown> | null {
  const pricedPlans = brand.plans.filter(
    (plan) => typeof plan.priceCny === 'number' && Number.isFinite(plan.priceCny) && plan.priceCny > 0
  )
  if (pricedPlans.length === 0) {
    return null
  }

  const prices = pricedPlans.map((p) => p.priceCny as number)
  const lowPrice = Math.min(...prices)
  const highPrice = Math.max(...prices)

  const offers: Record<string, unknown> =
    pricedPlans.length === 1
      ? {
          '@type': 'Offer',
          priceCurrency: 'CNY',
          price: String(lowPrice),
          availability: 'https://schema.org/InStock',
          url: pageUrl,
          itemOffered: {
            '@type': 'Service',
            name: pricedPlans[0].name,
          },
        }
      : {
          '@type': 'AggregateOffer',
          priceCurrency: 'CNY',
          lowPrice: String(lowPrice),
          highPrice: String(highPrice),
          offerCount: pricedPlans.length,
          offers: pricedPlans.map((plan) => ({
            '@type': 'Offer',
            name: `${plan.name} (${plan.billingLabel})`,
            priceCurrency: 'CNY',
            price: String(plan.priceCny),
            availability: 'https://schema.org/InStock',
            url: pageUrl,
          })),
        }

  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${brand.name} 网络代理服务`,
    description: brand.positioning,
    brand: {
      '@type': 'Brand',
      name: brand.name,
    },
    url: pageUrl,
    offers,
  }

  if (brand.logo) {
    productSchema.image = `${SITE_URL}${encodeURI(brand.logo)}`
  }

  return productSchema
}

function buildSoftwareAppJsonLd(
  appSlug: string,
  pageUrl: string,
  description: string
): Record<string, unknown> | null {
  const meta = CLIENT_PAGE_METADATA[appSlug]
  if (!meta) return null

  const records = findClientRecordsForSlugs(meta.slugs)
  const isFreeOpenSource = records.some((r) => r.pricingType === 'free_open_source')

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: meta.name,
    applicationCategory: 'NetworkingApplication',
    operatingSystem: meta.os.join(', '),
    description,
    url: pageUrl,
  }

  if (isFreeOpenSource) {
    schema.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    }
  }

  return schema
}

interface ExtractedFaq {
  question: string
  answer: string
}

function stripMarkdownToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^>\s*/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractVisibleFaqsFromMarkdown(relativePath: string): ExtractedFaq[] {
  try {
    const absPath = path.resolve(process.cwd(), 'docs', relativePath)
    if (!fs.existsSync(absPath)) return []
    const raw = fs.readFileSync(absPath, 'utf8').replace(/\r\n/g, '\n')
    const endFm = raw.indexOf('\n---', 4)
    const body = endFm > 0 ? raw.slice(endFm + 4) : raw

    const headingMatch = body.match(/^##\s+.*常见问题[^\n]*\n/m)
    if (!headingMatch || headingMatch.index === undefined) return []

    const afterHeading = body.slice(headingMatch.index + headingMatch[0].length)
    const nextSectionIdx = afterHeading.search(/\n##\s+|\n---\s*(\n|$)/)
    const faqSection =
      nextSectionIdx === -1 ? afterHeading : afterHeading.slice(0, nextSectionIdx)
    const parts = faqSection.split(/^###\s+/m).slice(1)
    const faqs: ExtractedFaq[] = []

    for (const part of parts) {
      const nlIdx = part.indexOf('\n')
      if (nlIdx === -1) continue
      const question = stripMarkdownToText(part.slice(0, nlIdx)).replace(/^\d+[.、]\s*/, '')
      const answer = stripMarkdownToText(part.slice(nlIdx + 1))
      if (question.length >= 4 && answer.length >= 12) {
        faqs.push({
          question,
          answer: answer.length > 500 ? `${answer.slice(0, 497)}...` : answer,
        })
      }
    }
    return faqs
  } catch {
    return []
  }
}

function buildVerificationHeadMeta(): HeadConfig[] {
  const tags: HeadConfig[] = []
  const map: Array<[string, string]> = [
    ['VITE_VERIFY_GOOGLE', 'google-site-verification'],
    ['VITE_VERIFY_BING', 'msvalidate.01'],
    ['VITE_VERIFY_SHENMA', 'shenma-site-verification'],
    ['VITE_VERIFY_BAIDU', 'baidu-site-verification'],
  ]
  for (const [envKey, metaName] of map) {
    const val = process.env[envKey]?.trim()
    if (val) {
      tags.push(['meta', { name: metaName, content: val }])
    }
  }
  return tags
}

const HUB_COLLECTION_ROUTES = new Set([
  '/airport/',
  '/pricing/',
  '/brands/',
  '/reviews/',
  '/compare/',
  '/vpn/',
  '/clients/',
  '/ai/',
  '/network/',
  '/tutorials/',
  '/troubleshooting/',
  '/risk/',
])

function extractVisibleHowToSteps(relativePath: string): Array<{ name: string; text: string }> {
  try {
    const absPath = path.resolve(process.cwd(), 'docs', relativePath)
    if (!fs.existsSync(absPath)) return []
    const raw = fs.readFileSync(absPath, 'utf8').replace(/\r\n/g, '\n')
    const endFm = raw.indexOf('\n---', 4)
    const body = endFm > 0 ? raw.slice(endFm + 4) : raw
    const noFences = body.replace(/```[\s\S]*?```/g, '')

    const steps: Array<{ name: string; text: string }> = []
    for (const m of noFences.matchAll(/^###\s+(?:第\s*[一二三四五六七八九十\d]+\s*步[：: ]*|步骤\s*\d+[：: ]*|\d+[.、]\s*)([^\n]+)\n([\s\S]*?)(?=\n###\s+|\n##\s+|$)/gm)) {
      const name = stripMarkdownToText(m[1])
      const text = stripMarkdownToText(m[2])
      if (name.length >= 2 && text.length >= 10) {
        steps.push({ name, text: text.length > 350 ? `${text.slice(0, 347)}...` : text })
      }
    }
    if (steps.length >= 3) return steps.slice(0, 10)

    const listSteps: Array<{ name: string; text: string }> = []
    for (const m of noFences.matchAll(/^\d+\.\s+\*\*([^*]+)\*\*[：:]?\s*([^\n]+)/gm)) {
      const name = stripMarkdownToText(m[1])
      const text = stripMarkdownToText(m[2])
      if (name.length >= 2 && text.length >= 8) {
        listSteps.push({ name, text })
      }
    }
    return listSteps.length >= 3 ? listSteps.slice(0, 10) : []
  } catch {
    return []
  }
}

export default defineConfig({
  lang: 'zh-CN',
  title: SITE_NAME,
  titleTemplate: ':title | AI解锁 aijiesuo.biz',
  description: SITE_DESC,
  appearance: false,
  lastUpdated: true,
  cleanUrls: false,
  vite: {
    build: {
      chunkSizeWarningLimit: 1500,
    },
  },
  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      return items.filter((item) => {
        if (item.url === '404.html' || item.url.endsWith('/404.html')) {
          return false
        }
        const cleanPath = item.url.startsWith('/') ? item.url : `/${item.url}`
        const normalized = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`
        return !NOINDEX_ROUTES.has(normalized)
      })
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/webp', href: '/images/site-avatar.webp' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/site-avatar.webp' }],
    ['meta', { name: 'theme-color', content: '#0f2544' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ...buildVerificationHeadMeta(),
  ],
  themeConfig: {
    logo: '/images/site-avatar.webp',
    siteTitle: SITE_NAME,
    nav: buildVitePressNav(),
    sidebar: buildVitePressSidebar(brandSidebarItems, reviewSidebarItems),
    search: buildSearchConfig(),
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '最后更新',
    },
    sidebarMenuLabel: '栏目导航',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
  },
  transformPageData(pageData) {
    if (pageData.isNotFound || pageData.relativePath.toLowerCase() === '404.md') {
      return
    }

    const routePath = relativePathToRoute(pageData.relativePath)
    const canonicalUrl = encodeRouteUrl(routePath)
    const rawTitle =
      typeof pageData.frontmatter.title === 'string' && pageData.frontmatter.title.trim()
        ? pageData.frontmatter.title.trim()
        : pageData.title || SITE_NAME
    const rawDesc =
      typeof pageData.frontmatter.description === 'string' &&
      pageData.frontmatter.description.trim()
        ? pageData.frontmatter.description.trim()
        : pageData.description || SITE_DESC

    const updatedIso =
      typeof pageData.frontmatter.updated === 'string' && pageData.frontmatter.updated.trim()
        ? pageData.frontmatter.updated.trim().slice(0, 10)
        : pageData.frontmatter.updated instanceof Date
          ? pageData.frontmatter.updated.toISOString().slice(0, 10)
          : pageData.lastUpdated
            ? new Date(pageData.lastUpdated).toISOString().slice(0, 10)
            : '2026-11-23'

    const publishedIso =
      typeof pageData.frontmatter.date === 'string' && pageData.frontmatter.date.trim()
        ? pageData.frontmatter.date.trim().slice(0, 10)
        : pageData.frontmatter.date instanceof Date
          ? pageData.frontmatter.date.toISOString().slice(0, 10)
          : updatedIso

    const authorName =
      typeof pageData.frontmatter.author === 'string' && pageData.frontmatter.author.trim()
        ? pageData.frontmatter.author.trim()
        : 'AI解锁技术编辑部'

    const head: HeadConfig[] = Array.isArray(pageData.frontmatter.head)
      ? [...pageData.frontmatter.head]
      : []

    const isNoindex = NOINDEX_ROUTES.has(routePath)
    let ogImageUrl = DEFAULT_OG_IMAGE
    const brandRouteMatch = routePath.match(/^\/(?:brands|reviews)\/([^/]+)\/$/)
    if (brandRouteMatch) {
      const matchedBrand = getBrandBySlug(brandRouteMatch[1])
      if (matchedBrand?.logo) {
        ogImageUrl = `${SITE_URL}${encodeURI(matchedBrand.logo)}`
      }
    }

    const categoryName =
      typeof pageData.frontmatter.category === 'string' && pageData.frontmatter.category.trim()
        ? pageData.frontmatter.category.trim()
        : undefined

    const tagList = Array.isArray(pageData.frontmatter.tags)
      ? pageData.frontmatter.tags.map((t) => String(t).trim()).filter(Boolean)
      : []

    head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { name: 'robots', content: isNoindex ? 'noindex, follow' : 'index, follow' }],
      ['meta', { property: 'og:type', content: routePath === '/' ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: `${SITE_NAME} (aijiesuo.biz)` }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:title', content: rawTitle }],
      ['meta', { property: 'og:description', content: rawDesc }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: ogImageUrl }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: rawTitle }],
      ['meta', { name: 'twitter:description', content: rawDesc }],
      ['meta', { name: 'twitter:image', content: ogImageUrl }]
    )

    if (routePath !== '/') {
      head.push(
        ['meta', { property: 'article:published_time', content: `${publishedIso}T00:00:00+08:00` }],
        ['meta', { property: 'article:modified_time', content: `${updatedIso}T00:00:00+08:00` }],
        ['meta', { property: 'article:author', content: authorName }]
      )
      if (categoryName) {
        head.push(['meta', { property: 'article:section', content: categoryName }])
      }
      for (const tag of tagList.slice(0, 6)) {
        head.push(['meta', { property: 'article:tag', content: tag }])
      }
    }

    const schemas: Record<string, unknown>[] = []

    const orgSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: `${SITE_NAME} (aijiesuo.biz)`,
      url: SITE_URL,
      logo: `${SITE_URL}/images/site-avatar.webp`,
      description: SITE_DESC,
    }
    schemas.push(orgSchema)

    if (routePath === '/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'zh-CN',
        description: SITE_DESC,
      })
    } else {
      const breadcrumbs = getBreadcrumbsForPath(routePath, rawTitle)
      if (breadcrumbs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: crumb.text,
            item: encodeRouteUrl(crumb.link),
          })),
        })
      }

      const articleSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: rawTitle,
        description: rawDesc,
        image: ogImageUrl,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
        mainEntityOfPage: canonicalUrl,
        datePublished: publishedIso,
        dateModified: updatedIso,
        author: {
          '@type': 'Organization',
          name: authorName,
          url: `${SITE_URL}/about/`,
        },
        publisher: {
          '@type': 'Organization',
          name: `${SITE_NAME} (aijiesuo.biz)`,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/site-avatar.webp`,
          },
        },
      }
      schemas.push(articleSchema)
    }

    if (routePath === '/brands/' || routePath === '/reviews/') {
      const isReviewHub = routePath === '/reviews/'
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: isReviewHub ? '机场实测评测报告汇总' : '机场品牌档案库',
        numberOfItems: ALL_BRANDS.length,
        itemListElement: ALL_BRANDS.map((brand, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: isReviewHub ? `${brand.name} 实测评测` : brand.name,
          url: encodeRouteUrl(
            isReviewHub ? `/reviews/${brand.slug}/` : `/brands/${brand.slug}/`
          ),
        })),
      })
    }

    if (HUB_COLLECTION_ROUTES.has(routePath)) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: rawTitle,
        description: rawDesc,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
      })
    }

    const brandMatch = routePath.match(/^\/brands\/([^/]+)\/$/)
    if (brandMatch) {
      const brand = getBrandBySlug(brandMatch[1])
      if (brand) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: rawTitle,
          description: rawDesc,
          url: canonicalUrl,
          inLanguage: 'zh-CN',
        })
        const productSchema = buildProductJsonLd(brand, canonicalUrl)
        if (productSchema) {
          schemas.push(productSchema)
        }
      }
    }

    const clientMatch = routePath.match(/^\/clients\/([^/]+)\/$/)
    if (clientMatch && CLIENT_PAGE_METADATA[clientMatch[1]]) {
      const appSchema = buildSoftwareAppJsonLd(clientMatch[1], canonicalUrl, rawDesc)
      if (appSchema) {
        schemas.push(appSchema)
      }
    }

    if (!isNoindex) {
      if (
        (routePath.startsWith('/tutorials/') || routePath.startsWith('/troubleshooting/')) &&
        routePath !== '/tutorials/' &&
        routePath !== '/troubleshooting/'
      ) {
        const howToSteps = extractVisibleHowToSteps(pageData.relativePath)
        if (howToSteps.length >= 3) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: rawTitle,
            description: rawDesc,
            step: howToSteps.map((st, idx) => ({
              '@type': 'HowToStep',
              position: idx + 1,
              name: st.name,
              text: st.text,
            })),
          })
        }
      }
      const visibleFaqs = extractVisibleFaqsFromMarkdown(pageData.relativePath)
      if (visibleFaqs.length >= 2) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: visibleFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        })
      }

      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(schemas),
      ])
    }

    pageData.frontmatter.head = head
  },
})
