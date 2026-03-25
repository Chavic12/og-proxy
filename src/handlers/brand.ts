import axios from 'axios';
import { SiteConfig, BrandResponse } from '../interfaces';
import { escapeHtml, buildOgHtml } from '../utils/html';

export async function handleBrand(path: string, query: string, site: SiteConfig): Promise<string | null> {
  const params = new URLSearchParams(query);
  const brandId = params.get('brand');

  if (!brandId) return null;

  try {
    const apiUrl = `${site.apiDomain}api/em/brand/get`;
    const response = await axios.get<BrandResponse[]>(apiUrl, { timeout: 5000 });
    const brand = response.data.find((b) => String(b.id) === brandId);

    if (!brand) return null;

    return buildOgHtml({
      title: escapeHtml(`${brand.name} | ${site.siteName}`),
      description: escapeHtml(`Productos de ${brand.name} en ${site.siteName}`),
      image: site.defaultImage,
      url: `${site.targetUrl}${path}?brand=${brandId}`,
      siteName: escapeHtml(site.siteName),
    });
  } catch (err: any) {
    console.error(`Error fetching brand ${brandId}:`, err.message);
    return null;
  }
}
