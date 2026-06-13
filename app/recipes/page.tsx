import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchRecipesByCategory } from '@/lib/generatorAction';
import { recipeCategories } from '@/lib/recipeCategories';
import { APP_NAME } from '@/lib/config';
import { buildSeoMetadata, defaultSeoDescription } from '@/lib/seo';

type RecipesPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export async function generateMetadata({ searchParams }: RecipesPageProps) {
  const { category = '' } = await searchParams;

  if (category) {
    return buildSeoMetadata({
      title: `${category} Keto Recipes | ${APP_NAME}`,
      description: `Browse ${category.toLowerCase()} keto recipes with ingredients, nutrition details, and cooking instructions from Instant Keto Meal.`,
      path: `/recipes?category=${encodeURIComponent(category)}`,
      keywords: [
        `${category} keto recipes`,
        `${category} low-carb recipes`,
        `${category} keto meals`,
        'keto recipes',
        'low-carb meals',
        'instant keto meal',
      ],
    });
  }

  return buildSeoMetadata({
    title: `Keto Recipes | ${APP_NAME}`,
    description: defaultSeoDescription,
    path: '/recipes',
  });
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const { category = '' } = await searchParams;
  const recipes = category ? await fetchRecipesByCategory(category) : [];

  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <section className="bg-[#F4F2F0]">
          <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
              Recipes By Course
            </p>
            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              {category ? `${category} Recipes` : 'Keto Recipes'}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {category
                ? 'Browse keto-friendly recipe ideas in this category. Choose a recipe below to view the ingredients, nutrition details, and cooking instructions.'
                : 'Choose a category below to browse keto-friendly recipes by ingredient, cooking style, dessert type, or meal occasion.'}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          {!category ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {recipeCategories.map((recipeCategory) => (
                <Link
                  key={recipeCategory}
                  href={{
                    pathname: '/recipes',
                    query: { category: recipeCategory },
                  }}
                  className="border border-slate-200 bg-white p-5 text-center font-semibold text-slate-950 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#4A2518] hover:shadow-[5px_5px_0_#fec445]"
                >
                  {recipeCategory}
                </Link>
              ))}
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, index) => (
                <Link
                  key={`${recipe.slug}-${index}`}
                  href={`/recipe/${recipe.slug}`}
                  className="border border-slate-200 bg-white p-5 font-semibold text-slate-950 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#fec445]"
                >
                  {recipe.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-slate-950">
                No recipes found
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                There are no recipes available for this category yet. Try another course from the homepage.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
