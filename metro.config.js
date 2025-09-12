// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // 👇 add SVG support
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

  // 👇 keep your tslib patch
  config.resolver.extraNodeModules = {
    ...(config.resolver.extraNodeModules || {}),
    tslib: path.resolve(__dirname, "node_modules/tslib"),
  };

  return config;
})();
