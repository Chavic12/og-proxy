import { OgData } from '../interfaces';

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildOgHtml({ title, description, image, imageWidth, imageHeight, url, siteName }: OgData): string {
  const imageType = image.endsWith('.png') ? 'image/png' : image.endsWith('.jpg') || image.endsWith('.jpeg') ? 'image/jpeg' : 'image/webp';
  const imageMeta = imageWidth && imageHeight
    ? `\n  <meta property="og:image:width" content="${imageWidth}" />\n  <meta property="og:image:height" content="${imageHeight}" />`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />${imageMeta}
  <meta property="og:image:type" content="${imageType}" />
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
