'use client';

import { useRouter } from 'next/navigation';
import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  useMemo,
  useState,
} from 'react';
import { favoriteRecipe } from '@/lib/favoriteAction';
import { isAuth } from '@/lib/authAction';

type SaveRecipeButtonProps = {
  recipeId?: string;
  recipeSlug: string;
  initialSaved?: boolean;
  mode?: 'button' | 'card';
  showText?: boolean;
};

const SaveRecipeButton = ({
  recipeId,
  recipeSlug,
  initialSaved = false,
  mode = 'button',
  showText = true,
}: SaveRecipeButtonProps): ReactElement => {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const isCardMode = mode === 'card';

  const label = useMemo(() => {
    if (loading) return 'Saving...';
    return saved ? 'Saved' : 'Save';
  }, [loading, saved]);

  const handleSave = async (event: MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuth()) {
      window.localStorage.setItem('current_recipe', JSON.stringify({ recipeSlug }));
      router.push('/login');
      return;
    }

    if (!recipeId || loading) {
      return;
    }

    const nextSaved = !saved;
    setSaved(nextSaved);
    setLoading(true);

    const data = await favoriteRecipe(recipeId);

    if (data.error) {
      setSaved(saved);
    }

    setLoading(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      void handleSave(event as unknown as MouseEvent<HTMLElement>);
    }
  };

  const className = isCardMode
    ? 'group/save relative inline-flex items-center justify-center gap-1.5 border border-red-200 bg-white px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-red-600 shadow-sm transition hover:bg-red-50'
    : 'group/save relative inline-flex items-center justify-center gap-2 border border-red-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70';
  const iconClassName = saved ? 'text-red-600' : 'text-red-500';
  const tooltipText = saved ? 'Saved recipe' : 'Save this recipe';
  const heartIcon = (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 ${iconClassName}`}
      fill={saved ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
  const content = (
    <>
      {heartIcon}
      {showText && <span>{label}</span>}
    </>
  );

  if (isCardMode) {
    return (
      <span
        role="button"
        tabIndex={0}
        aria-label={tooltipText}
        title={tooltipText}
        onClick={handleSave}
        onKeyDown={handleKeyDown}
        className={className}
      >
        {content}
        <span className="pointer-events-none absolute -top-9 right-0 z-10 whitespace-nowrap border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold normal-case tracking-normal text-slate-700 opacity-0 shadow-sm transition group-hover/save:opacity-100">
          {tooltipText}
        </span>
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={loading}
      aria-label={tooltipText}
      title={tooltipText}
      onClick={handleSave}
      className={className}
    >
      {content}
      <span className="pointer-events-none absolute -top-9 right-0 z-10 whitespace-nowrap border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold normal-case tracking-normal text-slate-700 opacity-0 shadow-sm transition group-hover/save:opacity-100">
        {tooltipText}
      </span>
    </button>
  );
};

export default SaveRecipeButton;
