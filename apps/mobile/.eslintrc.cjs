module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  settings: { react: { version: 'detect' } },
  env: { es2022: true, node: true },
  ignorePatterns: ['node_modules']
};
