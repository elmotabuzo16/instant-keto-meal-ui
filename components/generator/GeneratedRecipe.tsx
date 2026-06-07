import Link from 'next/link';
import type { ReactElement } from 'react';
import type { Recipe } from './types';

interface GeneratedRecipeProps {
  recipe: Recipe;
}

const formatNutritionValue = (value?: string | number): string => {
  if (value === undefined || value === null || value === '') {
    return '-';
  }

  return String(value).replace(/\bgrams?\b/gi, 'g');
};

const GeneratedRecipe = ({ recipe }: GeneratedRecipeProps): ReactElement | null => {
  if (!recipe?.slug) return null;

  return (
    <Link
      id="generated__recipe"
      href={`/recipe/${recipe.slug}`}
      className="group mx-auto block max-w-5xl overflow-hidden rounded bg-white text-inherit shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#fec445]"
    >
      <div className="overflow-hidden">
        {recipe.main_image ? (
          <img
            src={recipe.main_image}
            alt={recipe.name}
            className="h-72 w-full object-cover transition duration-200 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-slate-100 text-slate-600">
            Image not available
          </div>
        )}
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-3 lg:p-12">
        <div className="lg:col-span-2">
          <h1 className="mb-3 font-serif text-3xl font-semibold text-slate-950 lg:text-4xl">
            {recipe.name}
          </h1>
          <div className="mb-4 flex items-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              {recipe.totalTime ?? '-'}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5 2.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73s-3.63-1.67-3.63-3.73l.03-.36A8.26 8.26 0 0 0 4 13.6C4 18.24 7.76 22 12.4 22s8.4-3.76 8.4-8.4c0-5.66-2.72-9.69-7.3-12.93zM12.1 19c-1.84 0-3.33-1.45-3.33-3.24 0-1.68 1.08-2.85 2.89-3.22 1.82-.37 3.7-1.25 4.75-2.66.4 1.32.61 2.7.61 4.07 0 2.78-2.28 5.05-5.02 5.05z" />
              </svg>
              {recipe.calories ?? '-'} Calories
            </span>
          </div>

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Ingredients</h2>
              <ul className="grid gap-2">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={ing._id || i}
                    className="flex min-w-0 items-center gap-2 text-sm text-slate-700"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span className="truncate">
                      {ing.size ? `${ing.size} ${ing.name}` : ing.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <span className="mt-8 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4">
            Click here to see the full cooking instructions
          </span>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Nutrition</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex justify-between gap-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3177BB]" />
                  Protein
                </span>
                <span className="font-semibold">{formatNutritionValue(recipe.protein)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F94642]" />
                  Carbs
                </span>
                <span className="font-semibold">{formatNutritionValue(recipe.carbs)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FDA120]" />
                  Fat
                </span>
                <span className="font-semibold">{formatNutritionValue(recipe.fat)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Link>
  );
};

export default GeneratedRecipe;
