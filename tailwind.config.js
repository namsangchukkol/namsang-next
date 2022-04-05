module.exports = {
  content: [
    "./pages/**/*.{js,jsx,tsx}",
    "./components/**/*.{js,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dirty-white': '#FFFCFC',
        'red-main': '#BE1E2D',
        'grey': '#707070',
        'grey-md': '#F0F0F0',
        'grey-light': '#EDEDED',
        'grey-extralight': '#D0D0D0',
      },
      spacing: {
        'super-indent': '20vw',
        'indent': '12vw',
        'indent-super-xsm': '2vw',
        'indent-xsm': '4vw',
        'indent-sm': '5vw',
        'indent-lg': '20vw',
      },
      fontSize: {
        'title': '1.6rem',
        'content': '0.9rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
}