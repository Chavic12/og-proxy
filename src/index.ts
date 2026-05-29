import express, { Request, Response } from 'express';
import { SITES } from './config/sites';
import { isCrawler } from './utils/crawler';
import { handleProduct } from './handlers/product';
import { handleCategory } from './handlers/category';
import { handleBrand } from './handlers/brand';
import { handleAgency } from './handlers/agency';
import { handleGeneric } from './handlers/generic';

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

  const query = req.originalUrl.split('?')[1] || '';

  // agencia (/agencias/16/productos) - antes de producto porque /agencias/16 matchearía como producto
  const agencyHtml = await handleAgency(path, site);
  if (agencyHtml) {
    res.status(200).send(agencyHtml);
    return;
  }

  // producto
  const productHtml = await handleProduct(path, site);
  if (productHtml) {
    res.status(200).send(productHtml);
    return;
  }

  // marca (?brand=3) - antes de categoría porque la URL puede ser /menu/todos?brand=3
  const brandHtml = await handleBrand(path, query, site);
  if (brandHtml) {
    res.status(200).send(brandHtml);
    return;
  }

  // categoría
  const categoryHtml = await handleCategory(path, site);
  if (categoryHtml) {
    res.status(200).send(categoryHtml);
    return;
  }

  res.status(200).send(handleGeneric(path, site));
});

app.listen(PORT, () => {
  console.log(`OG Proxy running on port ${PORT}`);
});
