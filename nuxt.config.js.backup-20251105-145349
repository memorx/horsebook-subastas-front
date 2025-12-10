require('dotenv').config()

export default {
  components: true,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Subasta La Silla',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-34H90D1WCM',
        async: true
      },
      {
        innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-34H90D1WCM');`,
        type: 'text/javascript'
      },
      {
        hid: 'clarity',
        innerHTML: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "u1iznlc0ay");`,
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ],
    __dangerouslyDisableSanitizers: ['script'],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' }

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuetoastnotification.js',
    { src: '~/plugins/vue-confetti.js', mode: 'client' },
    { src: '~/plugins/youtube-persistence.js', mode: 'client' }
  ],

  // router middleware
  router: {
    middleware: [
      'loadLocalStorage',
      // 'authenticated' Comment this just in case we need back the authentication middleware
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-i18n',
    '@nuxtjs/toast',
    'nuxt-sweetalert2'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:8000/api'
    baseURL: process.env.BASE_URL || "https://subastas-api-stage.alluxi.com/api",
    baseLaSilla: "https://horsebookls.com//api"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
      vendors: true,
      runtime: true,
      pagesSplit: true,
      pagesSplitThreshold: 1000, // Umbral de tamaño para dividir las páginas
      commonsSplit: true,
      commonsSplitThreshold: 10000, // Umbral de tamaño para dividir los módulos comunes
      client: true,
      server: true
    }
    */
  },
  publicRuntimeConfig: {
    // baseURL: 'http://localhost:8000/api'
    baseURL: process.env.BASE_URL || "https://subastas-api-stage.alluxi.com/api",
    baseURLWS: process.env.BASE_URLWS || "wss://subastas-api-stage.alluxi.com/ws",
    baseLaSilla: "https://www.horsebookls.com/api",
  },

  //config i18n
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es.json'
      },
      {
        code: 'fr',
        name: 'French',
        file: 'fr.json'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'es'
  }
}
