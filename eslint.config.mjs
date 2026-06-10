import eslint from '@eslint/js';
import cypressPlugin from 'eslint-plugin-cypress';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', 'coverage/', 'eslint.config.mjs', 'lint-staged.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  cypressPlugin.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsxA11yPlugin.flatConfigs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      tsdoc: tsdocPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'tsdoc/syntax': 'warn',
      // Disabling this rule allows us to use blanket exports from components
      'import/prefer-default-export': 'off',
      /* 
      The fork of the eslint-config-airbnb-typescript package has added ESLint Stylistic plugin
      to the config. see:https://github.com/Kenneth-Sills/eslint-config-airbnb-typescript/pull/3
      Some of the stylistic rules are not compatible with our current prettier config so we disable them.
      */
      '@stylistic/indent': 'off',
      '@stylistic/comma-dangle': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.*json'],
        },
      },
    },
  },
  eslintConfigPrettier
);
