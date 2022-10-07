// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './layouts/**/*.tsx',
    './lib/**/*.ts',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      backgroundImage: {
        'light-banner': "url('/static/banner.png')",
        'dark-banner': "url('/static/darkBanner.png')",
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.cyan,
        gray: colors.neutral,
        'placeholder-light': '#F0F0F0',
        'placeholder-dark': '#252525',
        appColor: {
          50: '#e5db01',
          100: '#cbc201',
          200: '#b2aa01',
          300: '#989201',
          400: '#7f7a01',
          500: '#666100',
          600: '#4c4900',
          700: '#333100',
          800: '#191800',
          900: '#000000',
        },
        useGL: {
          main: '#008550',
          acent: '#047684',
          secondary: '#29347C',
          darkMain: '#66b696',
          darkAcent: '#4f9fa9',
          darkSecondary: '#6971a3',
        },
      },
      screens: {
        tablet: '640px',
        // => @media (min-width: 640px) { ... }

        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1280px',
        // => @media (min-width: 1280px) { ... }

        maxphone: { max: '639.5px' },

        maxsm: { max: '767.5px' },
        // => @media (max-width: 639px) { ... }
      },

      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            a: {
              color: theme('colors.useGL.main'),
              '&:hover': {
                color: `${theme('colors.useGL.darkMain')} !important`,
              },
              code: { color: theme('colors.appColor.200') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.slate.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.slate.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.slate.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.slate.900'),
            },
            pre: {
              backgroundColor: theme('colors.slate.800'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.slate.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.slate.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.slate.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.slate.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.slate.500'),
            },
            strong: { color: theme('colors.slate.600') },
            blockquote: {
              color: theme('colors.slate.900'),
              borderLeftColor: theme('colors.slate.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.300'),
            a: {
              color: theme('colors.useGL.darkMain'),
              '&:hover': {
                color: `${theme('colors.useGL.main')} !important`,
              },
              code: { color: theme('colors.appColor.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.slate.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.slate.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.slate.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.slate.100'),
            },
            pre: {
              backgroundColor: theme('colors.slate.800'),
            },
            code: {
              backgroundColor: theme('colors.slate.800'),
            },
            details: {
              backgroundColor: theme('colors.slate.800'),
            },
            hr: { borderColor: theme('colors.slate.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.slate.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.slate.400'),
            },
            strong: { color: theme('colors.slate.100') },
            thead: {
              th: {
                color: theme('colors.slate.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.slate.700'),
              },
            },
            blockquote: {
              color: theme('colors.slate.100'),
              borderLeftColor: theme('colors.slate.700'),
            },
          },
        },
      }),
      gridTemplateColumns: {
        16: 'repeat(auto-fit, minmax(186px, 1fr))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
