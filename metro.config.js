// metro.config.js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  transformer: {
    // Pakai transformer agar .svg bisa diimport sebagai komponen
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // Keluarkan 'svg' dari assetExts dan masukkan ke sourceExts
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
});
