import { define } from '@remcohaszing/eslint'

export default define([
  { ignores: ['fixtures/*/expected.js'] },
  {
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
      'unicorn/prefer-structured-clone': 'off'
    }
  }
])
