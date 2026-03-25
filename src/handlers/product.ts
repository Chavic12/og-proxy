import axios from 'axios';
import { SiteConfig, ProductResponse } from '../interfaces';
import { extractProductId, buildProductCode } from '../utils/product-code';
import { escapeHtml, buildOgHtml } from '../utils/html';

export async function handleProduct(path: string, site: SiteConfig): Promise<string | null> {
  const productId = extractProductId(path.split('/').pop() || '');

  if (!productId || !/^\d+$/.test(productId)) return null;

  try {
    const code = buildProductCode(site, productId);
    const apiUrl = `${site.apiDomain}api/em/material/get/${code}/${site.priceList}/0`;
    const response = await axios.get<ProductResponse[]>(apiUrl, { timeout: 5000 });
    const product = Array.isArray(response.data) ? response.data[0] : response.data;

    if (!product || !product.name) return null;

    const imageName = product.images && product.images.length > 0
      ? product.images[0].fileName
      : null;
    const image = imageName
      ? `${site.s3Url}/products/500X500/${imageName}`
      : site.defaultImage;

    return buildOgHtml({
      title: escapeHtml(product.metatitle || `${product.name} | ${site.siteName}`),
      description: escapeHtml(product.metadescription || product.description || site.defaultDescription),
      image,
      url: `${site.targetUrl}${path}`,
      siteName: escapeHtml(site.siteName),
    });
  } catch (err: any) {
    console.error(`Error fetching product ${productId}:`, err.message);
    return null;
  }
}
