const defaultOrigin = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://127.0.0.1:5000/api';

export const API = defaultOrigin;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Instant Keto Meal';
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? 'https://www.instantketomeal.com';
export const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID ?? '253159533892465';
export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
  '307579424723-0qm1jgk7t6jvd3krgrklepe60m7sdgik.apps.googleusercontent.com';
