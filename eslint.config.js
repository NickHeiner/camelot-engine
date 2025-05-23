import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  // Base configuration
  js.configs.recommended,

  // Ignore patterns
  {
    ignores: ['node_modules/', 'dist/', 'coverage/', '*.d.ts'],
  },

  // General rules for all files
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'comma-dangle': 'off',
      'space-before-function-paren': 'off',
      'object-curly-spacing': 'off',
      'no-multiple-empty-lines': 'off',
      'max-len': 'off',
      'arrow-parens': 'off',
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      indent: 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'no-shadow': 'off',
      'no-redeclare': 'off',
      'no-dupe-class-members': 'off',
      'no-return-await': 'off',
      'require-await': 'off',
      'no-throw-literal': 'off',
      'consistent-return': 'off',
      'no-invalid-this': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
    },
  },

  // Jest configuration for test files
  {
    files: ['test/**/*.ts'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
