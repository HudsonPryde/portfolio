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
        'primary': '#f2e5de',
        'dark': '#141414',
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
          '0%': { backgroundPosition: '90% 0%' },
          '50%': { backgroundPosition: '11% 100%' },
          '100%': {backgroundPosition: '90% 0%'}
        },
        shake: {
          '0%': { transform: 'rotate(0deg)'},
          '25%': { transform: 'rotate(-30deg)'},
          '75%': { transform: 'rotate(30deg)'},
          '100%': { transform: 'rotate(0deg)'},
        }
      },
      animation: {
        point: 'point 2s infinite',
        shimmer: 'shimmer 3s ease infinite',
        shake: 'shake 0.5s ease-out'
      },
      transitionProperty: {
        width: 'width, height'
      }
    },
  },
  plugins: [],
}
export default config
