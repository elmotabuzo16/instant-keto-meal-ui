import { buildUrlSet, getStaticSitemapEntries, xmlResponse } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  return xmlResponse(buildUrlSet(getStaticSitemapEntries()));
}
