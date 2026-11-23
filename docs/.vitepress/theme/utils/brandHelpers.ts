import { PILLAR_TAXONOMY } from '../../../../data/navigation'
import { ALL_BRANDS, BRAND_MAP } from '../../../../data/links'
import type {
  AffiliateLinkStatus,
  BillingCycle,
  BrandRecord,
  ClientAppRecord,
  ClientMode,
  ClientPlatform,
  DataStatus,
  PlanItem,
  UnlockStatus,
} from '../../../../data/types'

export interface StatusMeta {
  label: string
  pillText: string
  tone: 'operational' | 'stable' | 'partial' | 'unavailable' | 'untested' | 'vendor' | 'historical'
}

export const UNLOCK_STATUS_META: Record<UnlockStatus, StatusMeta> = {
  verified: {
    label: '已实测解锁',
    pillText: 'Verified',
    tone: 'operational',
  },
  vendor_claimed: {
    label: '厂商自述支持',
    pillText: 'Vendor Claimed',
    tone: 'vendor',
  },
  conditional: {
    label: '部分节点/有条件支持',
    pillText: 'Partial',
    tone: 'partial',
  },
  historical: {
    label: '历史资料参考',
    pillText: 'Historical',
    tone: 'historical',
  },
  untested: {
    label: '暂未实测',
    pillText: 'Not Tested',
    tone: 'untested',
  },
  unavailable: {
    label: '不支持 / 不可用',
    pillText: 'Unavailable',
    tone: 'unavailable',
  },
}

export const DATA_STATUS_META: Record<DataStatus, { label: string; tag: string; tone: string }> = {
  measured: { label: '实测截图来源', tag: 'Measured', tone: 'operational' },
  vendor: { label: '品牌公开资料', tag: 'Vendor Claimed', tone: 'vendor' },
  commercial: { label: '商业/促销记录', tag: 'Commercial', tone: 'partial' },
  editorial: { label: '编辑整理核对', tag: 'Stable', tone: 'stable' },
  unverified: { label: '待核实 / 历史存档', tag: 'Historical', tone: 'historical' },
}

export const CLIENT_MODE_LABELS: Record<ClientMode, string> = {
  proprietary_plus_third_party: '自研客户端 + 支持第三方订阅',
  proprietary_only: '仅支持官方自研客户端（不提供通用订阅）',
  third_party_supported: '支持第三方通用客户端导入',
  unverified: '客户端模式待核实',
}

export const LINK_STATUS_META: Record<AffiliateLinkStatus, { label: string; tone: string }> = {
  active: { label: '链接可用', tone: 'operational' },
  format_anomaly: { label: '链接格式异常提示', tone: 'partial' },
  historical: { label: '历史存档链接', tone: 'historical' },
  unavailable: { label: '暂无可用官网链接', tone: 'unavailable' },
}

export const PLATFORM_LABELS: Record<ClientPlatform, string> = {
  windows: 'Windows',
  android: 'Android',
  ios: 'iOS / iPadOS',
  macos: 'macOS',
  linux: 'Linux',
  openwrt: 'OpenWrt 软路由',
}

export const PLATFORM_DOC_ROUTES: Record<ClientPlatform, string> = {
  windows: '/clients/windows/',
  android: '/clients/android/',
  ios: '/clients/ios/',
  macos: '/clients/macos/',
  linux: '/clients/linux/',
  openwrt: '/clients/openwrt/',
}

const CLIENT_SLUG_ROUTE_MAP: Record<string, string> = {
  'clash-verge-rev': '/clients/clash-verge-rev/',
  v2rayn: '/clients/v2rayn/',
  flclash: '/clients/flclash/',
  'clash-nyanpasu': '/clients/clash-nyanpasu/',
  hiddify: '/clients/hiddify/',
  karing: '/clients/karing/',
  v2rayng: '/clients/v2rayng/',
  'clash-meta-for-android': '/clients/clash-meta/',
  'nekobox-for-android': '/clients/nekobox/',
  'sing-box-for-android': '/clients/sing-box/',
  'sing-box-ios': '/clients/sing-box/',
  'sing-box-macos': '/clients/sing-box/',
  'sing-box-desktop': '/clients/sing-box/',
  shadowrocket: '/clients/shadowrocket/',
  stash: '/clients/stash/',
  'quantumult-x': '/clients/quantumult-x/',
  'surge-5': '/clients/surge/',
  'surge-mac': '/clients/surge/',
  openclash: '/clients/openclash/',
  passwall2: '/clients/passwall2/',
  nikki: '/clients/nikki/',
}

export function resolveClientDocPath(app: ClientAppRecord): string {
  return CLIENT_SLUG_ROUTE_MAP[app.slug] ?? PLATFORM_DOC_ROUTES[app.platform]
}

export type BillingFilterKey = 'all' | 'monthly' | 'annual' | 'one_time' | 'custom'

export const BILLING_FILTER_OPTIONS: { key: BillingFilterKey; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'monthly', label: '月付' },
  { key: 'annual', label: '年付' },
  { key: 'one_time', label: '一次性' },
  { key: 'custom', label: '定制' },
]

const CYCLE_MONTHS: Partial<Record<BillingCycle, number>> = {
  monthly: 1,
  quarterly: 3,
  semiannual: 6,
  annual: 12,
  biennial: 24,
  triennial: 36,
}

export function matchesBillingFilter(plan: PlanItem, filter: BillingFilterKey): boolean {
  if (filter === 'all') return true
  if (filter === 'monthly') {
    return plan.billingCycle === 'monthly' || plan.billingCycle === 'quarterly' || plan.billingCycle === 'semiannual'
  }
  if (filter === 'annual') {
    return plan.billingCycle === 'annual' || plan.billingCycle === 'biennial' || plan.billingCycle === 'triennial'
  }
  if (filter === 'one_time') return plan.billingCycle === 'one_time'
  if (filter === 'custom') {
    return plan.billingCycle === 'custom' || /定制|独享/.test(plan.name)
  }
  return true
}

export function getPlanMonthlyEquivalentNote(plan: PlanItem): string | null {
  if (plan.priceCny === null) return null
  if (plan.billingCycle === 'monthly') return null

  const months = CYCLE_MONTHS[plan.billingCycle]
  if (!months || months <= 1) return null

  const monthly = (plan.priceCny / months).toFixed(2).replace(/\.00$/, '')
  if (plan.billingCycle === 'annual') {
    return `年付折算约 ¥${monthly}/月（需一次性年付 ¥${plan.priceCny}）`
  }
  if (plan.billingCycle === 'quarterly') {
    return `季付折算约 ¥${monthly}/月（需一次性季付 ¥${plan.priceCny}）`
  }
  return `${plan.billingLabel}折算约 ¥${monthly}/月（需一次性支付 ¥${plan.priceCny}）`
}

export function formatTestedAt(iso: string): string {
  if (!iso) return '日期未标注'
  return iso.replace('T', ' ').replace('+08:00', ' CST')
}

export function getBrandInitials(brand: BrandRecord): string {
  const clean = brand.name.replace(/[（(].*?[)）]/g, '').trim()
  return clean.slice(0, 2)
}

export function getBrandLineSummary(brand: BrandRecord): string {
  const lines = brand.lineTypes.join(' ')
  if (/IEPL|IPLC|内网专线|物理专线/i.test(lines)) return '专线架构'
  if (/BGP|中转/i.test(lines)) return '中转优化'
  return '待核实/常规'
}

export const INTENT_LABELS: Record<string, string> = {
  navigational: '实体档案',
  commercial: '选型与评测',
  informational: '技术文档',
  troubleshooting: '故障诊断',
  transactional: '套餐与购买',
}

const SPECIAL_ENTITY_LABELS: Record<string, string> = {
  'brands-hub': '机场品牌库',
  'reviews-hub': '独立评测库',
  'compare-hub': '横向对比中心',
}

export function formatDateYmd(raw: unknown): string {
  if (!raw) return ''
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return raw.toISOString().slice(0, 10)
  }
  const str = String(raw).trim()
  if (!str) return ''
  const match = str.match(/^(\d{4}-\d{2}-\d{2})/)
  if (match) return match[1]
  const parsed = new Date(str)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10)
  }
  return str
}

const CATEGORY_LABELS: Record<string, string> = {
  reviews: '独立评测',
  brands: '品牌档案',
  compare: '横向对比',
}

export function resolveEntityDisplay(entity: unknown, intent: unknown, category: unknown): string {
  const rawEntity = typeof entity === 'string' ? entity.trim() : ''
  const rawIntent = typeof intent === 'string' ? intent.trim() : ''
  const rawCat = typeof category === 'string' ? category.trim() : ''
  const mappedCat = CATEGORY_LABELS[rawCat] || rawCat

  let entityText = ''
  if (rawEntity) {
    const strippedSlug = rawEntity.replace(/^(review|brand)-/, '')
    if (BRAND_MAP[rawEntity]) {
      entityText = BRAND_MAP[rawEntity].name
    } else if (BRAND_MAP[strippedSlug]) {
      entityText = BRAND_MAP[strippedSlug].name
    } else if (SPECIAL_ENTITY_LABELS[rawEntity]) {
      entityText = SPECIAL_ENTITY_LABELS[rawEntity]
    } else if (/^[a-z0-9-]+$/i.test(rawEntity) && mappedCat) {
      entityText = mappedCat
    } else {
      entityText = rawEntity
    }
  } else {
    entityText = mappedCat
  }

  const intentText = rawIntent ? (INTENT_LABELS[rawIntent] || rawIntent) : ''
  if (entityText && intentText) return `${entityText} · ${intentText}`
  return entityText || intentText
}

const LIMITATION_LABELS: Record<string, string> = {
  'single-day snapshot': '单日观测快照',
  'brands tested at different times': '各品牌测试时段不同',
  'not a controlled cross-brand ranking': '不可直接用于跨品牌严格排名',
  'does not test AI or streaming unlock': '不含 AI / 流媒体解锁检验',
  'does not prove long-term stability': '不证明长期晚高峰稳定性',
  'raw machine-readable measurements were not included': '未附原始机器测量数据',
  'does not prove permanent unlock': '不构成永久解锁承诺',
  'does not include Gemini or Claude columns': '未包含 Gemini 与 Claude 检测列',
  'screenshot displays 60 of 70 nodes': '截图中仅展示 60/70 个节点',
}

export function translateLimitation(raw: string): string {
  const clean = raw.trim()
  if (LIMITATION_LABELS[clean]) return LIMITATION_LABELS[clean]
  if (clean.startsWith('test timestamp inferred from archive filename')) {
    const fileTag = clean.replace('test timestamp inferred from archive filename', '').trim()
    return `测试时间由归档文件名推断（${fileTag}）`
  }
  return clean
}

const COMPARE_ROUTE_TITLES: Record<string, string> = {
  '/compare/guangsu-vs-muguang/': '光速云 vs 暮光加速 对比',
  '/compare/guangsu-vs-feimao/': '光速云 vs 飞猫云 对比',
  '/compare/guangsu-vs-xingdaomeng/': '光速云 vs 星岛梦 对比',
  '/compare/guangsu-vs-weitu/': '光速云 vs 唯兔云 对比',
  '/compare/guangsu-vs-yifan/': '光速云 vs 一翻云 对比',
  '/compare/feimao-vs-wuyou/': '飞猫云 vs 无忧链接 对比',
  '/compare/jilian-vs-guangnian/': '极连云 vs 光年梯 对比',
  '/compare/low-cost-5-6-yuan-tier/': '5.6 元极限平价档横向对比',
  '/compare/clash-verge-rev-vs-flclash-vs-v2rayn/': 'Clash Verge Rev vs FlClash vs v2rayN 对比',
}

const ROUTE_TITLE_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {
    '/': '首页',
    '/about/': '关于我们与独立评测方法论',
    ...COMPARE_ROUTE_TITLES,
  }
  for (const pillar of PILLAR_TAXONOMY) {
    map[pillar.basePath] = pillar.overviewTitle
    for (const group of pillar.groups) {
      for (const item of group.items) {
        map[item.link] = item.text
      }
    }
  }
  for (const brand of ALL_BRANDS) {
    map[`/brands/${brand.slug}/`] = `${brand.name} · 品牌档案`
    map[`/reviews/${brand.slug}/`] = `${brand.name} · 深度评测`
  }
  return map
})()

export function resolveRouteTitle(link: string): string {
  const clean = link.trim()
  const normalized = clean.endsWith('/') ? clean : `${clean}/`
  return ROUTE_TITLE_MAP[normalized] || ROUTE_TITLE_MAP[clean] || clean
}

export function formatSourceLabel(raw: string): string {
  if (!raw) return ''
  return raw
    .replace(/raw-data\/32家机场品牌清单\.txt/g, '32家机场品牌公开资料与历史台账')
    .replace(/32家机场品牌清单\.txt/g, '32家机场品牌公开资料与历史台账')
    .replace(/raw-data\/光速云品牌信息\.txt/g, '光速云官方套餐与线路参数档案')
    .replace(/光速云品牌信息\.txt/g, '光速云官方套餐与线路参数档案')
    .replace(/raw-data\/第三方代理客户端\.txt/g, '2026 第三方代理客户端开源项目台账')
    .replace(/第三方代理客户端\.txt/g, '2026 第三方代理客户端开源项目台账')
    .replace(/raw-data\/README_16个机场测速实测资料_最新版\.txt/g, '2026-08-11 16家机场节点测速方法与边界说明')
    .replace(/README_16个机场测速实测资料_最新版\.txt/g, '2026-08-11 16家机场节点测速方法与边界说明')
    .replace(/raw-data\/speedtest-manifest\.json/g, '2026-08-11 节点测速原始图像校验清单')
    .replace(/speedtest-manifest\.json/g, '2026-08-11 节点测速原始图像校验清单')
    .replace(/raw-data\/机场品牌图表样式\.txt/g, 'Network Observatory 观测台视觉与状态规范')
    .replace(/raw-data\/内容矩阵\.txt/g, 'AI解锁专题架构与内容矩阵规范')
    .replace(/data\/brands\.json/g, 'AI解锁品牌参数核验数据库（2026-11 批次）')
    .replace(/brands\.json/g, 'AI解锁品牌参数核验数据库')
    .replace(/data\/clients\.json/g, 'AI解锁跨平台代理客户端兼容数据库')
    .replace(/clients\.json/g, 'AI解锁跨平台代理客户端兼容数据库')
    .replace(/data\/audit-report\.md/g, 'AI解锁第一阶段数据交叉核验报告')
    .replace(/audit-report\.md/g, 'AI解锁第一阶段数据交叉核验报告')
    .replace(/docs\/public\/images\/guangsu\//g, '2026-08-19 光速云三网与流媒体/AI 实测图集')
    .replace(/docs\/public\/images\/speedtests\/2026-08-11\//g, '2026-08-11 节点测速实测图集')
}
