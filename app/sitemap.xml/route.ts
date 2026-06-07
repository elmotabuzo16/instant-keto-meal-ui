import { buildSitemapIndex, sitemapLocations, xmlResponse } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  return xmlResponse(buildSitemapIndex(sitemapLocations));
}
