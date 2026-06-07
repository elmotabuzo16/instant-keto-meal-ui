'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendContactEmail, type ContactFormState } from '@/lib/contactAction';

const initialContactFormState: ContactFormState = {
  status: 'idle',
  message: '',
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    initialContactFormState
  );

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-semibold text-slate-900">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-slate-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={8}
          className="mt-2 w-full resize-y border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-950 outline-none transition focus:border-[#4A2518] focus:ring-2 focus:ring-[#fec445]/50"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-[#2b170f] bg-[#4A2518] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] !text-white transition hover:bg-[#3A1C12] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending ? 'Sending...' : 'Send Message'}
      </button>

      {state.message && (
        <p
          aria-live="polite"
          className={`text-sm font-semibold ${
            state.status === 'success' ? 'text-emerald-700' : 'text-red-700'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
