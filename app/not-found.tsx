import Link from 'next/link';
import type { ReactElement } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound(): ReactElement {
  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <section className="bg-[#F4F2F0]">
          <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
              404
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              This recipe went missing.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              The page you are looking for does not exist, may have moved, or is no longer available.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="border border-[#2b170f] bg-[#4A2518] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] !text-white transition hover:bg-[#3A1C12]"
              >
                Go Home
              </Link>
              <Link
                href="/recipes"
                className="border border-slate-300 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#4A2518] transition hover:border-[#4A2518] hover:shadow-[4px_4px_0_#fec445]"
              >
                Browse Recipes
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
