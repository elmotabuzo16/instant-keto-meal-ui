import { API } from './config';
import { getAuthToken } from './authAction';
import type { Recipe } from '@/components/generator/types';

type FavoriteResponse = {
  error?: string;
  message?: string;
  [key: string]: unknown;
};

const getAuthHeaders = (): HeadersInit | null => {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export const favoriteRecipe = async (foodId: string): Promise<FavoriteResponse> => {
  const headers = getAuthHeaders();

  if (!headers) {
    return { error: 'Please login to save recipes.' };
  }

  try {
    const response = await fetch(`${API}/recipe/favorite`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ foodId }),
    });

    const data = (await response.json()) as FavoriteResponse;

    if (!response.ok && !data.error) {
      return { error: `Request failed with status ${response.status}` };
    }

    return data;
  } catch {
    return { error: 'Unable to save this recipe. Please try again.' };
  }
};

export const getFavoriteRecipes = async (): Promise<Recipe[]> => {
  const headers = getAuthHeaders();

  if (!headers) {
    return [];
  }

  try {
    const response = await fetch(`${API}/recipe/userfavorites`, {
      method: 'GET',
      headers,
    });

    const data = (await response.json()) as Recipe[] | { error?: string };

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};
