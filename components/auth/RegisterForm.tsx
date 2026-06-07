'use client';

import Link from 'next/link';
import { type ChangeEvent, type FormEvent, type ReactElement, useState } from 'react';
import { signup } from '@/lib/authAction';
import AuthNotice from './AuthNotice';

type RegisterFormState = {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  success: string;
  loading: boolean;
  showForm: boolean;
};

const RegisterForm = (): ReactElement => {
  const [values, setValues] = useState<RegisterFormState>({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    success: '',
    loading: false,
    showForm: true,
  });

  const handleChange =
    (field: keyof Pick<RegisterFormState, 'username' | 'name' | 'email' | 'password' | 'confirmPassword'>) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setValues((currentValues) => ({
        ...currentValues,
        error: '',
        success: '',
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setValues((currentValues) => ({
        ...currentValues,
        error: 'Password does not match. Please try again.',
      }));
      return;
    }

    setValues((currentValues) => ({ ...currentValues, error: '', success: '', loading: true }));

    const data = await signup({
      username: values.username,
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (data.error) {
      setValues((currentValues) => ({
        ...currentValues,
        error: data.error ?? 'Unable to register. Please try again.',
        loading: false,
      }));
      return;
    }

    setValues({
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: 'Registration successful. Please go to login.',
      loading: false,
      showForm: false,
    });
  };

  return (
    <div className="mx-auto w-full max-w-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
          Create Account
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-950">
          Register for free
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Add a few details to start using Instant Keto Meal.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {values.success && <AuthNotice message={values.success} tone="success" />}
        {values.error && <AuthNotice message={values.error} tone="error" />}
        {values.loading && <AuthNotice message="Creating your account..." tone="info" />}
      </div>

      {values.showForm && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-900">Username</span>
            <input
              type="text"
              value={values.username}
              onChange={handleChange('username')}
              placeholder="Enter username"
              minLength={6}
              required
              className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-900">Name</span>
            <input
              type="text"
              value={values.name}
              onChange={handleChange('name')}
              placeholder="Enter name"
              required
              className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-900">Email Address</span>
            <input
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              placeholder="Enter email"
              required
              className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-900">Password</span>
            <input
              type="password"
              value={values.password}
              onChange={handleChange('password')}
              placeholder="Enter password"
              minLength={8}
              required
              className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-900">Confirm Password</span>
            <input
              type="password"
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder="Confirm password"
              minLength={8}
              required
              className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
            />
          </label>

          <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 border-slate-300 accent-[#4A2518]"
            />
            <span>
              I accept the{' '}
              <Link href="/terms" className="font-semibold text-[#4A2518] underline underline-offset-4">
                Terms and Conditions
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={values.loading}
            className="w-full border border-[#2b170f] bg-[#4A2518] px-4 py-3 text-sm font-black uppercase tracking-[0.16em] !text-white transition hover:bg-[#3A1C12] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {values.loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      )}

      <p className="mt-12 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#4A2518] underline underline-offset-4">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
