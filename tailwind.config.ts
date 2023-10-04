import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'primary': '#fefefe',
        'dark': '#050505',
      },
      fontFamily: {
        raleway: ['var(--font-raleway)'],
        young: ['var(--font-young)'],
      },
      keyframes: {
        point: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000% 0' },
          '100%': { backgroundPosition: '1000% 0' },
        }
      },
      animation: {
        point: 'point 2s infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
export default config
