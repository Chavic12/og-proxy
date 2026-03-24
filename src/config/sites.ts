import { SiteConfig } from '../interfaces';

export const SITES: Record<string, SiteConfig> = {
  'asajoyeria.com': {
    apiDomain: 'https://be.asajoyeria.com/',
    s3Url: 'https://asajoyeriafiles.s3.eu-central-1.amazonaws.com/folder',
    providerId: 1,
    prefixLength: 9, // -->  000000001
    suffixLength: 10, // -> 0000002202  --> 000000001-0000002202
    priceList: 'PD',
    officeCode: '01',
    siteName: 'Asa Joyería',
    defaultDescription: 'Pide en nuestra web. Paga fácil con tarjeta o en efectivo.',
    defaultImage: 'https://asajoyeria.com/logo.webp',
    targetUrl: 'https://asajoyeria.com',
  },
  'www.intensoperfumeshn.com': {
    apiDomain: 'https://be.intensoperfumeshn.com/',
    s3Url: 'https://intensoperfumesfiles.s3.eu-central-1.amazonaws.com/folder',
    providerId: 1,
    prefixLength: 9,
    suffixLength: 10,
    priceList: 'PD',
    officeCode: '01',
    siteName: 'Intenso Perfumes',
    defaultDescription: 'Pide en nuestra web. Paga fácil con tarjeta o en efectivo.',
    defaultImage: 'https://www.intensoperfumeshn.com/logo.webp',
    targetUrl: 'https://www.intensoperfumeshn.com',
  },
};
