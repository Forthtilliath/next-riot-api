import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['.next/**', 'next-env.d.ts'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: { react: { version: '19' } },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with the new JSX transform.
      'react/react-in-jsx-scope': 'off',
      // TypeScript already validates props — this rule is for plain JS.
      'react/prop-types': 'off',
      // `active` is a custom prop augmented onto HTMLAttributes in
      // src/@types/react.d.ts, used for CSS-driven active-state styling.
      'react/no-unknown-property': ['error', { ignore: ['active'] }],
    },
  },
]);
