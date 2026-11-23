/**
 * Strict, evidence-first TypeScript types for aijiesuo.biz (AI解锁).
 * Distinguishes measured screenshots, vendor claims, commercial metadata,
 * editorial commentary, and unverified/historical records.
 */

export type DataStatus =
  | 'measured'
  | 'vendor'
  | 'commercial'
  | 'editorial'
  | 'unverified'

export type UnlockStatus =
  | 'verified'
  | 'vendor_claimed'
  | 'conditional'
  | 'historical'
  | 'untested'
  | 'unavailable'

export type BillingCycle =
  | 'monthly'
  | 'quarterly'
  | 'semiannual'
  | 'annual'
  | 'biennial'
  | 'triennial'
  | 'one_time'
  | 'custom'

export type AffiliateLinkStatus =
  | 'active'
  | 'format_anomaly'
  | 'historical'
  | 'unavailable'

export type ReviewStatus = 'approved' | 'review-required' | 'unverified'

export type ClientMode =
  | 'proprietary_plus_third_party'
  | 'proprietary_only'
  | 'third_party_supported'
  | 'unverified'

export interface PlanItem {
  name: string
  billingCycle: BillingCycle
  billingLabel: string
  priceCny: number | null
  trafficGb: number | null
  trafficLabel: string
  trafficCycle: string
  dataStatus: DataStatus
  notes?: string
}

export interface VendorBenchmarkRow {
  region: string
  latencyMs: number | null
  downloadMbps: number | null
  note?: string
}

export interface VendorBenchmarkSnapshot {
  snapshotDate: string
  condition: string
  dataStatus: DataStatus
  rows: VendorBenchmarkRow[]
  sourceNote: string
}

export interface SpeedTestRecord {
  id: string
  imagePath: string
  batchId?: string
  testedAt: string
  timezone: string
  dataStatus: DataStatus
  reviewStatus: ReviewStatus
  protocolDisplayed: string
  toolFamily: string
  backendNode?: string
  threads?: number
  nodeCount?: string
  testMode?: string
  dateConfidence: string
  limitations: string[]
  observedSummary: string
  reviewNote?: string
}

export interface UnlockEntry {
  service: string
  category: 'ai' | 'streaming'
  status: UnlockStatus
  dataStatus: DataStatus
  source: string
  note?: string
}

export interface CouponInfo {
  code: string
  discountLabel: string | null
  restrictions: string | null
  dataStatus: DataStatus
  source: string
}

export interface AffiliateInfo {
  url: string | null
  alternateUrls: string[]
  code: string | null
  linkStatus: AffiliateLinkStatus
  disclosure: string
  rel: string
  target: string
  verifiedAt: string | null
}

export interface ResearchScoreBreakdown {
  completeness: number
  protocolLineClarity: number
  measuredEvidence: number
  pricingFlexibility: number
  riskTransparency: number
  total: number
  rubricVersion: string
}

export interface BrandRecord {
  slug: string
  name: string
  englishName?: string
  aliases: string[]
  commercialRank: number | null
  researchScore: number
  researchScoreBreakdown: ResearchScoreBreakdown
  completeness: number
  accentColor: string
  logo: string | null
  foundedYear: number | null
  positioning: string
  lineTypes: string[]
  protocols: string[]
  clientMode: ClientMode
  clientNotes: string
  nodeCoverage: string[]
  nodeCountLabel: string | null
  deviceLimit: string
  trafficMultiplier: string
  paymentMethods: string[]
  startingPriceLabel: string
  startingMonthlyCny: number | null
  plans: PlanItem[]
  coupons: CouponInfo[]
  affiliate: AffiliateInfo
  vendorBenchmark: VendorBenchmarkSnapshot | null
  speedTestEvidence: SpeedTestRecord[]
  aiSupport: UnlockEntry[]
  streamingSupport: UnlockEntry[]
  highlights: string[]
  editorialNotes: string
  dataStatus: DataStatus
  conflicts: string[]
  pendingVerification: string[]
  isHistoricalOnly: boolean
  sourceIds: string[]
}

export interface BrandsDatabase {
  schemaVersion: string
  generatedAt: string
  primaryBrandSlug: string
  affiliateDisclosure: string
  affiliateRel: string
  researchRubricNote: string
  brands: BrandRecord[]
}

export interface BrandAffiliateLinkSummary {
  slug: string
  name: string
  url: string | null
  alternateUrls: string[]
  code: string | null
  linkStatus: AffiliateLinkStatus
  coupons: CouponInfo[]
  rel: string
  target: string
  disclosure: string
  commercialRank: number | null
}

export type ClientPlatform =
  | 'windows'
  | 'android'
  | 'ios'
  | 'macos'
  | 'linux'
  | 'openwrt'

export interface ClientAppRecord {
  slug: string
  name: string
  displayName: string
  platform: ClientPlatform
  kernels: string[]
  features: string[]
  projectPlatform: 'GitHub' | 'App Store' | '官方文档' | '官网'
  pricingType: 'free_open_source' | 'paid_or_iap' | 'unverified'
  maintenanceWarning?: string
  platformNotes?: string
  dataStatus: DataStatus
}

export interface ClientsDatabase {
  schemaVersion: string
  sourceFile: string
  generatedAt: string
  clientCategoriesNote: string
  platformNotes: Record<ClientPlatform, string>
  platforms: Record<ClientPlatform, ClientAppRecord[]>
}
