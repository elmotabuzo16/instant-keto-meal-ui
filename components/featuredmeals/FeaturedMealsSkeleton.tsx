import type { ReactElement } from 'react';

const skeletonCards = Array.from({ length: 4 }, (_, index) => index);

const SkeletonBar = ({ className = "" }: { className?: string }): ReactElement => (
  <span className={`block rounded-full bg-slate-200 ${className}`} />
);

const FeaturedMealsSkeleton = (): ReactElement => {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Featured meals loading">
      <h2 className="mb-8 text-center font-serif text-4xl font-semibold text-slate-950">
        Featured Meals
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:gap-8">
        {skeletonCards.map((card) => (
          <div
            key={card}
            className="overflow-hidden rounded bg-white shadow-lg"
          >
            <div className="h-32 w-full animate-pulse bg-slate-200 sm:h-40 lg:h-64" />
            <div className="space-y-2 p-2 sm:space-y-4 sm:p-5">
              <SkeletonBar className="h-3 w-10 animate-pulse sm:h-4 sm:w-16" />
              <SkeletonBar className="h-5 w-full animate-pulse sm:h-8 sm:w-48 sm:max-w-full" />
              <div className="space-y-2 pt-1 sm:space-y-3 sm:pt-2">
                <SkeletonBar className="h-3 w-12 animate-pulse sm:h-4 sm:w-32" />
                <SkeletonBar className="h-3 w-full animate-pulse sm:h-4 sm:w-52 sm:max-w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMealsSkeleton;
