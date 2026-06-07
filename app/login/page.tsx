import type { ReactElement } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import { APP_NAME } from '@/lib/config';
import { buildSeoMetadata, defaultSeoDescription } from '@/lib/seo';

export const metadata = buildSeoMetadata({
  title: `Login | ${APP_NAME}`,
  description: defaultSeoDescription,
  path: '/login',
});

export default function LoginPage(): ReactElement {
  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <section className="bg-[#F4F2F0]">
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
              Account
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <LoginForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
