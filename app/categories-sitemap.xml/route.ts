import { buildUrlSet, fetchCategorySitemapEntries, xmlResponse } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  const entries = await fetchCategorySitemapEntries();

  return xmlResponse(buildUrlSet(entries));
}
