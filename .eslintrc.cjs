module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['eslint-plugin-prettier', 'eslint-plugin-vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
    parser: '@typescript-eslint/parser'
  },
  ignorePatterns: ['src/assets/lib'],
  rules: {
    semi: 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/script-setup-uses-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/no-unused-components': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-undef': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        arrowParens: 'always',
        singleQuote: true,
        bracketSpacing: true,
        bracketLine: false,
        useTabs: false,
        singleAttributePerLine: true,
        trailingComma: 'none',
        semi: true,
        printWidth: 160
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
    'no-unused-vars': 'warn',
    'vue/v-on-event-hyphenation': 'off',
    'no-case-declarations': 'off'
  }
};
