import type { MetadataRoute } from 'next';
import { absoluteUrl, sitemapLocations } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [absoluteUrl('/sitemap.xml'), ...sitemapLocations],
  };
}
