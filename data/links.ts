import brandsData from './brands.json'
import type {
  BrandAffiliateLinkSummary,
  BrandRecord,
  BrandsDatabase,
} from './types'

const DATABASE = brandsData as BrandsDatabase

export const PRIMARY_BRAND_SLUG = DATABASE.primaryBrandSlug || 'guangsu'
export const AFFILIATE_DISCLOSURE = DATABASE.affiliateDisclosure
export const AFFILIATE_REL = DATABASE.affiliateRel

export const ALL_BRANDS: readonly BrandRecord[] = DATABASE.brands

export const BRAND_MAP: Readonly<Record<string, BrandRecord>> =
  Object.fromEntries(ALL_BRANDS.map((brand) => [brand.slug, brand]))

/**
 * Look up a single brand record by canonical slug.
 */
export function getBrandBySlug(slug: string): BrandRecord | undefined {
  return BRAND_MAP[slug]
}

/**
 * Return standardized affiliate link & coupon metadata for a brand slug.
 * All outbound affiliate URLs across the site must resolve through this helper.
 */
export function getBrandAffiliateInfo(
  slug: string,
): BrandAffiliateLinkSummary | undefined {
  const brand = BRAND_MAP[slug]
  if (!brand) {
    return undefined
  }
  return {
    slug: brand.slug,
    name: brand.name,
    url: brand.affiliate.url,
    alternateUrls: brand.affiliate.alternateUrls,
    code: brand.affiliate.code,
    linkStatus: brand.affiliate.linkStatus,
    coupons: brand.coupons,
    rel: brand.affiliate.rel,
    target: brand.affiliate.target,
    disclosure: brand.affiliate.disclosure,
    commercialRank: brand.commercialRank,
  }
}
