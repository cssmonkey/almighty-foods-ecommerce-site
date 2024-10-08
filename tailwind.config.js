module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: {
    content: [
      './components/**/*.js',
      './lib/**/*.js',
      './modules/**/*.js',
      './pages/**/*.js',
    ],
    options: {
      safelist: [
        /^grid-cols-/,
        /^xs:grid-cols-/,
        /^sm:grid-cols-/,
        /^md:grid-cols-/,
        /^lg:grid-cols-/,
        /^xl:grid-cols-/,

        /^col-span-/,
        /^xs:col-span-/,
        /^sm:col-span-/,
        /^md:col-span-/,
        /^lg:col-span-/,
        /^xl:col-span-/,

        /^col-start-/,
        /^xs:col-start-/,
        /^sm:col-start-/,
        /^md:col-start-/,
        /^lg:col-start-/,
        /^xl:col-start-/,

        /^justify-self-/,
        /^xs:justify-self-/,
        /^sm:justify-self-/,
        /^md:justify-self-/,
        /^lg:justify-self-/,
        /^xl:justify-self-/,

        /^self-/,
        /^xs:self-/,
        /^sm:self-/,
        /^md:self-/,
        /^lg:self-/,
        /^xl:self-/,

        /^max-w-/,
        /^text-/,
      ],
    },
  },
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      lightGrey: '#e6e6e6',
      grey: 'rgb(209, 213, 219)',
      white: '#FFFFFF',
      pageBG: 'var(--pageBG)',
      pageText: 'var(--pageText)',
      darkBrown: 'var(--darkBrown)',
      lightBrown: 'var(--lightBrown)',
      slight: 'var(--slight)',
      highlight: 'var(--highlight)',
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '940px',
      lg: '1200px',
      xl: '1640px',
    },
    extend: {
      fontFamily: {
        inherit: 'inherit',
      },
      fontSize: {
        xxs: '.625rem',
      },
      zIndex: {
        '-1': '-10',
        50: 50,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
