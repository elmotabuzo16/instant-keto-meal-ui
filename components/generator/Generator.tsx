'use client';

import { useState, useRef, type FormEvent } from 'react';
import { ConfigProvider, Select } from 'antd';
import GeneratedRecipe from './GeneratedRecipe';
import Loader from './Loader';
import type { Recipe } from './types';
import { generateNewFood, trackGenerateClick } from '@/lib/generatorAction';

interface GeneratorProps {
  tagOptions: string[];
}

const Generator = ({ tagOptions }: GeneratorProps) => {
  const [mealType, setMealType] = useState('Meal');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [openMealPlan, setOpenMealPlan] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recipeRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setRecipe(null);
    setError(null);
    setOpenMealPlan(true);

    try {
      // Track analytics
      await trackGenerateClick();

      // Fetch recipe
      const generatedRecipe = await generateNewFood(mealType, tags);

      if (generatedRecipe) {
        setRecipe(generatedRecipe);
      } else {
        setError(
          'No meals available for this category. Please try another combination.'
        );
      }
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);

      // Scroll to recipe section
      setTimeout(() => {
        recipeRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          colorPrimary: '#4A2518',
          colorPrimaryHover: '#3A1C12',
          colorPrimaryActive: '#2b170f',
        },
        components: {
          Select: {
            activeBorderColor: '#4A2518',
            hoverBorderColor: '#4A2518',
            optionSelectedBg: '#F4F2F0',
            optionSelectedColor: '#2b170f',
          },
        },
      }}
    >
    <div className="w-full space-y-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-3 block">Type of Meal</span>
              <Select
                value={mealType}
                onChange={(value) => setMealType(value)}
                disabled={loading}
                className="w-full"
                size="large"
                options={[
                  { value: 'Meal', label: 'Meal' },
                  { value: 'Snack', label: 'Snacks or Desserts' },
                ]}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-3 block">Category</span>
              <Select
                value={tags}
                onChange={(value) => setTags(value)}
                disabled={loading}
                className="w-full"
                size="large"
                showSearch
                optionFilterProp="label"
                options={[
                  { value: '', label: 'All' },
                  ...tagOptions.map((tagOption) => ({
                    value: tagOption,
                    label: tagOption,
                  })),
                ]}
              />
            </label>
          </div>

          <div className="flex justify-center">
            <button
              id="recipeDiv"
              type="submit"
              disabled={loading}
              className="relative inline-flex min-w-48 items-center justify-center rounded border-2 border-[#2b170f] bg-[#4A2518] px-8 py-3 text-sm font-black uppercase tracking-wide !text-white shadow-[4px_4px_0_#fec445] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#3A1C12] hover:!text-white hover:shadow-[6px_6px_0_#fec445] disabled:translate-x-0 disabled:translate-y-0 disabled:border-slate-400 disabled:bg-slate-400 disabled:shadow-[4px_4px_0_#cbd5e1]"
            >
              {!loading && <span>Generate Food</span>}
              {loading && (
                <span className="flex items-center gap-3">
                  <span>Generating</span>
                  <span className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

        <div
          ref={recipeRef}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
        {loading && <Loader />}

        {openMealPlan && !loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {openMealPlan && !loading && recipe && (
          <div>
            <GeneratedRecipe recipe={recipe} />
          </div>
        )}

        {!openMealPlan && (
          <div className="flex min-h-16 items-center justify-center text-center">
            <p className="text-sm text-slate-600">
              Click the Generate Food button above to reveal the recipe.
            </p>
          </div>
        )}
        </div>
      </div>

    </div>
    </ConfigProvider>
  );
};

export default Generator;
