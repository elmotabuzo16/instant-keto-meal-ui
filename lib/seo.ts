import type { Metadata } from 'next';
import { APP_NAME, DOMAIN, FB_APP_ID } from './config';

const SITE_URL = DOMAIN.replace(/\/$/, '');

export const defaultSeoDescription =
  'Generate delicious and healthy Filipino keto meals in seconds. Browse low-carb recipes, nutrition details, ingredients, and cooking instructions for easier keto meal planning.';

export const defaultSeoKeywords = [
  'keto food',
  'ketogenic recipes',
  'low-carb meals',
  'keto diet',
  'keto meal planner',
  'keto recipes',
  'healthy fats',
  'keto-friendly foods',
  'keto Filipino meals',
  'keto meal generator',
  'instant keto meal',
];

export const defaultOgImage = '/categories/avocado.svg';

export const getCanonicalUrl = (path = '/'): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${SITE_URL}${normalizedPath}`;
};

type SeoMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article';
};

export const buildSeoMetadata = ({
  title,
  description = defaultSeoDescription,
  path = '/',
  image = defaultOgImage,
  keywords = defaultSeoKeywords,
  type = 'website',
}: SeoMetadataOptions): Metadata => {
  const canonicalUrl = getCanonicalUrl(path);

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: APP_NAME,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    facebook: {
      appId: FB_APP_ID,
    },
  };
};
