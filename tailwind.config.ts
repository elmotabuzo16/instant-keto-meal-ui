import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'underline': 'underline 0.3s ease forwards',
      },
      keyframes: {
        underline: {
          'from': {
            width: '0',
          },
          'to': {
            width: '100%',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
