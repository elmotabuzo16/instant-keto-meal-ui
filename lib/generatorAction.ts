'use server';

import { API } from './config';
import type { Recipe } from '@/components/generator/types';

// Utility function for random selection
const selectRandom = <T,>(items: T[]): T | null =>
  items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null;

// Generic fetch wrapper with error handling
const fetchFromAPI = async <T,>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> => {
  try {
    const response = await fetch(`${API}${endpoint}`, {
      ...options,
    });

    if (!response.ok) {
      console.warn(`API request failed: ${response.status} ${endpoint}`);
      return null;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    return null;
  }
};

/**
 * Fetches all available food tags from the API
 * @returns {Promise<string[]>} Array of tag strings, empty array on error
 */
export const fetchTags = async (): Promise<string[]> => {
  const tags = await fetchFromAPI<string[] | null>('/recipe/foodTags', {
    cache: 'no-store',
  });

  return Array.isArray(tags) ? tags : [];
};

/**
 * Generates a random recipe based on type and tag filters
 * @param {string} type - Recipe type to filter by (e.g., 'Meal', 'Snack')
 * @param {string} tag - Recipe tag to filter by (e.g., 'Italian', 'Asian')
 * @returns {Promise<Recipe | null>} Random recipe matching criteria, or null on error
 */
export const generateNewFood = async (
  type: string,
  tag: string
): Promise<Recipe | null> => {
  const params = new URLSearchParams({
    type: encodeURIComponent(type),
    tag: encodeURIComponent(tag),
  });

  const recipes = await fetchFromAPI<Recipe[]>(
    `/recipe/filter?${params.toString()}`,
    {
      cache: 'no-store',
    }
  );

  if (!Array.isArray(recipes) || recipes.length === 0) {
    return null;
  }

  return selectRandom(recipes);
};

/**
 * Records a generate button click event for analytics
 * Silently fails to avoid blocking user experience
 * @returns {Promise<void>}
 */
export const trackGenerateClick = async (): Promise<void> => {
  await fetchFromAPI('/generator', { method: 'GET' });
};

/**
 * Records a page view event for analytics tracking
 * Silently fails to avoid blocking user experience
 * @returns {Promise<void>}
 */
export const trackPageView = async (): Promise<void> => {
  await fetchFromAPI('/generator/pageViews', { method: 'GET' });
};

/**
 * Fetches featured meals from the API
 * @param {string} type optional meal type filter (e.g., 'Meal' or 'Snack')
 * @returns {Promise<Recipe[] | null>} Array of featured recipes or null on error
 */
export const fetchFeaturedMeals = async (type?: string): Promise<Recipe[] | null> => {
  return fetchFromAPI<Recipe[]>('/recipe/getFeatured', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type }),
    next: { revalidate: 300 },
  });
};

export const fetchRecipeBySlug = async (slug: string): Promise<Recipe | null> => {
  return fetchFromAPI<Recipe>(`/recipe/${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });
};

export const fetchRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  const params = new URLSearchParams({
    type: '',
    tag: category,
  });

  const recipes = await fetchFromAPI<Recipe[]>(`/recipe/filter?${params.toString()}`, {
    cache: 'no-store',
  });

  return Array.isArray(recipes) ? recipes : [];
};
