const { NODE_ENV, BABEL_KEEP_CSS } = process.env;

const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';
const useModules = isProduction || isDevelopment;
const keepCss = Boolean(BABEL_KEEP_CSS);
const runtimeVersion = require('./package.json').dependencies["@babel/runtime"];

const testFiles = [
  "./src/**/*.test.ts",
  "./src/**/*.test.tsx",
  "./src/**/*.spec.ts",
  "./src/**/*.spec.tsx",
  "./src/**/*.e2e.ts",
  "./src/**/*.e2e.tsx",
  "./e2e/",
  "./src/testing/"
]

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: useModules ? false : "commonjs",
        exclude: [
          "@babel/plugin-proposal-unicode-property-regex",
          "@babel/plugin-transform-unicode-regex"
        ]
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-transform-runtime", { version: runtimeVersion }]
  ].concat(
    keepCss
      ? []
      : [["babel-plugin-transform-remove-imports", { test: "\\.css$" }]]
  ),
  ignore: ["./src/txui.js"].concat(isProduction ? testFiles : [])
}
