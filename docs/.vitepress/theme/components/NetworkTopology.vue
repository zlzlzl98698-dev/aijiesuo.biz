<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../../../data/links'
import { CLIENT_MODE_LABELS } from '../utils/brandHelpers'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))

interface TopologyHop {
  step: string
  title: string
  detail: string
  tags: string[]
}

const hops = computed<TopologyHop[]>(() => {
  if (!brand.value) return []
  const b = brand.value

  const protocolTags = b.protocols.length > 0 ? b.protocols : ['协议未明确标注']
  const lineTags = b.lineTypes.length > 0 ? b.lineTypes : ['线路架构待核实']
  const exitRegions =
    b.nodeCoverage.length > 0 ? b.nodeCoverage.slice(0, 6) : ['落地地区待核实']

  return [
    {
      step: '01',
      title: '用户设备与客户端',
      detail: CLIENT_MODE_LABELS[b.clientMode],
      tags: [b.deviceLimit || '设备数限制未明示'],
    },
    {
      step: '02',
      title: '加密传输协议层',
      detail: '本地内核建立加密隧道并完成域名/IP 分流判断',
      tags: protocolTags,
    },
    {
      step: '03',
      title: '接入与国内中转层',
      detail: '就近接入运营商入口（具体物理机房与运营商不公开）',
      tags: [b.trafficMultiplier || '流量倍率未明示'],
    },
    {
      step: '04',
      title: '跨境传输路径',
      detail: '依据品牌公开资料归纳的传输路径特征',
      tags: lineTags,
    },
    {
      step: '05',
      title: '海外落地节点',
      detail: b.nodeCountLabel || '节点数量待进一步核实',
      tags: exitRegions,
    },
    {
      step: '06',
      title: '目标 AI 与流媒体',
      detail: '受出口 IP 纯净度与目标平台风控策略影响',
      tags: ['OpenAI / Claude / Gemini', 'Netflix / YouTube / Disney+'],
    },
  ]
})
</script>

<template>
  <section
    v-if="brand"
    class="obs-panel"
    :style="{ '--brand-accent': brand.accentColor || '#38bdf8' }"
    aria-label="网络传输路径原理示意"
  >
    <header class="obs-panel-header">
      <div>
        <h3 class="obs-panel-title">
          {{ brand.name }} · 网络传输路径示意（Observatory）
        </h3>
        <p class="obs-panel-subtitle">
          结合品牌协议、线路标注与落地覆盖生成逻辑路径图，用于理解流量转发链路
        </p>
      </div>
      <span class="obs-pill obs-pill--historical">
        原理示意 / 基于品牌资料
      </span>
    </header>

    <div class="topology-track">
      <div
        v-for="(hop, idx) in hops"
        :key="hop.step"
        class="obs-card topology-node"
      >
        <div class="node-head">
          <span class="node-step aij-mono">HOP {{ hop.step }}</span>
          <span v-if="idx < hops.length - 1" class="node-arrow" aria-hidden="true">→</span>
        </div>
        <h4 class="node-title">{{ hop.title }}</h4>
        <p class="node-detail">{{ hop.detail }}</p>
        <div class="node-tags">
          <span v-for="tag in hop.tags" :key="tag" class="node-tag aij-mono">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <footer class="obs-footer">
      <strong>原理示意边界：</strong>
      本路径图仅基于 {{ brand.name }} 公开资料（协议、线路名词与地区列表）绘制逻辑示意，不代表对实际物理光缆、BGP ASN 路由或上游运营商的链路抓包验证。
    </footer>
  </section>
</template>

<style scoped>
.topology-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

@media (max-width: 900px) {
  .topology-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .topology-track {
    grid-template-columns: 1fr;
  }
}

.topology-node {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  position: relative;
}

.node-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.node-step {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--brand-accent, var(--obs-accent));
  letter-spacing: 0.05em;
}

.node-arrow {
  color: var(--obs-text-muted);
  font-family: var(--aij-mono);
  font-size: 0.9rem;
}

.node-title {
  margin: 0;
  font-size: 0.94rem;
  font-weight: 700;
  color: #ffffff;
}

.node-detail {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--obs-text-muted);
}

.node-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.32rem;
  margin-top: auto;
  padding-top: 0.35rem;
}

.node-tag {
  font-size: 0.72rem;
  padding: 0.14rem 0.44rem;
  border-radius: 5px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #e2e8f0;
}
</style>
