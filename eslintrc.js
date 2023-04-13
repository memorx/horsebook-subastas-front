module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off'
  },
  overrides: [
    {
      files: ['layouts/*.vue', 'pages/**/*.vue', "components/**/*.vue"],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
