import { SiteConfig } from '../interfaces';
import { escapeHtml, buildOgHtml } from '../utils/html';

export function handleGeneric(path: string, site: SiteConfig): string {
  return buildOgHtml({
    title: escapeHtml(site.siteName),
    description: escapeHtml(site.defaultDescription),
    image: site.defaultImage,
    url: `${site.targetUrl}${path}`,
    siteName: escapeHtml(site.siteName),
  });
}
