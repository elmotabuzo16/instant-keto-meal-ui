import type { ReactElement } from 'react';

const Loader = (): ReactElement => {
  return (
    <div className="mb-8 flex flex-col items-center justify-center gap-5 py-16">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-slate-900 animate-pulse" />
        <span className="h-3 w-3 rounded-full bg-slate-900 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <span className="h-3 w-3 rounded-full bg-slate-900 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>

      <p className="text-sm font-medium text-slate-600">
        Generating your recipe
      </p>
    </div>
  );
};

export default Loader;
