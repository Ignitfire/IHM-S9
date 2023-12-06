/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  'rules': {
    'semi': [
      'error',
      'always'
    ],
    'indent': ["error", 2],
    'no-use-before-define': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'valid-typeof': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': ['error', {
      'array': false,
      'object': true
    }, {
      'enforceForRenamedProperties': false
    }]
  }
};
