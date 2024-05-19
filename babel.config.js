module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets/*': './src/assets/*',
            '@components': './src/components',
            '@utils': './src/utils',
            '@hoc': './src/hoc',
            '@types': './src/types',
            '@enums': './src/enums',
            '@errors': './src/errors',
            '@configs': './src/configs',
            '@constants': './src/constants',
            '@global': './src/global',
            '@context': './src/context',
            '@service': './src/service',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
