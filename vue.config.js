const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const isLib = process.env.TYPE === "lib";

module.exports = {
  configureWebpack(config) {
    // console.log(config.plugins)
  },
  chainWebpack(config) {
    if (!isLib) {
      config.plugin("monaco").use(new MonacoWebpackPlugin());
    }
    config.plugin("circular").use(new CircularDependencyPlugin());
  },
  pwa: {},
};
