module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        flex: 'flex'
      },
      zIndex: {
        100: '100',
        5000: '5000'
      },
      maxWidth: {
        '1/5': '20%',
        '4/5': '80%'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ]
}
