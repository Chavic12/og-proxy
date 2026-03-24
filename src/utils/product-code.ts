import { SiteConfig } from '../interfaces';

export function padCode(id: number | string, length: number): string {
  return String(id).padStart(length, '0');
}

export function extractProductId(slug: string): string | null {
  const match = slug.match(/[A-Za-z0-9]+$/);
  return match ? match[0] : null;
}

export function buildProductCode(site: SiteConfig, productId: string): string {
  const prefix = padCode(site.providerId, site.prefixLength);
  const suffix = padCode(productId, site.suffixLength);
  return `${prefix}-${suffix}`;
}
