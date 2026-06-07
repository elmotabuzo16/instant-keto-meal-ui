'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ReactElement, useEffect, useState } from 'react';
import type { Recipe } from '@/components/generator/types';
import { isAuth } from '@/lib/authAction';
import { getFavoriteRecipes } from '@/lib/favoriteAction';

const SavedRecipes = (): ReactElement => {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuth()) {
      router.replace('/login');
      return;
    }

    const loadFavorites = async (): Promise<void> => {
      const data = await getFavoriteRecipes();
      setRecipes(data);
      setLoading(false);
    };

    void loadFavorites();
  }, [router]);

  if (loading) {
    return (
      <div className="border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
        Loading saved recipes...
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="font-serif text-2xl font-semibold text-slate-950">
          No saved recipes yet
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
          Save meals and snacks from recipe cards, then come back here to find them again.
        </p>
        <Link
          href="/recipes"
          className="mt-6 inline-flex border border-[#2b170f] bg-[#4A2518] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] !text-white transition hover:bg-[#3A1C12]"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe, index) => (
        <Link
          key={`${recipe.slug}-${index}`}
          href={`/recipe/${recipe.slug}`}
          className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#4A2518] hover:shadow-[5px_5px_0_#fec445]"
        >
          <div className="h-44 overflow-hidden bg-slate-100">
            {recipe.main_image ? (
              <img
                src={recipe.main_image}
                alt={recipe.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Image not available
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span>{recipe.type ?? 'Recipe'}</span>
              <span>{recipe.calories ?? '-'} Calories</span>
            </div>
            <h2 className="mt-3 line-clamp-2 font-serif text-xl font-semibold text-slate-950">
              {recipe.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SavedRecipes;
