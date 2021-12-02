module.exports = {
  purge: {
    content: ['_site/**/*.html'],
    enabled: true,
    options: {
      safelist: [],
    },
  },
  theme: {
    extend: {
      colors: {
        change: 'black',
      },
    },
  },
  variants: {},
  plugins: [],
}