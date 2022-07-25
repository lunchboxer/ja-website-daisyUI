module.exports = {
  extends: ['standard', 'plugin:unicorn/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es2017: true,
    browser: true,
    node: true,
  },
  ignorePatterns: ['**/dist', '*.html'],
  plugins: ['svelte3', 'security'],
  overrides: [
    {
      files: ['**.svelte'],
      processor: 'svelte3/svelte3',
    },
    // {
    //   files: ['*.graphql'],
    //   parser: '@graphql-eslint/eslint-plugin',
    //   plugins: ['@graphql-eslint'],
    //   rules: {
    //     '@graphql-eslint/known-type-names': 'error',
    //   },
    //   parserOptions: {
    //     schema: './schema.json',
    //   },
    // },
    // {
    //   files: ['*.js'],
    //   processor: '@graphql-eslint/graphql',
    //   parserOptions: {
    //     schema: './schema.json',
    //   },
    // },
  ],
  rules: {
    'unicorn/filename-case': 0,
    'import/first': 0,
    'space-before-function-paren': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 1 }],
  },
}
