module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx,html}'],
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
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ]
}
