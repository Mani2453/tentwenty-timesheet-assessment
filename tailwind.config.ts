import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#1c64f2',
          700: '#1a56db',
          800: '#1e429f',
        },
        gray: {
          50: '#f9fafb',
          60: "#f8f8f8",
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111928',
        },
      },
      boxShadow: {
        subtle: "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
      },
    },
  },
  plugins: [],
}
export default config;
