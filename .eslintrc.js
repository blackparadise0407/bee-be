module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@bee/**',
            group: 'internal',
          },
        ],
        groups: ['builtin', 'external', 'internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'warn',
      { allow: ['arrowFunctions'] },
    ],
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'import/no-named-as-default-member': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'no-debugger': 'warn',
    'no-console': 'warn',
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {},
    },
  },
};
