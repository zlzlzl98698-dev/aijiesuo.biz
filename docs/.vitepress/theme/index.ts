import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './styles/custom.css'

import PillarIndex from './components/PillarIndex.vue'
import BrandDirectory from './components/BrandDirectory.vue'
import BrandSnapshot from './components/BrandSnapshot.vue'
import PlanComparison from './components/PlanComparison.vue'
import SpeedTestReport from './components/SpeedTestReport.vue'
import UnlockMatrix from './components/UnlockMatrix.vue'
import NetworkTopology from './components/NetworkTopology.vue'
import BrandCta from './components/BrandCta.vue'
import ClientMatrix from './components/ClientMatrix.vue'
import DiagnosticLab from './components/DiagnosticLab.vue'
import BrandRecommender from './components/BrandRecommender.vue'
import HomePage from './components/HomePage.vue'
import NotFoundPage from './components/NotFoundPage.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('PillarIndex', PillarIndex)
    app.component('BrandDirectory', BrandDirectory)
    app.component('BrandSnapshot', BrandSnapshot)
    app.component('PlanComparison', PlanComparison)
    app.component('SpeedTestReport', SpeedTestReport)
    app.component('UnlockMatrix', UnlockMatrix)
    app.component('NetworkTopology', NetworkTopology)
    app.component('BrandCta', BrandCta)
    app.component('ClientMatrix', ClientMatrix)
    app.component('DiagnosticLab', DiagnosticLab)
    app.component('BrandRecommender', BrandRecommender)
    app.component('HomePage', HomePage)
    app.component('NotFoundPage', NotFoundPage)
  },
} satisfies Theme
