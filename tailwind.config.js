module.exports = {
  content: [],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-soft': '#1D71B8',
        'blue-semidark': '#00519c',
        'blue-dark': '#011E41',
        'blue-pastel': '#EFF5FA',
        'blue-soft-blur': '#6CA3D1',
        'blue-border': '#2B3990',
        'gray-garre': '#727272',
        'gray-border': '#DADADA',
        'gray-text': '#929292',
        'gray-bg': '#F0F0F0',
        'gray-disabled': '#F2F2F2',
        'red-form': '#CF4343'
      },
      borderWidth: {
        1: '1px'
      },
      fontFamily: {
        futura: ['Arial','sans-serif'],
        arial: ['Arial','sans-serif']
      },
      screens: {
        xs: '540px'
      },
      backgroundImage: {
        // 'plane-2': "url('~/public/background-plane-2.png')"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
