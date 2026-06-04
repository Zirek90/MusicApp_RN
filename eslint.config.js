const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      'android/*',
      'ios/*',
      '.expo/*',
      'node_modules/*',
      '__mocks__/expo-audio.js',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
    rules: {
      'react/jsx-no-bind': ['warn', { allowArrowFunctions: false, allowFunctions: false }],
    },
  },
]);
