/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json'
  ],
  ignorePatterns: ['src/utils/lib/*.js', 'src/utils/lib/*.ts'],
  parserOptions: {
    ecmaVersion: 10
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    // 'no-unused-vars': 'error',
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      // { varsIgnorePattern: '.*/enums.ts', args: 'none' }
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    '@typescript-eslint/no-console': 'off',
    '@typescript-eslint/no-debugger': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-const': 'off'
  }
}
