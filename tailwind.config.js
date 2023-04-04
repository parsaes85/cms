/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './Pages/*/*.html', './Pages/*/js/*.js'],
  theme: {
    extend: {
      colors: {
        'lightBlue': '#1943da',
        'darkBlue': '#17203f',
      },

      boxShadow: {
        'custom': '2px 1px 10px rgba(0, 0, 0, .2)'
      }
    },

    fontFamily: {
      vazir: ["vazir"],
      lalezar: ["lalezar"]
    },
  },
  plugins: [],
}

