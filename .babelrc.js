const pkg = require("./package.json");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: pkg.engines.node,
        },
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
  ],
};
