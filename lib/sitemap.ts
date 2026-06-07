import { API, DOMAIN } from './config';
import { recipeCategories } from './recipeCategories';
import type { Recipe } from '@/components/generator/types';

export const dynamic = 'force-dynamic';

const SITE_URL = DOMAIN.replace(/\/$/, '');

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
};

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const absoluteUrl = (path = '/'): string => {
  if (path === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const xmlResponse = (body: string): Response =>
  new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });

export const buildSitemapIndex = (locations: string[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locations.map((loc) => `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`).join('\n')}
</sitemapindex>`;

export const buildUrlSet = (entries: SitemapEntry[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ loc, lastmod, changefreq, priority }) => `<url><loc>${escapeXml(loc)}</loc>${
      lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''
    }${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}${
      priority ? `<priority>${priority}</priority>` : ''
    }</url>`
  )
  .join('\n')}
</urlset>`;

export const getStaticSitemapEntries = (): SitemapEntry[] => {
  const lastmod = new Date().toISOString();

  return ['/', '/about', '/recipes', '/terms'].map((path) => ({
    loc: absoluteUrl(path),
    lastmod,
    changefreq: 'daily',
    priority: path === '/' ? '1.0' : '0.7',
  }));
};

export const fetchRecipeSitemapEntries = async (): Promise<SitemapEntry[]> => {
  try {
    const response = await fetch(`${API}/recipe`, { cache: 'no-store' });

    if (!response.ok) {
      return [];
    }

    const recipes = (await response.json()) as Recipe[];
    const lastmod = new Date().toISOString();

    return Array.isArray(recipes)
      ? recipes
          .filter((recipe) => Boolean(recipe.slug))
          .map((recipe) => ({
            loc: absoluteUrl(`/recipe/${encodeURIComponent(recipe.slug)}`),
            lastmod,
            changefreq: 'daily',
            priority: '0.7',
          }))
      : [];
  } catch {
    return [];
  }
};

export const fetchCategorySitemapEntries = async (): Promise<SitemapEntry[]> => {
  let tags: string[] = [...recipeCategories];

  try {
    const response = await fetch(`${API}/recipe/foodTags`, { cache: 'no-store' });

    if (response.ok) {
      const apiTags = (await response.json()) as string[];
      if (Array.isArray(apiTags) && apiTags.length > 0) {
        tags = apiTags;
      }
    }
  } catch {
    tags = [...recipeCategories];
  }

  const lastmod = new Date().toISOString();
  const uniqueTags = [...new Set(tags.filter(Boolean))];

  return uniqueTags.map((tag) => ({
    loc: absoluteUrl(`/recipes?category=${encodeURIComponent(tag)}`),
    lastmod,
    changefreq: 'daily',
    priority: '0.7',
  }));
};

export const sitemapLocations = [
  absoluteUrl('/sitemap-0.xml'),
  absoluteUrl('/server-sitemap.xml'),
  absoluteUrl('/categories-sitemap.xml'),
];
