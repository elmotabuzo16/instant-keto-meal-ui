import type { Metadata } from 'next';
import { APP_NAME, DOMAIN, FB_APP_ID } from './config';

const SITE_URL = DOMAIN.replace(/\/$/, '');

export const defaultSeoDescription =
  'Use a free keto meal generator for quick low-carb meal ideas, simple keto recipes, and budget-friendly meal planning for busy people in the United States.';

export const defaultSeoKeywords = [
  'keto meal generator',
  'keto meal planner',
  'keto meal plan generator',
  'keto meal ideas',
  'easy keto meals',
  'low carb meal generator',
  'low carb meal planner',
  'keto recipes USA',
  'keto diet meal plan',
  'keto meals for weight loss',
  'quick keto meals',
  'free keto meal planner',
  'low-carb recipes',
  'instant keto meal',
];

export const defaultOgImage = '/opengraph-image';

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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: APP_NAME,
      locale: 'en_US',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
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
