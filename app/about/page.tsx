import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/config';
import { buildSeoMetadata } from '@/lib/seo';

const principles = [
  {
    title: 'Fast ideas',
    text: 'Start with a meal type and category, then generate a keto-friendly recipe idea without digging through long lists.',
  },
  {
    title: 'Low-carb focus',
    text: 'Recipes are centered around keto eating patterns, with nutrition details surfaced so choices are easier to compare.',
  },
  {
    title: 'Flexible planning',
    text: 'Use each result as a starting point, then adjust portions, ingredients, and timing to fit your routine.',
  },
];

const steps = [
  'Choose whether you want a meal or snack.',
  'Pick a category, or leave it open for more variety.',
  'Generate a recipe and follow through to the full cooking instructions.',
];

export const metadata = buildSeoMetadata({
  title: `About Us | ${APP_NAME}`,
  description:
    'Learn how Instant Keto Meal helps you discover low-carb meal ideas, browse keto recipes, and simplify everyday keto meal planning.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <section className="bg-[#F4F2F0]">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
              About Instant Keto Meal
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A simpler way to decide what keto food to eat.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Instant Keto Meal helps you move from “I have no idea what to cook” to a practical low-carb recipe idea. It is built for quick inspiration, easy scanning, and everyday meal planning.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#fec445]"
              >
                <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <section className="border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="font-serif text-3xl font-semibold text-slate-950">
                How it works
              </h2>
              <ol className="mt-6 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-6 text-slate-700">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#4A2518] text-sm font-black text-white shadow-[3px_3px_0_#fec445]">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <aside className="border border-slate-200 bg-[#F4F2F0] p-8 shadow-sm">
              <h2 className="font-serif text-3xl font-semibold text-slate-950">
                Built for everyday keto
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-700">
                The goal is not to replace your own judgment or your preferred recipes. It is to give you a useful starting point when planning feels repetitive, rushed, or foggy.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Always adapt meals to your nutrition needs, allergies, budget, and medical guidance.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
