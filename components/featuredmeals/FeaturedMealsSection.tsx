import type { ReactElement } from 'react';
import { fetchFeaturedMeals } from '@/lib/generatorAction';
import type { Recipe } from '@/components/generator/types';
import FeaturedMeals from './FeaturedMeals';

const FEATURED_MEAL_COUNT = 4;

const FeaturedMealsSection = async (): Promise<ReactElement | null> => {
  const data = await fetchFeaturedMeals('Meal');
  const featuredMeals: Recipe[] = Array.isArray(data)
    ? data.slice(0, FEATURED_MEAL_COUNT)
    : [];

  if (featuredMeals.length === 0) {
    return null;
  }

  const repeatedMeals = [...featuredMeals];
  let fallbackIndex = 0;

  while (repeatedMeals.length < FEATURED_MEAL_COUNT) {
    repeatedMeals.push(featuredMeals[fallbackIndex % featuredMeals.length]);
    fallbackIndex += 1;
  }

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-zinc-50 py-14">
      <FeaturedMeals meals={repeatedMeals} />
    </section>
  );
};

export default FeaturedMealsSection;
