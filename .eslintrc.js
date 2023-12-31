module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/', '.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/await-thenable': 'warn',
    'react-native/no-raw-text': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'react-native/no-color-literals': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'external',
          ['builtin', 'index', 'internal', 'parent', 'sibling']
        ],
        pathGroups: [
          {
            pattern: '@(react*)',
            group: 'external'
          },
          {
            pattern:
              '{pages,vendors,locales,assets,components,hooks,services,utils,features,layouts,store}/**',
            group: 'internal'
          },
          {
            pattern: '{theme,locales}',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        warnOnUnassignedImports: true,
        distinctGroup: true
      }
    ]
  }
}
