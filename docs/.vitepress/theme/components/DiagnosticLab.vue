<script setup lang="ts">
import { computed, ref } from 'vue'

interface DiagnosticSymptom {
  id: string
  label: string
  codeHint: string
  summary: string
  rootCauses: string[]
  steps: string[]
  links: { text: string; link: string }[]
}

const SYMPTOMS: DiagnosticSymptom[] = [
  {
    id: 'chatgpt-403',
    label: 'ChatGPT 403 / 地区受限',
    codeHint: 'HTTP 403 / 1020 / Unsupported region',
    summary: 'OpenAI 对香港/大陆归属地及高风险机房出口 IP 实施严格拦截或质询。',
    rootCauses: [
      '当前节点为香港落地 IP，OpenAI 对香港地区未开放或仅限特定客户端尝试',
      '共用机房出口 IP 被高频并发请求触发 Cloudflare 1020 / WAF 拦截',
      '本地系统代理未接管浏览器或 DNS 仍走本地解析导致区域判定冲突',
    ],
    steps: [
      '优先切换至日本、新加坡、台湾或美国落地节点，避开香港与未知冷门地区节点',
      '在客户端开启规则分流并确保 openai.com / chatgpt.com / oaistatic.com 走同一海外节点',
      '清理浏览器 Cookie 或使用无痕窗口重新登录，避免旧的地区缓存触发二次拦截',
    ],
    links: [
      { text: 'ChatGPT 解锁与分流指南', link: '/ai/chatgpt/' },
      { text: 'AI 拒访报错综合排查', link: '/troubleshooting/ai-access/' },
      { text: '实测评测报告对比', link: '/reviews/' },
    ],
  },
  {
    id: 'claude-ban',
    label: 'Claude 封号 / 不可用',
    codeHint: 'Account Disabled / Unavailable in your region',
    summary: 'Anthropic 对 IP 纯净度、跨区频繁跳变以及注册手机号/IP 一致性风控极高。',
    rootCauses: [
      '短时间内在多国节点（如美国/日本/新加坡）之间高频切换触发异常登录风控',
      '共享池 IP 被多人批量用于 API 滥用，导致所在 ASN/IP 段被连带限制',
      '使用高风险虚拟号码或浏览器指纹/时区与出口地区明显不一致',
    ],
    steps: [
      '固定使用单一低并发地区的节点（例如美西或日本/新加坡静态出口），不要频繁切区',
      '开启独立策略组锁定 Claude 域名（claude.ai / anthropic.com）长期绑定同一节点',
      '如已有账户稳定性需求，优先评估支持独享原生 IP 定制或节点纯净度较高的线路',
    ],
    links: [
      { text: 'Claude 访问与防封号建议', link: '/ai/claude/' },
      { text: 'AI 不可用故障排查', link: '/troubleshooting/ai-access/' },
      { text: '机场品牌库筛选', link: '/brands/' },
    ],
  },
  {
    id: 'gemini-region',
    label: 'Gemini 地区不支持',
    codeHint: 'Gemini is not available in your country',
    summary: 'Google AI 服务会同时校验出口 IP 归属与 Google 账号关联的地区历史定位。',
    rootCauses: [
      '节点实际出口被 Google GeoIP 识别为香港或未开放地区（部分测试中香港节点均失败）',
      'Google 账号曾长期在受限地区定位下使用，存在位置历史惯性（俗称送中）',
      'IPv6 出口未关闭或分流漏走直连，导致双栈请求泄露真实位置',
    ],
    steps: [
      '先切换至在实测中明确解锁 Gemini 的节点地区（例如部分新加坡、美国或马来西亚节点）',
      '在客户端内检查并暂时关闭 IPv6 或强制所有 Google AI 相关域名走代理出口',
      '进入 Google 账号与搜索地区设置核对当前识别国家，必要时更换干净节点后等待刷新',
    ],
    links: [
      { text: 'Gemini 节点兼容指南', link: '/ai/gemini/' },
      { text: 'YouTube 防送中与地区定位', link: '/ai/youtube/' },
      { text: 'DNS 防泄漏配置', link: '/tutorials/dns/' },
    ],
  },
  {
    id: 'node-timeout',
    label: '节点连接超时',
    codeHint: 'Timeout / EOF / Handshake failed',
    summary: '本地系统时间偏差、订阅节点失效或当前宽带运营商到入口路由异常均会导致超时。',
    rootCauses: [
      '设备本地系统时间与标准 UTC 时间偏差超过 60 秒（VMess/TLS/VLESS 握手直接失败）',
      '机场订阅未更新，本地保留的仍是已下线旧域名或旧端口节点',
      '本地杀毒软件、系统防火墙或公司内网屏蔽了特定海外端口或 UDP/QUIC 协议',
    ],
    steps: [
      '开启操作系统“自动同步网络时间”，确认误差控制在数秒以内',
      '更新机场订阅获取最新节点端口与中转入口；若协议异常可从 Hysteria2 切回 VLESS/SS 测试',
      '核对客户端内核日志，排查是否为本地防火墙拦截或晚高峰公网中转丢包',
    ],
    links: [
      { text: '节点连接超时排查手册', link: '/troubleshooting/timeout/' },
      { text: 'IEPL / IPLC 专线差异', link: '/network/' },
      { text: '稳定专线机场筛选', link: '/airport/stable/' },
    ],
  },
  {
    id: 'sub-fail',
    label: '订阅拉取 / 更新失败',
    codeHint: 'Fetch Failed / SSL Error / 403 UA',
    summary: '订阅域名被污染、更新请求被自身旧代理环路阻断或客户端 UA 不兼容。',
    rootCauses: [
      '在已经断网或旧节点失效的状态下开启“通过代理更新订阅”，造成更新死锁',
      '机场官网或订阅托管域名变更，旧订阅链接返回 404/502 或 SSL 证书不匹配',
      '客户端 User-Agent 未携带标准 Clash/Shadowrocket 标识导致服务端拒绝下发',
    ],
    steps: [
      '先关闭系统代理与 TUN 模式，尝试直连或切换手机热点更新订阅',
      '检查品牌官网最新可用域名或备用订阅地址，确认套餐未到期且流量未耗尽',
      '若浏览器可下载配置文本但客户端报错，可尝试手动导入 YAML/URI 或启用对应 UA 覆写',
    ],
    links: [
      { text: '订阅拉取失败排查', link: '/troubleshooting/subscription/' },
      { text: '机场订阅导入通用教程', link: '/tutorials/subscription/' },
      { text: '客户端下载与选型', link: '/clients/' },
    ],
  },
  {
    id: 'tun-disconnect',
    label: '开启 TUN 后断网',
    codeHint: 'TUN Interface Conflict / DNS Loop',
    summary: '虚拟网卡与本地多网卡、Docker/WSL 路由或未安装系统服务权限冲突导致全部流量黑洞。',
    rootCauses: [
      'Windows 桌面客户端未以管理员权限安装服务模式（Service Mode），虚拟网卡无法接管路由',
      '本机同时运行 VPN 软件、WSL2、Docker 或其他加速器，造成默认网关和 DNS 回环',
      'Fake-IP 段（如 198.18.0.0/15）与内网网段或企业 VPN 路由发生重叠',
    ],
    steps: [
      'Windows 端先在客户端设置中安装并启动 Service Mode，再重新启用 TUN 模式',
      '排查并退出其余游戏加速器、企业 VPN 或冲突的网络扩展',
      '临时切换至“系统代理（System Proxy）”验证节点本身是否通畅，再排查 DNS/Fake-IP 设置',
    ],
    links: [
      { text: 'TUN 模式断网专项排查', link: '/troubleshooting/tun/' },
      { text: 'TUN 虚拟网卡配置教程', link: '/tutorials/tun/' },
      { text: 'DNS 解析异常排查', link: '/troubleshooting/dns/' },
    ],
  },
]

const selectedId = ref<string>(SYMPTOMS[0].id)
const activeSymptom = computed(
  () => SYMPTOMS.find((item) => item.id === selectedId.value) ?? SYMPTOMS[0]
)
</script>

<template>
  <section class="diag-lab" aria-label="AI 与网络快速诊断台">
    <div class="diag-header">
      <div>
        <span class="diag-kicker aij-mono">NETWORK DIAGNOSTIC LAB</span>
        <h3 class="diag-title">AI 访问与代理连接快速诊断台</h3>
      </div>
      <span class="aij-badge aij-badge--cyan">6 类高频故障症状</span>
    </div>

    <div class="diag-tabs" role="tablist" aria-label="故障症状选择">
      <button
        v-for="item in SYMPTOMS"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="selectedId === item.id"
        class="diag-tab"
        :class="{ 'is-active': selectedId === item.id }"
        @click="selectedId = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="diag-body" role="tabpanel">
      <div class="diag-summary-bar">
        <code class="diag-code">{{ activeSymptom.codeHint }}</code>
        <p class="diag-summary">{{ activeSymptom.summary }}</p>
      </div>

      <div class="diag-columns">
        <div class="diag-col">
          <h4>常见根因定位</h4>
          <ul>
            <li v-for="cause in activeSymptom.rootCauses" :key="cause">{{ cause }}</li>
          </ul>
        </div>
        <div class="diag-col">
          <h4>建议排查顺序</h4>
          <ol>
            <li v-for="step in activeSymptom.steps" :key="step">{{ step }}</li>
          </ol>
        </div>
      </div>

      <div class="diag-links">
        <span class="diag-links-label">直达排查文档：</span>
        <a
          v-for="linkItem in activeSymptom.links"
          :key="linkItem.link"
          :href="linkItem.link"
          class="diag-doc-link"
        >
          {{ linkItem.text }} →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.diag-lab {
  background: var(--aij-surface);
  border: 1px solid var(--aij-border);
  border-radius: 14px;
  padding: 1.35rem;
  margin: 1.25rem 0;
}

.diag-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.diag-kicker {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--aij-cyan);
}

.diag-title {
  margin: 0.15rem 0 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--aij-navy);
}

.diag-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.diag-tab {
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--aij-border-strong);
  background: var(--aij-bg);
  color: var(--aij-text-muted);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.diag-tab:hover {
  border-color: var(--aij-cyan);
  color: var(--aij-navy);
}

.diag-tab.is-active {
  background: var(--aij-navy);
  border-color: var(--aij-navy);
  color: #ffffff;
}

.diag-body {
  background: var(--aij-bg);
  border: 1px solid var(--aij-border);
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
}

.diag-summary-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  padding-bottom: 0.85rem;
  margin-bottom: 0.9rem;
  border-bottom: 1px solid var(--aij-border);
}

.diag-code {
  font-family: var(--aij-mono);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.22rem 0.55rem;
  border-radius: 6px;
  background: var(--obs-bg);
  color: #7dd3fc;
}

.diag-summary {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--aij-navy);
}

.diag-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

@media (max-width: 760px) {
  .diag-columns {
    grid-template-columns: 1fr;
  }
}

.diag-col h4 {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--aij-navy);
}

.diag-col ul,
.diag-col ol {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--aij-text-muted);
}

.diag-col li + li {
  margin-top: 0.35rem;
}

.diag-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--aij-border);
}

.diag-links-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--aij-text-muted);
}

.diag-doc-link {
  display: inline-flex;
  align-items: center;
  padding: 0.32rem 0.72rem;
  border-radius: 6px;
  background: var(--light-info-bg);
  border: 1px solid var(--light-info-border);
  color: var(--aij-cyan);
  font-size: 0.83rem;
  font-weight: 600;
  text-decoration: none;
}

.diag-doc-link:hover {
  background: #e0f2fe;
  color: var(--aij-navy);
}
</style>
