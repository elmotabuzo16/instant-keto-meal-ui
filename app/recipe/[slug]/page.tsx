import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SaveRecipeButton from '@/components/recipe/SaveRecipeButton';
import { fetchFeaturedMeals, fetchRecipeBySlug, fetchRecipesByCategory } from '@/lib/generatorAction';
import { APP_NAME } from '@/lib/config';
import { buildSeoMetadata, getCanonicalUrl } from '@/lib/seo';
import type { Recipe } from '@/components/generator/types';

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const formatValue = (value?: string | number) => {
  if (value === undefined || value === null || value === '') {
    return '-';
  }

  return String(value)
    .replace(/\bmilligrams?\b/gi, 'mg')
    .replace(/\bgrams?\b/gi, 'g');
};

const formatOptionalValue = (value?: string | number): string => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  return String(value)
    .replace(/\bmilligrams?\b/gi, 'mg')
    .replace(/\bgrams?\b/gi, 'g');
};

const getTagName = (tag: NonNullable<Recipe['tags']>[number]): string => {
  return typeof tag === 'string' ? tag : tag.name;
};

const getRelatedRecipes = async (recipe: Recipe): Promise<Recipe[]> => {
  const primaryTag = recipe.tags?.[0] ? getTagName(recipe.tags[0]) : '';
  const taggedRecipes = primaryTag ? await fetchRecipesByCategory(primaryTag) : [];
  const relatedRecipes = taggedRecipes.filter((relatedRecipe) => relatedRecipe.slug !== recipe.slug);

  if (relatedRecipes.length >= 3) {
    return relatedRecipes.slice(0, 3);
  }

  const featuredRecipes = await fetchFeaturedMeals(recipe.type);
  const existingSlugs = new Set([recipe.slug, ...relatedRecipes.map((relatedRecipe) => relatedRecipe.slug)]);
  const fallbackRecipes = Array.isArray(featuredRecipes)
    ? featuredRecipes.filter((featuredRecipe) => !existingSlugs.has(featuredRecipe.slug))
    : [];

  return [...relatedRecipes, ...fallbackRecipes].slice(0, 3);
};

const getRecipeIngredientText = (ingredient: NonNullable<Recipe['ingredients']>[number]): string => {
  return [ingredient.size, ingredient.unit, ingredient.name].filter(Boolean).join(' ');
};

const buildRecipeJsonLd = (recipe: Recipe, tags: string[]) => {
  const ingredients = recipe.ingredients?.map(getRecipeIngredientText).filter(Boolean) ?? [];
  const instructions =
    recipe.directions?.map((direction, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: direction.description,
      image: direction.image,
    })) ?? [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: recipe.main_image ? [recipe.main_image] : undefined,
    url: getCanonicalUrl(`/recipe/${recipe.slug}`),
    recipeCategory: recipe.type,
    keywords: tags.join(', '),
    recipeYield: recipe.servingCount ? String(recipe.servingCount) : undefined,
    totalTime: recipe.totalTime,
    recipeIngredient: ingredients.length > 0 ? ingredients : undefined,
    recipeInstructions: instructions.length > 0 ? instructions : undefined,
    nutrition: {
      '@type': 'NutritionInformation',
      calories: recipe.calories ? `${recipe.calories} calories` : undefined,
      carbohydrateContent: formatValue(recipe.carbs),
      proteinContent: formatValue(recipe.protein),
      fatContent: formatValue(recipe.fat),
    },
  };
};

export async function generateMetadata({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await fetchRecipeBySlug(slug);

  if (!recipe) {
    return buildSeoMetadata({
      title: `Recipe Not Found | ${APP_NAME}`,
      description: 'This keto recipe could not be found.',
      path: `/recipe/${slug}`,
    });
  }

  const tags = recipe.tags?.map(getTagName).filter(Boolean) ?? [];

  return buildSeoMetadata({
    title: `${recipe.name} | ${APP_NAME}`,
    description:
      recipe.description ??
      `View ${recipe.name} ingredients, nutrition facts, and step-by-step keto cooking instructions.`,
    path: `/recipe/${recipe.slug}`,
    image: recipe.main_image,
    keywords: [
      recipe.name,
      `${recipe.name} keto recipe`,
      ...tags.map((tag) => `${tag} keto recipes`),
      'keto recipes',
      'low-carb meals',
      'instant keto meal',
    ],
    type: 'article',
  });
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await fetchRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const servings = recipe.servings ?? [];
  const directions = recipe.directions ?? [];
  const ingredients = recipe.ingredients ?? [];
  const tags = recipe.tags?.map(getTagName).filter(Boolean) ?? [];
  const relatedRecipes = await getRelatedRecipes(recipe);
  const recipeJsonLd = buildRecipeJsonLd(recipe, tags);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recipeJsonLd),
        }}
      />
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <article>
          <section className="bg-[#F4F2F0]">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
              <div className="self-center">
                {(recipe.type || recipe.viewCount !== undefined) && (
                  <div className="flex flex-wrap items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
                    {recipe.type && <span>{recipe.type}</span>}
                    {recipe.viewCount !== undefined && recipe.viewCount !== null && (
                      <span className="tracking-normal text-slate-500">
                        {recipe.viewCount} Views
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h1 className="font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                    {recipe.name}
                  </h1>
                  <SaveRecipeButton
                    recipeId={recipe._id}
                    recipeSlug={recipe.slug}
                    showText={false}
                  />
                </div>
                {recipe.description && (
                  <p className="mt-6 text-base leading-8 text-slate-600">
                    {recipe.description}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
                  <span className="border border-slate-200 bg-white px-3 py-2">
                    {recipe.totalTime ?? '-'}
                  </span>
                  <span className="border border-slate-200 bg-white px-3 py-2">
                    {recipe.calories ?? '-'} Calories
                  </span>
                  {recipe.servingCount && (
                    <span className="border border-slate-200 bg-white px-3 py-2">
                      {recipe.servingCount} Servings
                    </span>
                  )}
                </div>
                {tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={{
                          pathname: '/recipes',
                          query: { category: tag },
                        }}
                        className="border border-[#4A2518]/20 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#4A2518] transition hover:border-[#4A2518] hover:shadow-[3px_3px_0_#fec445]"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="overflow-hidden border border-white bg-white shadow-[8px_8px_0_#fec445]">
                {recipe.main_image ? (
                  <img
                    src={recipe.main_image}
                    alt={recipe.name}
                    className="h-80 w-full object-cover lg:h-full"
                  />
                ) : (
                  <div className="flex h-80 items-center justify-center bg-slate-100 text-slate-600">
                    Image not available
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
            <div className="space-y-10">
              <section className="border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-3xl font-semibold text-slate-950">
                  Ingredients
                </h2>
                {ingredients.length > 0 ? (
                  <ul className="mt-6 space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <li
                        key={ingredient._id ?? `${ingredient.name}-${index}`}
                        className="flex items-center gap-4 border-b border-slate-100 pb-3 text-sm text-slate-700 last:border-b-0 last:pb-0"
                      >
                        {ingredient.image ? (
                          <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            className="h-14 w-14 shrink-0 border border-slate-100 bg-slate-50 object-contain p-1"
                          />
                        ) : (
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-slate-100 bg-slate-50">
                            <span className="h-2 w-2 rounded-full bg-[#4A2518]" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="font-semibold text-slate-950">{ingredient.name}</span>
                          {(ingredient.size || ingredient.unit) && (
                            <span className="block text-slate-500">
                              {ingredient.size} {ingredient.unit}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">No ingredients available.</p>
                )}
              </section>

              <section className="border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-3xl font-semibold text-slate-950">
                  Instructions
                </h2>
                {directions.length > 0 ? (
                  <ol className="mt-6 space-y-5">
                    {directions.map((direction, index) => (
                      <li
                        key={direction._id ?? `${direction.description}-${index}`}
                        className="flex gap-4 text-sm leading-7 text-slate-700"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#4A2518] text-sm font-black text-white shadow-[3px_3px_0_#fec445]">
                          {index + 1}
                        </span>
                        <span className="pt-1">{direction.description}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">No cooking instructions available.</p>
                )}
              </section>
            </div>

            <aside className="space-y-6">
              <section className="border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-slate-950">
                  Nutrition
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between gap-4">
                    <span>Calories</span>
                    <span className="font-semibold">{recipe.calories ?? '-'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Protein</span>
                    <span className="font-semibold">{formatValue(recipe.protein)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Carbs</span>
                    <span className="font-semibold">{formatValue(recipe.carbs)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Fat</span>
                    <span className="font-semibold">{formatValue(recipe.fat)}</span>
                  </div>
                </div>
              </section>

              <div className="border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-slate-950">
                  Sponsored
                </h2>
                <div className="mt-5">
                  <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-7167271672127418"
                    data-ad-slot="REPLACE_WITH_AD_SLOT"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  />
                  <Script id={`ads-push-${recipe.slug}`} strategy="afterInteractive">
                    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                  </Script>
                </div>
              </div>

              {servings.length > 0 && (
                <section className="border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="font-serif text-2xl font-semibold text-slate-950">
                    More Details
                  </h2>
                  <div className="mt-5 space-y-3 text-sm text-slate-700">
                    {servings.map((serving, index) => (
                      <div
                        key={serving._id ?? `${serving.name}-${index}`}
                        className="flex justify-between gap-4"
                      >
                        <span>{serving.name}</span>
                        <span className="font-semibold">
                          {[formatOptionalValue(serving.size), formatOptionalValue(serving.unit)]
                            .filter(Boolean)
                            .join(' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </section>

          {relatedRecipes.length > 0 && (
            <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
              <h2 className="text-center font-serif text-3xl font-semibold text-slate-950">
                Related Meals & Snacks
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {relatedRecipes.map((relatedRecipe, index) => (
                  <Link
                    key={`${relatedRecipe.slug}-${index}`}
                    href={`/recipe/${relatedRecipe.slug}`}
                    className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#4A2518] hover:shadow-[5px_5px_0_#fec445]"
                  >
                    <div className="h-40 overflow-hidden bg-slate-100">
                      {relatedRecipe.main_image ? (
                        <img
                          src={relatedRecipe.main_image}
                          alt={relatedRecipe.name}
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
                        <span>{relatedRecipe.type ?? 'Recipe'}</span>
                        <span>{relatedRecipe.calories ?? '-'} Calories</span>
                      </div>
                      <h3 className="mt-3 line-clamp-2 font-serif text-xl font-semibold text-slate-950">
                        {relatedRecipe.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
