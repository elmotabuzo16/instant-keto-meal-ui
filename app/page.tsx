import Link from "next/link";
import { Suspense, type ReactElement } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Generator from "@/components/generator/Generator";
import FeaturedMealsSection from "@/components/featuredmeals";
import FeaturedMealsSkeleton from "@/components/featuredmeals/FeaturedMealsSkeleton";
import { fetchFeaturedMeals, fetchTags } from "@/lib/generatorAction";
import { APP_NAME } from "@/lib/config";
import { buildSeoMetadata, defaultSeoDescription } from "@/lib/seo";
import {
  buildFaqPageJsonLd,
  buildOrganizationJsonLd,
  buildWebApplicationJsonLd,
  buildWebsiteJsonLd,
  jsonLdScriptProps,
  type FaqItem,
} from "@/lib/structuredData";

const featuredCategories = [
  {
    title: "Avocado",
    href: "/recipes?category=Avocado",
    image:
      "https://keto-food-generator-bucket.s3.ap-northeast-1.amazonaws.com/20230606020310-5ac7e196ae71ee3dd8c810617bc94153-egg-avocado-salad.PNG",
  },
  {
    title: "Bacon Wrapped",
    href: "/recipes?category=Bacon Wrapped",
    image:
      "https://keto-food-generator-bucket.s3.ap-northeast-1.amazonaws.com/20230620102255-c85fe08f4508ec0a00068b223081d95e-bacon-wrapped-chicken.png",
  },
  {
    title: "Chicken",
    href: "/recipes?category=Chicken",
    image:
      "https://keto-food-generator-bucket.s3.ap-northeast-1.amazonaws.com/20230602024245-598a422ad0ffd14f0aaebd3e38c74011-Baked%20Chicken%20with%20Thyme%20and%20Sage%20Butter.png",
  },
  {
    title: "Chocolate",
    href: "/recipes?category=Chocolate",
    image:
      "https://keto-food-generator-bucket.s3.ap-northeast-1.amazonaws.com/20230527061200-035db3079cc2326c72da54030885770d-image_2023-05-27_143926786.png",
  },
  {
    title: "Grilled",
    href: "/recipes?category=Grilled",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Grilled_steak_with_baked_potato_and_gravy.jpg",
  },
  {
    title: "Pan Fried",
    href: "/recipes?category=Pan Fried",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pan-Fried_Shanghai_Noodles.jpg",
  },
];

const howItWorks = [
  {
    title: "Pick a meal type",
    text: "Choose a keto meal, snack, or dessert based on what you need right now.",
  },
  {
    title: "Filter by craving",
    text: "Use categories like chicken, avocado, bacon wrapped, grilled, or chocolate to narrow the ideas.",
  },
  {
    title: "Generate and cook",
    text: "Get a low-carb recipe idea with ingredients, nutrition details, and cooking instructions.",
  },
];

const budgetMeals = [
  "Egg muffins with cheese and spinach",
  "Tuna salad lettuce cups",
  "Ground beef taco bowls",
  "Chicken thighs with roasted frozen vegetables",
  "Sausage and cabbage skillet",
  "Cream cheese cucumber roll-ups",
];

const busyPlanningTips = [
  "Plan two repeatable breakfasts, two packable lunches, and three quick dinners for the week.",
  "Keep simple grocery staples on hand: eggs, rotisserie chicken, canned tuna, ground beef, salad kits, cheese, avocado, and frozen broccoli.",
  "Use generated recipes as starting points, then swap proteins or vegetables based on what is affordable near you.",
];

const homepageFaqs: FaqItem[] = [
  {
    question: "Is Instant Keto Meal a free keto meal planner?",
    answer:
      "Yes. Instant Keto Meal is a free keto meal generator and recipe idea tool that helps you find low-carb meals, snacks, and desserts without creating a paid meal plan.",
  },
  {
    question: "Can I use these keto meal ideas for weight loss?",
    answer:
      "Many people use keto meals to support weight-loss goals, but results depend on calories, portions, health history, and consistency. Use the nutrition details as a planning aid and ask a qualified professional for personal medical advice.",
  },
  {
    question: "What are easy keto meals for busy people?",
    answer:
      "Popular quick options include bunless burger bowls, egg bites, chicken salad lettuce wraps, taco bowls with cauliflower rice, steak salads, and garlic butter chicken with broccoli.",
  },
  {
    question: "Does the generator include low-carb meal ideas?",
    answer:
      "Yes. The generator focuses on keto-friendly and low-carb meal ideas with ingredients, cooking steps, and nutrition details where available.",
  },
  {
    question: "Are the recipes suitable for regular grocery stores?",
    answer:
      "The homepage examples focus on common ingredients such as eggs, chicken, ground beef, tuna, cheese, avocado, broccoli, salad greens, and cauliflower rice.",
  },
];

export const metadata = buildSeoMetadata({
  title: `${APP_NAME} | Free Keto Meal Generator & Low Carb Meal Planner`,
  description: defaultSeoDescription,
  path: '/',
  keywords: [
    'keto meal generator',
    'keto meal planner',
    'keto meal plan generator',
    'free keto meal planner',
    'easy keto meals',
    'quick keto meals',
    'low carb meal generator',
    'low carb meal planner',
    'keto meals for weight loss',
    'keto diet meal plan',
    'keto recipes',
  ],
});

export default async function Home(): Promise<ReactElement> {
  const [tags, popularMealsData] = await Promise.all([
    fetchTags(),
    fetchFeaturedMeals("Meal"),
  ]);
  const popularMeals = Array.isArray(popularMealsData)
    ? popularMealsData.filter((meal) => Boolean(meal.name)).slice(0, 6)
    : [];

  return (
    <>
      <script {...jsonLdScriptProps(buildWebsiteJsonLd())} />
      <script {...jsonLdScriptProps(buildOrganizationJsonLd())} />
      <script {...jsonLdScriptProps(buildWebApplicationJsonLd())} />
      <script {...jsonLdScriptProps(buildFaqPageJsonLd(homepageFaqs))} />
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#F4F2F0] py-12">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <section id="homepage" className="mb-12 text-center">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-800">
                  Free keto meal planner
                </p>
                <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Keto meal generator for quick, low-carb meal ideas
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600">
                  Instant Keto Meal helps home cooks find easy keto meals, low-carb recipes, and simple meal planning ideas without digging through endless recipe lists.
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Generate keto dinners, snacks, and desserts using familiar grocery staples like eggs, chicken, beef, avocado, cheese, broccoli, tuna, and cauliflower rice.
                </p>
              </section>

              <section id="generator">
                <Generator tagOptions={tags} />
              </section>
            </div>
          </div>

          <section className="py-14" aria-labelledby="how-it-works-title">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="how-it-works-title"
                className="font-serif text-3xl font-semibold text-slate-950 sm:text-4xl"
              >
                How the keto meal generator works
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Use it when you need fast keto meal ideas for breakfast, lunch, dinner, snacks, or a simple low-carb meal plan.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {howItWorks.map((item, index) => (
                <article
                  key={item.title}
                  className="border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center bg-emerald-800 text-sm font-black text-white shadow-[3px_3px_0_#fec445]">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-black text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {popularMeals.length > 0 && (
            <section className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="popular-meals-title">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
                  Keto search favorites
                </p>
                <h2
                  id="popular-meals-title"
                  className="mt-3 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl"
                >
                  Popular keto meal ideas
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  These quick keto meal ideas come from the recipe collection, so the list can stay fresh as new meals are added.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {popularMeals.map((meal, index) => {
                  const className =
                    "border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#fec445]";

                  return meal.slug ? (
                    <Link
                      key={`${meal.slug}-${index}`}
                      href={`/recipe/${meal.slug}`}
                      className={className}
                    >
                      {meal.name}
                    </Link>
                  ) : (
                    <div key={`${meal.name}-${index}`} className={className}>
                      {meal.name}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="grid gap-8 py-10 lg:grid-cols-2" aria-labelledby="budget-keto-title">
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              <h2
                id="budget-keto-title"
                className="font-serif text-3xl font-semibold text-slate-950"
              >
                Budget-friendly keto meals
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Keto does not have to mean expensive specialty foods. Start with affordable proteins, frozen vegetables, and simple fats that are easy to find in regular grocery stores.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {budgetMeals.map((meal) => (
                  <li key={meal} className="text-sm text-slate-700">
                    {meal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 bg-[#F4F2F0] p-6 shadow-sm" aria-labelledby="busy-americans-title">
              <h2
                id="busy-americans-title"
                className="font-serif text-3xl font-semibold text-slate-950"
              >
                Keto meal planning for busy people
              </h2>
              <div className="mt-5 space-y-4">
                {busyPlanningTips.map((tip) => (
                  <p key={tip} className="text-sm leading-7 text-slate-700">
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="recipes-by-course-title" className="py-12">
            <h2
              id="recipes-by-course-title"
              className="mb-8 text-center font-serif text-4xl font-semibold text-slate-950"
            >
              Browse keto recipes by course
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-5">
              {featuredCategories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group block text-center"
                >
                  <span className="mx-auto block aspect-square w-full max-w-32 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-sm transition duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0_#fec445] sm:max-w-36">
                    <img
                      src={category.image}
                      alt={`${category.title} keto recipe ideas`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="mt-3 block font-serif text-base font-semibold text-slate-950 transition-colors group-hover:text-emerald-700 sm:text-xl">
                    {category.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <Suspense
            fallback={(
              <section className="relative left-1/2 w-screen -translate-x-1/2 bg-zinc-50 py-14">
                <FeaturedMealsSkeleton />
              </section>
            )}
          >
            <FeaturedMealsSection />
          </Suspense>

          <section className="py-14" aria-labelledby="keto-faq-title">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="keto-faq-title"
                className="font-serif text-3xl font-semibold text-slate-950 sm:text-4xl"
              >
                Keto meal planner FAQ
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Quick answers for people comparing keto meal generators, low-carb recipes, and free meal planning tools.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-4xl divide-y divide-slate-200 border border-slate-200 bg-white shadow-sm">
              {homepageFaqs.map((faq) => (
                <article key={faq.question} className="p-6">
                  <h3 className="text-lg font-black text-slate-950">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
