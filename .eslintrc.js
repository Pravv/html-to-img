// https://github.com/benmosher/eslint-plugin-import/issues/1285

const jsExtensions = ['.js', '.jsx'];
const tsExtensions = ['.ts', '.tsx'];
const allExtensions = jsExtensions.concat(tsExtensions);

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'import',
  ],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'no-restricted-globals': 'off',
    'no-bitwise': 'off',
    'no-console': 'off', // Replace with LogProvider
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-continue': 'off',
    'arrow-parens': ['warn', 'as-needed'],
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'object-curly-newline': ['error', { multiline: true }],
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
  overrides: [
    {
      files: ['**/entities/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    }, {
      files: ['**/*.ts'],
      rules: {
        '@typescript-eslint/no-use-before-define': ['error', { 'functions': false }],
      },
    },

  ],
  settings: {
    'import/extensions': allExtensions,
    'import/parsers': {
      '@typescript-eslint/parser': tsExtensions,
    },
    'import/resolver': {
      'node': {
        'extensions': allExtensions,
      },
    },
  },
};
