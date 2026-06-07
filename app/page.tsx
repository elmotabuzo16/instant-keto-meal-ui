import Link from "next/link";
import { Suspense, type ReactElement } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Generator from "@/components/generator/Generator";
import FeaturedMealsSection from "@/components/featuredmeals";
import FeaturedMealsSkeleton from "@/components/featuredmeals/FeaturedMealsSkeleton";
import { fetchTags } from "@/lib/generatorAction";
import { APP_NAME } from "@/lib/config";
import { buildSeoMetadata, defaultSeoDescription } from "@/lib/seo";

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

export const metadata = buildSeoMetadata({
  title: `${APP_NAME} | Low Carb & Keto Meals`,
  description: defaultSeoDescription,
  path: '/',
});

export default async function Home(): Promise<ReactElement> {
  const tags = await fetchTags();

  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <section aria-label="Recipes by course" className="mb-14">
            <h2 className="mb-8 text-center font-serif text-4xl font-semibold text-slate-950">
              Recipes By Course
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-5">
              {featuredCategories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group block text-center"
                >
                  <span
                    className="mx-auto block aspect-square w-full max-w-32 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-sm transition duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0_#fec445] sm:max-w-36"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <span className="mt-3 block font-serif text-base font-semibold text-slate-950 transition-colors group-hover:text-emerald-700 sm:text-xl">
                    {category.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#F4F2F0] py-12">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <section id="homepage" className="mb-12 text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
                  Not sure what keto meal to make?
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600">
                  Instant Keto Meal helps you find low-carb meal ideas fast, with simple filters and nutrition details to make planning easier.
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Choose a meal type, pick a category, and get a keto-friendly recipe in seconds. <strong>Let&apos;s get cooking!</strong>
                </p>
              </section>

              <section id="generator">
                <Generator tagOptions={tags} />
              </section>
            </div>
          </div>

          <Suspense
            fallback={(
              <section className="relative left-1/2 w-screen -translate-x-1/2 bg-zinc-50 py-14">
                <FeaturedMealsSkeleton />
              </section>
            )}
          >
            <FeaturedMealsSection />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
