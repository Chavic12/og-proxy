export interface SiteConfig {
  apiDomain: string;
  s3Url: string;
  providerId: number;
  prefixLength: number;
  suffixLength: number;
  priceList: string;
  officeCode: string;
  siteName: string;
  defaultDescription: string;
  defaultImage: string;
  targetUrl: string;
}

export interface ProductImage {
  fileName: string;
  displayName: string;
  position: number;
  active: string;
}

export interface ProductResponse {
  name?: string;
  description?: string;
  metatitle?: string;
  metadescription?: string;
  images?: ProductImage[];
}

export interface CategoryResponse {
  code: string;
  name: string;
  metatitle?: string | null;
  metadescription?: string | null;
}

export interface OgData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}
