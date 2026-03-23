import express, { Request, Response } from 'express';
import axios from 'axios';

interface SiteConfig {
  apiDomain: string;
  s3Url: string;
  providerId: number;
  providerLength: number;
  productLength: number;
  priceList: string;
  officeCode: string;
  siteName: string;
  defaultDescription: string;
  defaultImage: string;
  targetUrl: string;
}

interface ProductImage {
  fileName: string;
  displayName: string;
  position: number;
  active: string;
}

interface ProductResponse {
  name?: string;
  description?: string;
  metatitle?: string;
  metadescription?: string;
  images?: ProductImage[];
}

interface OgData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

// agregar más sitios aquí
const SITES: Record<string, SiteConfig> = {
  'asajoyeria.com': {
    apiDomain: 'https://be.asajoyeria.com/',
    s3Url: 'https://asajoyeriafiles.s3.eu-central-1.amazonaws.com/folder',
    providerId: 1,
    providerLength: 9,
    productLength: 10,
    priceList: 'PD',
    officeCode: '01',
    siteName: 'Asa Joyería',
    defaultDescription: 'Pide en nuestra web. Paga fácil con tarjeta o en efectivo.',
    defaultImage: 'https://asajoyeria.com/logo.webp',
    targetUrl: 'https://asajoyeria.com',
  },
  // Agrega más sitios aquí:
};

// User-Agents de crawlers de redes sociales
const CRAWLER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'WhatsApp',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'Pinterest',
  'Googlebot',
];

function isCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  return CRAWLER_AGENTS.some(agent => userAgent.toLowerCase().includes(agent.toLowerCase()));
}

function padCode(id: number | string, length: number): string {
  return String(id).padStart(length, '0');
}

function extractProductId(slug: string): string | null {
  const match = slug.match(/[A-Za-z0-9]+$/);
  return match ? match[0] : null;
}

function buildProductCode(site: SiteConfig, productId: string): string {
  const provider = padCode(site.providerId, site.providerLength);
  const product = padCode(productId, site.productLength);
  return `${provider}-${product}`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildOgHtml({ title, description, image, url, siteName }: OgData): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${siteName}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body></body>
</html>`;
}

const app = express();
const PORT = process.env.PORT || 3050;

app.use('/', async (req: Request, res: Response) => {
  const host = ((req.headers['x-forwarded-host'] as string) || req.headers.host || '').replace(/:\d+$/, '');
  const site = SITES[host];

  if (!site) {
    res.status(404).send('Site not configured');
    return;
  }

  // Si no es crawler, redirigir al sitio real
  if (!isCrawler(req.headers['user-agent'])) {
    res.redirect(301, `${site.targetUrl}${req.originalUrl}`);
    return;
  }

  const path = req.path;

  // Detectar si es una página con producto /menu/cadenas/colombian-almeja-blue-2202
  // El ID del producto es el último número del slug
  const productId = extractProductId(path.split('/').pop() || '');

  if (productId && /^\d+$/.test(productId)) {
    try {
      const code = buildProductCode(site, productId);
      const apiUrl = `${site.apiDomain}api/em/material/get/${code}/${site.priceList}/${site.officeCode}`;
      const response = await axios.get<ProductResponse[]>(apiUrl, { timeout: 5000 });
      const product = Array.isArray(response.data) ? response.data[0] : response.data;

      if (product && product.name) {
        const imageName = product.images && product.images.length > 0
          ? product.images[0].fileName
          : null;
        const image = imageName
          ? `${site.s3Url}/products/500X500/${imageName}`
          : site.defaultImage;

        const html = buildOgHtml({
          title: escapeHtml(product.metatitle || `${product.name} | ${site.siteName}`),
          description: escapeHtml(product.metadescription || product.description || site.defaultDescription),
          image,
          url: `${site.targetUrl}${path}`,
          siteName: escapeHtml(site.siteName),
        });

        res.status(200).send(html);
        return;
      }
    } catch (err: any) {
      console.error(`Error fetching product ${productId}:`, err.message);
    }
  }

  // Página genérica (home, categorías, etc.)
  const html = buildOgHtml({
    title: escapeHtml(site.siteName),
    description: escapeHtml(site.defaultDescription),
    image: site.defaultImage,
    url: `${site.targetUrl}${path}`,
    siteName: escapeHtml(site.siteName),
  });

  res.status(200).send(html);
});

app.listen(PORT, () => {
  console.log(`OG Proxy running on port ${PORT}`);
});
