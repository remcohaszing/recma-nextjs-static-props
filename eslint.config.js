import config from '@remcohaszing/eslint'

export default [
  ...config,
  { ignores: ['fixtures/*/expected.js'] },
  {
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-unresolved': 'off',
      'jsdoc/check-indentation': 'off',
      'unicorn/prefer-structured-clone': 'off'
    }
  }
]
