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
  ignorePatterns: ['**/dist', '*.html', 'schema.json'],
  plugins: ['svelte3', 'security'],
  overrides: [
    {
      files: ['**.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['**.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        // '@graphql-eslint/known-fragment-names': 'error',
        '@graphql-eslint/no-duplicate-fields': 'error',
        //    '@graphql-eslint/executable-definitions': 'error',
      },
      parserOptions: {
        operations: './src/**/*.graphql',
        schema: './schema.json',
      },
    },
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
    'unicorn/no-nested-ternary': 'off',
    'space-before-function-paren': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 1 }],
  },
}
