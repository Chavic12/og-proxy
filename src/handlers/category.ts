import axios from 'axios';
import { SiteConfig, CategoryResponse } from '../interfaces';
import { escapeHtml, buildOgHtml } from '../utils/html';

export async function handleCategory(path: string, site: SiteConfig): Promise<string | null> {
  const categoryMatch = path.match(/^\/menu\/([^\/]+)$/);

  if (!categoryMatch) return null;

  try {
    const categorySlug = categoryMatch[1].toLowerCase();
    const apiUrl = `${site.apiDomain}api/em/material_group/get_cb/${site.providerId}`;
    const response = await axios.get<CategoryResponse[]>(apiUrl, { timeout: 5000 });
    const category = response.data.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, '-') === categorySlug || c.name.toLowerCase() === categorySlug
    );

    if (!category) return null;

    return buildOgHtml({
      title: escapeHtml(category.metatitle || `${category.name} | ${site.siteName}`),
      description: escapeHtml(category.metadescription || site.defaultDescription),
      image: site.defaultImage,
      url: `${site.targetUrl}${path}`,
      siteName: escapeHtml(site.siteName),
    });
  } catch (err: any) {
    console.error(`Error fetching categories:`, err.message);
    return null;
  }
}
