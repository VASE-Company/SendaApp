import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/*.cjs', '**/babel.config.js'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
];
