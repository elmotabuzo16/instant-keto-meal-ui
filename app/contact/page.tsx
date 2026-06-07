import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { APP_NAME } from '@/lib/config';
import { buildSeoMetadata } from '@/lib/seo';

export const metadata = buildSeoMetadata({
  title: `Contact | ${APP_NAME}`,
  description:
    'Contact Instant Keto Meal with questions, feedback, recipe suggestions, or support requests.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <section className="bg-[#F4F2F0]">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
              Contact
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Send us a note.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Share feedback, report an issue, or ask a question about Instant Keto Meal.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside className="border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="font-serif text-3xl font-semibold text-slate-950">
              We read every message
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-700">
              Tell us what would make meal planning easier, which recipe categories you want next, or where something is not working as expected.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              For medical or nutrition decisions, please rely on guidance from a qualified professional.
            </p>
          </aside>

          <section className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-3xl font-semibold text-slate-950">
              Contact form
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
