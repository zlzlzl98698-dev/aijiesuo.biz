import type { DefaultTheme } from 'vitepress'

export type PillarId =
  | 'airport'
  | 'pricing'
  | 'brands'
  | 'vpn'
  | 'clients'
  | 'ai'
  | 'network'
  | 'tutorials'
  | 'troubleshooting'
  | 'risk'

export interface NavSubItem {
  text: string
  link: string
  description?: string
  group?: string
  badge?: string
  isDynamicHub?: boolean
}

export interface SidebarGroupSpec {
  text: string
  collapsed?: boolean
  items: NavSubItem[]
}

export interface PillarDefinition {
  id: PillarId
  text: string
  navLabel: string
  basePath: string
  extraSidebarPrefixes?: string[]
  description: string
  overviewTitle: string
  groups: SidebarGroupSpec[]
}

export interface BreadcrumbItem {
  text: string
  link: string
}

/**
 * Single source of truth for all 10 top-level content pillars on aijiesuo.biz.
 * VitePress top nav, dropdowns, mobile menu, sidebars, and static route checks
 * all derive directly from PILLAR_TAXONOMY.
 */
export const PILLAR_TAXONOMY: readonly PillarDefinition[] = [
  {
    id: 'airport',
    text: '机场推荐',
    navLabel: '机场推荐',
    basePath: '/airport/',
    description: '基于可核查参数、实测快照与透明评分的机场筛选与选型专题。',
    overviewTitle: '机场推荐总览',
    groups: [
      {
        text: '机场筛选专题',
        collapsed: false,
        items: [
          { text: '机场推荐总览', link: '/airport/', description: '10 大核心专题入口与评估方法论说明' },
          { text: '综合机场推荐', link: '/airport/recommend/', description: '按使用场景与数据完整度筛选高匹配方案' },
          { text: '机场综合榜单', link: '/airport/ranking/', description: '分离商业顺位与研究评分的透明排行' },
          { text: '靠谱机场筛选', link: '/airport/reliable/', description: '运营年限、透明度与风险核查清单' },
          { text: '稳定专线机场', link: '/airport/stable/', description: '面向晚高峰与长期办公的稳定性评估' },
          { text: '新手易用机场', link: '/airport/easy-to-use/', description: '专属客户端与低门槛订阅导入方案' }
        ]
      }
    ]
  },
  {
    id: 'pricing',
    text: '价格与套餐',
    navLabel: '价格套餐',
    basePath: '/pricing/',
    description: '覆盖入门年付、月付、不限时流量包与性价比拆解的价格专题。',
    overviewTitle: '价格与套餐总览',
    groups: [
      {
        text: '价格与计费模式',
        collapsed: false,
        items: [
          { text: '价格与套餐总览', link: '/pricing/', description: '不同预算档位与计费周期对比指南' },
          { text: '高性价比平价套餐', link: '/pricing/cheap/', description: '入门价位段品牌汇总与流量核对' },
          { text: '一元机场现象解析', link: '/pricing/one-yuan/', description: '超低价节点池的限流、超售与停运风险' },
          { text: '一分机场风险提示', link: '/pricing/one-cent/', description: '极低价引流盘与一次性套餐甄别' },
          { text: '灵活月付套餐对比', link: '/pricing/monthly/', description: '适合短期试错与低沉没成本的月付档位' },
          { text: '不限时不过期流量包', link: '/pricing/non-expiring/', description: '一次性按量付费品牌与单价换算' },
          { text: '高性价比专线评估', link: '/pricing/value/', description: '单 GB 成本、倍率与稳定性平衡分析' },
          { text: '光速云套餐与优惠码', link: '/pricing/guangsu/', description: '光速云各档位套餐、永久包与 AMM 优惠码说明' }
        ]
      }
    ]
  },
  {
    id: 'brands',
    text: '机场品牌',
    navLabel: '机场品牌',
    basePath: '/brands/',
    extraSidebarPrefixes: ['/reviews/', '/compare/'],
    description: '收录全部品牌档案、独立实测评测与横向对比的权威品牌库。',
    overviewTitle: '机场品牌库',
    groups: [
      {
        text: '品牌库与横向对比',
        collapsed: false,
        items: [
          { text: '全部机场品牌库', link: '/brands/', description: '可筛选搜索的品牌资料与数据状态索引', isDynamicHub: true },
          { text: '实测评测报告汇总', link: '/reviews/', description: '区分实测快照与厂商自述的独立评测', isDynamicHub: true },
          { text: '热门品牌横向对比', link: '/compare/', description: '同价位品牌在协议、专线与解锁维度的对比' },
          { text: '光速云品牌档案', link: '/brands/guangsu/', description: '光速云基础参数、套餐表、节点与风险提示', badge: '主推' },
          { text: '光速云深度评测', link: '/reviews/guangsu/', description: '光速云实测速度、AI 解锁表现与限制说明' }
        ]
      }
    ]
  },
  {
    id: 'vpn',
    text: 'VPN 与加速器',
    navLabel: 'VPN 加速器',
    basePath: '/vpn/',
    description: '传统 VPN、代理专线与游戏加速器在协议、路由与适用场景上的差异。',
    overviewTitle: 'VPN 与加速器总览',
    groups: [
      {
        text: 'VPN 与场景加速',
        collapsed: false,
        items: [
          { text: 'VPN 与加速器总览', link: '/vpn/', description: 'VPN 协议与代理机场的技术架构区别' },
          { text: '跨境联网方案推荐', link: '/vpn/recommend/', description: '按办公、AI 与娱乐场景选择连接方式' },
          { text: '免费 VPN 风险与替代', link: '/vpn/free/', description: '免费 VPN 隐私、带宽限制与安全边界' },
          { text: '手机端联网与加速', link: '/vpn/mobile/', description: 'iOS 与 Android 移动网络环境适配建议' },
          { text: 'Android 安卓端指南', link: '/vpn/android/', description: '安卓后台保活、分流与电池优化说明' },
          { text: '低延迟游戏加速说明', link: '/vpn/gaming/', description: 'UDP 转发、Full Cone NAT 与游戏专线差异' }
        ]
      }
    ]
  },
  {
    id: 'clients',
    text: '客户端软件',
    navLabel: '客户端软件',
    basePath: '/clients/',
    description: '覆盖 Windows、Android、iOS、macOS、Linux 与 OpenWrt 的开源及通用客户端指南。',
    overviewTitle: '客户端软件大全',
    groups: [
      {
        text: '按操作系统选择',
        collapsed: false,
        items: [
          { text: '客户端下载与选型总览', link: '/clients/', description: '第三方通用客户端与厂商专属客户端区分' },
          { text: 'Windows 客户端推荐', link: '/clients/windows/', description: 'Clash Verge Rev、v2rayN、FlClash 等桌面方案', group: 'os' },
          { text: 'Android 客户端推荐', link: '/clients/android/', description: 'v2rayNG、FlClash、Hiddify、Karing 等安卓客户端', group: 'os' },
          { text: 'iOS / iPadOS 客户端', link: '/clients/ios/', description: 'Shadowrocket、Stash、Quantumult X 与外区账号说明', group: 'os' },
          { text: 'macOS 苹果电脑客户端', link: '/clients/macos/', description: 'Apple Silicon 与 Intel 架构桌面端适配清单', group: 'os' },
          { text: 'Linux 桌面与主机端', link: '/clients/linux/', description: 'DEB / RPM / AppImage 与 v2rayA 透明代理方案', group: 'os' },
          { text: 'OpenWrt 软路由插件', link: '/clients/openwrt/', description: 'OpenClash、PassWall2 与 Nikki 路由器要求', group: 'os' }
        ]
      },
      {
        text: '桌面与跨平台客户端',
        collapsed: false,
        items: [
          { text: 'Clash Verge Rev', link: '/clients/clash-verge-rev/', description: 'Mihomo 内核桌面端、TUN 模式与规则覆写', group: 'client' },
          { text: 'Clash Meta (Mihomo 系)', link: '/clients/clash-meta/', description: 'Clash Meta 生态与 Android/桌面端演变说明', group: 'client' },
          { text: 'Mihomo 内核解析', link: '/clients/mihomo/', description: 'VLESS Reality、Hysteria 2 与规则内核能力', group: 'client' },
          { text: 'v2rayN', link: '/clients/v2rayn/', description: '支持 Xray 与 sing-box 多核心的经典桌面端', group: 'client' },
          { text: 'sing-box 核心与官方端', link: '/clients/sing-box/', description: 'SFA / SFI / SFM 官方原生客户端与配置结构', group: 'client' },
          { text: 'FlClash', link: '/clients/flclash/', description: '基于 Mihomo 的跨平台简洁图形客户端', group: 'client' },
          { text: 'Hiddify', link: '/clients/hiddify/', description: '多协议兼容与新手友好型自动选点客户端', group: 'client' },
          { text: 'Karing', link: '/clients/karing/', description: '基于 sing-box 的全平台多订阅管理客户端', group: 'client' },
          { text: 'Clash Nyanpasu', link: '/clients/clash-nyanpasu/', description: '多内核切换与配置文件增强图形客户端', group: 'client' }
        ]
      },
      {
        text: '移动端与软路由客户端',
        collapsed: false,
        items: [
          { text: 'Shadowrocket (小火箭)', link: '/clients/shadowrocket/', description: 'iOS 主流规则代理工具与美区购买提示', group: 'client' },
          { text: 'v2rayNG', link: '/clients/v2rayng/', description: 'Android 端 Xray 协议与订阅链接主力应用', group: 'client' },
          { text: 'NekoBox', link: '/clients/nekobox/', description: 'sing-box 系安卓客户端与 Google Play 仿冒风险提示', group: 'client' },
          { text: 'Stash', link: '/clients/stash/', description: 'iOS / macOS 生态 Clash 规则与覆写客户端', group: 'client' },
          { text: 'Quantumult X (圈 X)', link: '/clients/quantumult-x/', description: 'iOS 高级分流、脚本与请求重写客户端', group: 'client' },
          { text: 'Surge', link: '/clients/surge/', description: 'iOS / macOS 高级网络调试与策略组工具', group: 'client' },
          { text: 'OpenClash', link: '/clients/openclash/', description: 'OpenWrt 环境下基于 Mihomo 的透明代理插件', group: 'client' },
          { text: 'PassWall2', link: '/clients/passwall2/', description: 'OpenWrt 轻量分流与多核心透明网关插件', group: 'client' },
          { text: 'Nikki', link: '/clients/nikki/', description: '适用于 OpenWrt 24.10+ 的 Mihomo 透明代理方案', group: 'client' }
        ]
      }
    ]
  },
  {
    id: 'ai',
    text: 'AI 与流媒体',
    navLabel: 'AI 流媒体',
    basePath: '/ai/',
    description: '针对 ChatGPT、Claude、Gemini 及海外流媒体解锁条件、IP 纯净度与分流规则的专项指南。',
    overviewTitle: 'AI 与流媒体解锁指南',
    groups: [
      {
        text: 'AI 工具访问专项',
        collapsed: false,
        items: [
          { text: 'AI 与流媒体解锁总览', link: '/ai/', description: '原生 IP、家宽与机房 IP 的风控机制解析' },
          { text: 'ChatGPT / OpenAI 解锁', link: '/ai/chatgpt/', description: '节点地区要求、风控报错排查与分流策略' },
          { text: 'Claude 访问与防封号', link: '/ai/claude/', description: 'Anthropic 地区限制、纯净 IP 与账号安全建议' },
          { text: 'Gemini 节点兼容指南', link: '/ai/gemini/', description: 'Google AI 地区白名单与部分节点不兼容说明' }
        ]
      },
      {
        text: '海外流媒体与跨区',
        collapsed: false,
        items: [
          { text: 'Netflix 奈飞解锁原理', link: '/ai/netflix/', description: '自制剧与非自制剧解锁差异及 4K 带宽要求' },
          { text: 'YouTube Premium 与送中', link: '/ai/youtube/', description: '视频无广告、防送中定位与 4K/8K 码率测试' },
          { text: 'Disney+ 跨区播放', link: '/ai/disney/', description: '常见解锁地区与客户端 DNS 匹配要求' },
          { text: 'TikTok 直播与运营网络', link: '/ai/tiktok/', description: '跨区直连、SIM 卡环境与节点归属地核查' }
        ]
      }
    ]
  },
  {
    id: 'network',
    text: '线路与节点',
    navLabel: '线路节点',
    basePath: '/network/',
    description: '拆解 IEPL、IPLC、BGP 中转、地区节点延迟特征与流量倍率计算方法。',
    overviewTitle: '线路与节点技术指南',
    groups: [
      {
        text: '传输线路与地区节点',
        collapsed: false,
        items: [
          { text: '线路与节点总览', link: '/network/', description: '直连、公网中转与跨境专线的底层差异' },
          { text: 'IEPL 内网专线解析', link: '/network/iepl/', description: '以太网物理专线的稳定性与成本特征' },
          { text: 'IPLC 国际专线解析', link: '/network/iplc/', description: '点对点专线架构、晚高峰表现与厂商标注边界' },
          { text: '香港节点测速与用途', link: '/network/hong-kong/', description: '低延迟办公、流媒体与部分 AI 服务受限提示' },
          { text: '日本节点特点与选路', link: '/network/japan/', description: '亚太带宽、二次元流媒体与游戏联机表现' },
          { text: '低延迟优化与测速方法', link: '/network/low-latency/', description: '区分 TCP Ping、HTTPS 延迟与晚高峰丢包' },
          { text: '节点流量倍率说明', link: '/network/traffic-multiplier/', description: '1x 与高倍率节点真实流量消耗计算' }
        ]
      }
    ]
  },
  {
    id: 'tutorials',
    text: '使用教程',
    navLabel: '使用教程',
    basePath: '/tutorials/',
    description: '从订阅链接获取、客户端导入到分流规则、TUN 模式与 DNS 防泄漏的实操教程。',
    overviewTitle: '使用教程中心',
    groups: [
      {
        text: '通用配置与核心功能',
        collapsed: false,
        items: [
          { text: '使用教程总览', link: '/tutorials/', description: '新手快速上手路径与常见问题索引' },
          { text: '机场订阅导入教程', link: '/tutorials/subscription/', description: '通用订阅、一键导入与专属客户端差异' },
          { text: 'Clash 系配置进阶', link: '/tutorials/clash/', description: '策略组选择、自动测速与覆写配置方法' },
          { text: '国内外规则分流设置', link: '/tutorials/routing/', description: '按域名与 IP 精确分流直连与代理流量' },
          { text: 'TUN 虚拟网卡模式教程', link: '/tutorials/tun/', description: '接管终端、桌面应用与不支持系统代理的软件' },
          { text: 'DNS 防泄漏与分流配置', link: '/tutorials/dns/', description: 'Fake-IP 与 Redir-Host 模式选择及解析优化' }
        ]
      },
      {
        text: '分平台与品牌实操',
        collapsed: false,
        items: [
          { text: 'Windows 新手配置流程', link: '/tutorials/windows/', description: '从安装客户端到开启系统代理的完整步骤' },
          { text: 'Android 安卓端配置流程', link: '/tutorials/android/', description: '导入订阅、分应用代理与后台保活设置' },
          { text: 'iOS 小火箭配置流程', link: '/tutorials/ios/', description: '美区账号下载、扫码导入与规则模式切换' },
          { text: '光速云接入与使用教程', link: '/tutorials/guangsu/', description: '光速云专属客户端与第三方 Clash/小火箭导入指南' }
        ]
      }
    ]
  },
  {
    id: 'troubleshooting',
    text: '故障排查',
    navLabel: '故障排查',
    basePath: '/troubleshooting/',
    description: '系统排查节点超时、订阅更新失败、DNS 污染、TUN 冲突与 AI 拒访报错。',
    overviewTitle: '故障排查手册',
    groups: [
      {
        text: '常见故障诊断',
        collapsed: false,
        items: [
          { text: '故障排查总览', link: '/troubleshooting/', description: '按症状定位客户端、本地网络或节点故障' },
          { text: '节点连接超时 (Timeout)', link: '/troubleshooting/timeout/', description: '本地时间校准、防火墙与线路波动排查' },
          { text: '订阅拉取与更新失败', link: '/troubleshooting/subscription/', description: '机场官网域名变更、UA 拦截与代理更新环路' },
          { text: '连上节点但无法上网', link: '/troubleshooting/connection/', description: '系统代理冲突、浏览器扩展抢占与核心报错' },
          { text: 'DNS 解析异常与污染', link: '/troubleshooting/dns/', description: 'DoH/DoT 异常、Fake-IP 缓存与国内网站变慢' },
          { text: '客户端无法启动或权限报错', link: '/troubleshooting/startup/', description: 'Windows 服务模式安装、内核缺失与杀软拦截' },
          { text: '开启 TUN 模式后断网', link: '/troubleshooting/tun/', description: '多网卡冲突、Docker/WSL 路由碰撞排查' },
          { text: 'AI 工具提示不可用或封禁', link: '/troubleshooting/ai-access/', description: '排查 ChatGPT 403/1020、Claude 地区阻断与节点切换' }
        ]
      }
    ]
  },
  {
    id: 'risk',
    text: '风险与替代',
    navLabel: '风险替代',
    basePath: '/risk/',
    description: '客观揭示跑路停运风险、预付资金安全、退款边界、隐私保护与长期应对策略。',
    overviewTitle: '风险提示与合规边界',
    groups: [
      {
        text: '购前风控与安全常识',
        collapsed: false,
        items: [
          { text: '风险与安全总览', link: '/risk/', description: '机场服务不确定性与信息披露原则说明' },
          { text: '跑路与停运风险识别', link: '/risk/shutdown/', description: '低价长周期促销、域名失联与备用节点策略' },
          { text: '理性购买与避坑指南', link: '/risk/buying-guide/', description: '先月付测试、分散风险与核实协议支持' },
          { text: '停更客户端与停服替代', link: '/risk/alternatives/', description: 'Clash for Windows 停更迁移与备用方案切换' },
          { text: '退款政策与售后边界', link: '/risk/refunds/', description: '特殊虚拟商品不支持退款的常见条款提醒' },
          { text: '隐私记录与流量日志常识', link: '/risk/privacy/', description: 'HTTPS 端到端加密、本地分流与账号隔离建议' },
          { text: '客户端与下载源安全核验', link: '/risk/security/', description: '防范第三方假冒包（如非官方 NekoBox）与钓鱼站' }
        ]
      }
    ]
  }
] as const

const PILLAR_BY_ID = new Map<PillarId, PillarDefinition>(
  PILLAR_TAXONOMY.map((pillar) => [pillar.id, pillar])
)

/**
 * Normalizes a route path to always start and end with '/'.
 */
export function normalizeRoutePath(routePath: string): string {
  if (!routePath || routePath === '/') return '/'
  const trimmed = routePath.trim()
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

/**
 * Deduplicates sidebar/nav items by normalized link while preserving initial insertion order.
 */
function dedupeByLink(items: NavSubItem[]): DefaultTheme.SidebarItem[] {
  const seen = new Set<string>()
  const result: DefaultTheme.SidebarItem[] = []
  for (const item of items) {
    const normalized = normalizeRoutePath(item.link)
    if (seen.has(normalized)) continue
    seen.add(normalized)
    result.push({
      text: item.text,
      link: normalized
    })
  }
  return result
}

/**
 * All static routes derived directly from PILLAR_TAXONOMY (including '/' and all pillar hubs + sub-topics).
 */
export const ALL_STATIC_ROUTES: readonly string[] = (() => {
  const routes = new Set<string>(['/'])
  for (const pillar of PILLAR_TAXONOMY) {
    routes.add(normalizeRoutePath(pillar.basePath))
    for (const group of pillar.groups) {
      for (const item of group.items) {
        routes.add(normalizeRoutePath(item.link))
      }
    }
  }
  return Array.from(routes)
})()

/**
 * Builds the VitePress top navigation bar directly from PILLAR_TAXONOMY.
 * Supports multi-level dropdown menus for complex pillars like /clients/.
 */
export function buildVitePressNav(): DefaultTheme.NavItem[] {
  return PILLAR_TAXONOMY.map((pillar): DefaultTheme.NavItem => {
    if (pillar.groups.length > 1) {
      return {
        text: pillar.navLabel,
        activeMatch: `^${pillar.basePath}`,
        items: pillar.groups.map((group) => ({
          text: group.text,
          items: group.items.map((item) => ({
            text: item.text,
            link: normalizeRoutePath(item.link)
          }))
        }))
      }
    }

    const flatItems = pillar.groups.flatMap((group) =>
      group.items.map((item) => ({
        text: item.text,
        link: normalizeRoutePath(item.link)
      }))
    )

    const activePattern = pillar.extraSidebarPrefixes?.length
      ? `^(${[pillar.basePath, ...pillar.extraSidebarPrefixes].join('|')})`
      : `^${pillar.basePath}`

    return {
      text: pillar.navLabel,
      activeMatch: activePattern,
      items: flatItems
    }
  })
}

/**
 * Builds the VitePress multi-path sidebar directly from PILLAR_TAXONOMY,
 * dynamically injecting brand archive and review items without duplicating static routes.
 */
export function buildVitePressSidebar(
  brandItems: NavSubItem[] = [],
  reviewItems: NavSubItem[] = []
): DefaultTheme.SidebarMulti {
  const sidebar: DefaultTheme.SidebarMulti = {}

  for (const pillar of PILLAR_TAXONOMY) {
    const groups: DefaultTheme.SidebarItem[] = pillar.groups.map((group) => ({
      text: group.text,
      collapsed: group.collapsed ?? false,
      items: dedupeByLink(group.items)
    }))

    if (pillar.id === 'brands') {
      const staticBrandLinks = new Set(
        pillar.groups.flatMap((g) => g.items.map((i) => normalizeRoutePath(i.link)))
      )

      const filteredBrandItems = brandItems.filter(
        (item) => !staticBrandLinks.has(normalizeRoutePath(item.link))
      )
      const filteredReviewItems = reviewItems.filter(
        (item) => !staticBrandLinks.has(normalizeRoutePath(item.link))
      )

      if (filteredBrandItems.length > 0) {
        groups.push({
          text: '品牌档案目录',
          collapsed: false,
          items: dedupeByLink(filteredBrandItems)
        })
      }

      if (filteredReviewItems.length > 0) {
        groups.push({
          text: '品牌独立评测',
          collapsed: false,
          items: dedupeByLink(filteredReviewItems)
        })
      }
    }

    const prefixes = [pillar.basePath, ...(pillar.extraSidebarPrefixes ?? [])]
    for (const prefix of prefixes) {
      sidebar[normalizeRoutePath(prefix)] = groups
    }
  }

  return sidebar
}

/**
 * Looks up a pillar definition by its ID.
 */
export function getPillarById(id: PillarId): PillarDefinition {
  const pillar = PILLAR_BY_ID.get(id)
  if (!pillar) {
    throw new Error(`Unknown pillar id: ${id}`)
  }
  return pillar
}

/**
 * Finds the owning pillar for a given route path.
 */
export function findPillarForPath(routePath: string): PillarDefinition | null {
  const normalized = normalizeRoutePath(routePath)
  if (normalized === '/') return null

  for (const pillar of PILLAR_TAXONOMY) {
    const prefixes = [pillar.basePath, ...(pillar.extraSidebarPrefixes ?? [])]
    if (prefixes.some((prefix) => normalized.startsWith(normalizeRoutePath(prefix)))) {
      return pillar
    }
  }
  return null
}

/**
 * Generates structured breadcrumbs for any static or dynamic route path.
 */
export function getBreadcrumbsForPath(routePath: string, currentTitle?: string): BreadcrumbItem[] {
  const normalized = normalizeRoutePath(routePath)
  const crumbs: BreadcrumbItem[] = [{ text: '首页', link: '/' }]
  if (normalized === '/') return crumbs

  const pillar = findPillarForPath(normalized)
  if (!pillar) return crumbs

  crumbs.push({ text: pillar.text, link: normalizeRoutePath(pillar.basePath) })

  if (normalized === normalizeRoutePath(pillar.basePath)) {
    return crumbs
  }

  for (const group of pillar.groups) {
    const matched = group.items.find((item) => normalizeRoutePath(item.link) === normalized)
    if (matched) {
      crumbs.push({ text: matched.text, link: normalized })
      return crumbs
    }
  }

  if (normalized.startsWith('/reviews/') && normalized !== '/reviews/') {
    crumbs[1] = { text: '实测评测', link: '/reviews/' }
  } else if (normalized.startsWith('/compare/')) {
    crumbs[1] = { text: '横向对比', link: '/compare/' }
  }

  if (currentTitle) {
    crumbs.push({ text: currentTitle, link: normalized })
  }

  return crumbs
}
