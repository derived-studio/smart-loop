module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  globals: {
    process: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error'],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'trace', 'log']
      }
    ]
  }
}
