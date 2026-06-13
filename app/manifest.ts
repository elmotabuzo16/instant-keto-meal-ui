import type { MetadataRoute } from 'next';
import { APP_NAME } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${APP_NAME} - Keto Meal Generator`,
    short_name: APP_NAME,
    description:
      'Free keto meal generator and low-carb meal planner for quick US-friendly recipe ideas.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f766e',
    lang: 'en-US',
    categories: ['food', 'health', 'lifestyle'],
    icons: [
      {
        src: '/grains.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
