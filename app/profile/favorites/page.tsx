import type { ReactElement } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SavedRecipes from '@/components/profile/SavedRecipes';
import { APP_NAME } from '@/lib/config';
import { buildSeoMetadata } from '@/lib/seo';

export const metadata = buildSeoMetadata({
  title: `Saved Recipes | ${APP_NAME}`,
  description: 'View your saved keto meals and snacks on Instant Keto Meal.',
  path: '/profile/favorites',
});

export default function FavoritesPage(): ReactElement {
  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <section className="bg-[#F4F2F0]">
          <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
              Profile
            </p>
            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Saved Recipes
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              Keep track of the keto meals and snacks you want to cook later.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <SavedRecipes />
        </section>
      </main>
      <Footer />
    </>
  );
}
