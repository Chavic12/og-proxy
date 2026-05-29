import axios from 'axios';
import { SiteConfig, AgencyResponse } from '../interfaces';
import { escapeHtml, buildOgHtml } from '../utils/html';

export async function handleAgency(path: string, site: SiteConfig): Promise<string | null> {
  // /agencias/16/productos  o  /agencias/16
  const agencyMatch = path.match(/^\/agencias\/(\d+)(?:\/.*)?$/);

  if (!agencyMatch) return null;

  try {
    const agencyId = agencyMatch[1];
    const apiUrl = `${site.apiDomain}api/em/material_agency/getBySource`;
    const response = await axios.post<AgencyResponse[]>(apiUrl, { source: 'W' }, { timeout: 5000 });
    const agency = response.data.find((a) => String(a.id) === agencyId);

    if (!agency) return null;

    const image = agency.image
      ? `${site.s3Url}/agency/${agency.image}`
      : site.defaultImage;

    return buildOgHtml({
      title: escapeHtml(`${agency.name} | ${site.siteName}`),
      description: escapeHtml(`Productos de ${agency.name} en ${site.siteName}`),
      image,
      url: `${site.targetUrl}${path}`,
      siteName: escapeHtml(site.siteName),
    });
  } catch (err: any) {
    console.error(`Error fetching agency:`, err.message);
    return null;
  }
}
