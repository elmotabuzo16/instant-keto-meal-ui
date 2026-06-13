import { APP_NAME, DOMAIN } from './config';
import { getCanonicalUrl } from './seo';

type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdObject
  | JsonLdValue[];

export type JsonLdObject = {
  [key: string]: JsonLdValue | undefined;
};

export type FaqItem = {
  question: string;
  answer: string;
};

const SITE_URL = DOMAIN.replace(/\/$/, '');

export const jsonLdScriptProps = (data: JsonLdObject) => ({
  type: 'application/ld+json',
  dangerouslySetInnerHTML: {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  },
});

export const buildWebsiteJsonLd = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: APP_NAME,
  url: SITE_URL,
  inLanguage: 'en',
  description:
    'A free keto meal generator and low-carb meal planning website for quick, simple meal ideas.',
});

export const buildOrganizationJsonLd = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: APP_NAME,
  url: SITE_URL,
  logo: getCanonicalUrl('/grains.ico'),
});

export const buildWebApplicationJsonLd = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: APP_NAME,
  url: SITE_URL,
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern web browser',
  isAccessibleForFree: true,
  inLanguage: 'en',
  offers: {
    '@type': 'Offer',
    price: '0',
  },
  description:
    'Generate quick keto meals, low-carb recipe ideas, and simple meal planning inspiration for breakfast, lunch, dinner, snacks, and desserts.',
});

export const buildFaqPageJsonLd = (faqs: FaqItem[]): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
