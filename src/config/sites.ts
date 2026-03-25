import { SiteConfig } from '../interfaces';

export const SITES: Record<string, SiteConfig> = {
  'asajoyeria.com': {
    apiDomain: 'https://be.asajoyeria.com/',
    s3Url: 'https://asajoyeriafiles.s3.eu-central-1.amazonaws.com/folder',
    providerId: 1,
    prefixLength: 9, // -->  000000001
    suffixLength: 10, // -> 0000002202  --> 000000001-0000002202
    priceList: 'PD',
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
    siteName: 'Intenso Perfumes',
    defaultDescription: 'Pide en nuestra web. Paga fácil con tarjeta o en efectivo.',
    defaultImage: 'https://www.intensoperfumeshn.com/logo.webp',
    targetUrl: 'https://www.intensoperfumeshn.com',
  },
  'kcarebeautyhn.com': {
    apiDomain: 'https://be.kcarebeautyhn.com/',
    s3Url: 'https://kcarefiles.s3.eu-central-1.amazonaws.com/folder',
    providerId: 1,
    prefixLength: 9,
    suffixLength: 10,
    priceList: 'PD',
    siteName: 'KCareBeauty',
    defaultDescription: 'Pide en nuestra web, San Pedro y La Ceiba. Paga fácil con tarjeta o en efectivo. Disfruta con tu familia y amigos de nuestros productos.',
    defaultImage: 'https://kcarebeautyhn.com/logo.webp',
    targetUrl: 'https://kcarebeautyhn.com',
  },
  'tatoswings.hn': {
    apiDomain: 'https://tatos-api.aveapplications.com/',
    s3Url: 'https://tatosfiles.s3.eu-central-1.amazonaws.com/folder',
    providerId: 1,
    prefixLength: 9,
    suffixLength: 10,
    priceList: 'PD',
    siteName: "Tato's Wings",
    defaultDescription: 'Pide en nuestra web o en el app Yuuju! en Tegucigalpa, San Pedro y La Ceiba. Paga fácil con tarjeta o en efectivo. Disfruta con tu familia y amigos de nuestros productos.',
    defaultImage: 'https://tatoswings.hn/logo.webp',
    targetUrl: 'https://tatoswings.hn',
  },
};
