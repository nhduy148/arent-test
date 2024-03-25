/** @type {import('tailwindcss').Config} */
import lodash from 'lodash'

const fixedWidthHeightArray = Array.from(
  { length: 200 },
  (_, i) => `${i * 10}px`
)
const fixedWidthHeight = lodash.fromPairs(
  fixedWidthHeightArray.map((v, i) => [`fixed-${i * 10}`, v])
)

const sizeArray = Array.from({ length: 200 }, (_, i) => `${i * 4}px`)
const size = lodash.fromPairs(sizeArray.map((v, i) => [i, v]))

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '960px',
  xl: '1280px',
  '2xl': '1536px'
}

const containerSpacing = 16

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        screens: breakpoints
      },
      colors: {
        primary: {
          50: '#FDF7E3',
          100: '#FCEFBF',
          200: '#FBEA9A',
          300: '#FFCC21',
          400: '#FF963C',
          500: '#EA6C00',
          600: '#D45A00',
          700: '#B94B00',
          800: '#9F3D00',
          900: '#7F2E00'
        },
        secondary: {
          50: '#E3F4F7',
          100: '#BFEFF2',
          200: '#9AE6EC',
          300: '#8FE9D0',
          400: '#3CFFD1',
          500: '#00EAC8',
          600: '#00D4B3',
          700: '#00B9A0',
          800: '#009F8D',
          900: '#007F75'
        },
        gray: {
          350: '#707070',
          400: '#777777'
        },
        dark: {
          500: '#414141',
          600: '#2E2E2E'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Noto Sans JP', 'sans-serif']
      },
      backgroundImage: {
        achievement: "url('/assets/images/d01.jpg')"
      },
      width: { ...fixedWidthHeight, ...size },
      height: { ...fixedWidthHeight, ...size },
      size
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/typography'),
    // require('tailwindcss-children')
    function ({ addComponents }) {
      addComponents({
        '.container-xl': {
          maxWidth: '100%',
          paddingLeft: containerSpacing,
          paddingRight: containerSpacing,
          '@screen sm': {
            maxWidth: '100%'
          },
          '@screen md': {
            maxWidth: '100%'
          },
          '@screen lg': {
            maxWidth: '100%'
          },
          '@screen xl': {
            maxWidth: `calc(${breakpoints.xl} + ${containerSpacing * 2}px)`
          },
          '@screen 2xl': {
            maxWidth: `calc(${breakpoints.xl} + ${containerSpacing * 2}px)`
          }
        },
        '.container-lg': {
          maxWidth: '100%',
          paddingLeft: containerSpacing,
          paddingRight: containerSpacing,
          '@screen sm': {
            maxWidth: '100%'
          },
          '@screen md': {
            maxWidth: '100%'
          },
          '@screen lg': {
            maxWidth: '100%'
          },
          '@screen xl': {
            maxWidth: `calc(${breakpoints.lg} + ${containerSpacing * 2}px)`
          },
          '@screen 2xl': {
            maxWidth: `calc(${breakpoints.lg} + ${containerSpacing * 2}px)`
          }
        },
        '.hexagon': {
          clipPath: `polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)`
        }
      })
    }
  ]
}
