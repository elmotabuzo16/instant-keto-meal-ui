import Link from 'next/link';
import type { ReactElement } from 'react';
import type { Recipe } from '@/components/generator/types';

interface FeaturedMealsProps {
  meals: Recipe[];
}

const FeaturedMeals = ({ meals }: FeaturedMealsProps): ReactElement | null => {
  if (!meals || meals.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="mb-8 text-center font-serif text-4xl font-semibold text-slate-950">
        Featured Meals
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:gap-8">
        {meals.map((meal, index) => (
          <Link
            key={`${meal.slug || 'featured-meal'}-${index}`}
            href={`/recipe/${meal.slug}`}
            className="relative block overflow-hidden rounded bg-white shadow-lg transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#fec445]"
          >
            <div className="h-32 w-full bg-gray-100 sm:h-40 lg:h-64">
              {meal.main_image ? (
                <img
                  src={meal.main_image}
                  alt={meal.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-100 text-center text-[10px] text-slate-600 sm:text-sm">
                  Image not available
                </div>
              )}
            </div>

            <div className="p-2 sm:p-4 lg:p-5">
              <div className="mb-2 flex items-center justify-between gap-1 sm:mb-3">
                <div className="flex min-w-0 items-center gap-3">
                  {meal.type && (
                    <span className="truncate text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">{meal.type}</span>
                  )}
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-[9px] text-slate-400 sm:text-xs">
                  <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                  {meal.totalTime ?? ''}
                </span>
              </div>

              <h3 className="mb-1 line-clamp-2 text-xs font-semibold text-slate-900 sm:mb-2 sm:text-base lg:text-xl">{meal.name}</h3>

              <p className="mb-3 hidden text-sm text-slate-600 sm:line-clamp-2 lg:mb-4 lg:line-clamp-3">{meal.description ?? ''}</p>

              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2 overflow-hidden text-[9px] text-slate-600 sm:text-xs lg:gap-3">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <svg className="h-3 w-3 text-orange-500 sm:h-3.5 sm:w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.5 2.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73s-3.63-1.67-3.63-3.73l.03-.36A8.26 8.26 0 0 0 4 13.6C4 18.24 7.76 22 12.4 22s8.4-3.76 8.4-8.4c0-5.66-2.72-9.69-7.3-12.93zM12.1 19c-1.84 0-3.33-1.45-3.33-3.24 0-1.68 1.08-2.85 2.89-3.22 1.82-.37 3.7-1.25 4.75-2.66.4 1.32.61 2.7.61 4.07 0 2.78-2.28 5.05-5.02 5.05z" />
                    </svg>
                    {meal.calories ?? '-'} Calories
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMeals;
