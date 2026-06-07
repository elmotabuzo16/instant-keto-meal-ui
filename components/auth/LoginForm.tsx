'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, type ReactElement, useEffect, useState } from 'react';
import { authenticate, getRecipeSlug, isAuth, signin } from '@/lib/authAction';
import AuthNotice from './AuthNotice';

type LoginFormState = {
  emailOrUsername: string;
  password: string;
  error: string;
  loading: boolean;
};

const LoginForm = (): ReactElement => {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormState>({
    emailOrUsername: '',
    password: '',
    error: '',
    loading: false,
  });

  useEffect(() => {
    if (isAuth()) {
      router.replace('/');
    }
  }, [router]);

  const handleChange =
    (field: keyof Pick<LoginFormState, 'emailOrUsername' | 'password'>) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setValues((currentValues) => ({
        ...currentValues,
        error: '',
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setValues((currentValues) => ({ ...currentValues, error: '', loading: true }));

    const data = await signin({
      emailOrUsername: values.emailOrUsername,
      password: values.password,
    });

    if (data.error) {
      setValues((currentValues) => ({
        ...currentValues,
        error: data.error ?? 'Unable to login. Please try again.',
        loading: false,
      }));
      return;
    }

    authenticate(data);

    const savedRecipe = getRecipeSlug();
    router.push(savedRecipe && savedRecipe.recipeSlug ? `/recipe/${savedRecipe.recipeSlug}` : '/');
  };

  return (
    <div className="mx-auto w-full max-w-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
          Welcome Back
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-950">
          Login to your account
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in to continue planning simple keto meals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {values.error && <AuthNotice message={values.error} tone="error" />}
        {values.loading && <AuthNotice message="Logging in..." tone="info" />}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-900">
            Username / Email Address
          </span>
          <input
            type="text"
            value={values.emailOrUsername}
            onChange={handleChange('emailOrUsername')}
            placeholder="Enter username or email"
            required
            className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-900">
            Password
          </span>
          <input
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            placeholder="Enter password"
            required
            className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
          />
        </label>

        <button
          type="submit"
          disabled={values.loading}
          className="w-full border border-[#2b170f] bg-[#4A2518] px-4 py-3 text-sm font-black uppercase tracking-[0.16em] !text-white transition hover:bg-[#3A1C12] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {values.loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-8 space-y-5 text-center text-sm">
        <Link href="/login/password/forgot" className="inline-block font-semibold text-[#4A2518] underline underline-offset-4">
          Forgot your password?
        </Link>
        <p className="text-slate-600">
          New here?{' '}
          <Link href="/register" className="font-semibold text-[#4A2518] underline underline-offset-4">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
