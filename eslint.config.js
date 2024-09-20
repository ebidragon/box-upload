const {configs} = require('@eslint/js');
const globals = require('globals');

module.exports = [
  configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node
    },
    rules: {
      semi: 'error',
      quotes: ['error', 'single'],
      indent: ['error', 2, {'SwitchCase': 1}]
    },
  }
];