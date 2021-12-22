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
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      colors: {
        change: 'black',
      },
    },
    maxWidth: {
      '500': '500px',
    },
  },
  variants: {},
  plugins: [],
}