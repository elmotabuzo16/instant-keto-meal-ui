'use server';

import { APP_NAME, DOMAIN } from '@/lib/config';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const getTextField = (formData: FormData, key: string): string => {
  const value = formData.get(key);

  return typeof value === 'string' ? value.trim() : '';
};

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function sendContactEmail(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = getTextField(formData, 'name');
  const email = getTextField(formData, 'email');
  const message = getTextField(formData, 'message');
  const website = getTextField(formData, 'website');

  if (website) {
    return {
      status: 'success',
      message: 'Thanks. Your message has been sent.',
    };
  }

  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'Please fill out your name, email, and message.',
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.',
    };
  }

  if (message.length < 10) {
    return {
      status: 'error',
      message: 'Please write a little more detail before sending.',
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? `Contact Form <onboarding@resend.dev>`;

  if (!apiKey || !to) {
    return {
      status: 'error',
      message:
        'Email is not configured yet. Add RESEND_API_KEY and CONTACT_EMAIL to enable contact form delivery.',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New contact message from ${APP_NAME}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Site: ${DOMAIN}`,
          '',
          message,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      return {
        status: 'error',
        message: 'The message could not be sent right now. Please try again later.',
      };
    }

    return {
      status: 'success',
      message: 'Thanks. Your message has been sent.',
    };
  } catch {
    return {
      status: 'error',
      message: 'The message could not be sent right now. Please try again later.',
    };
  }
}
