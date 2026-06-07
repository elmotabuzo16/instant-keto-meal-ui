import { buildUrlSet, fetchRecipeSitemapEntries, xmlResponse } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  const entries = await fetchRecipeSitemapEntries();

  return xmlResponse(buildUrlSet(entries));
}
