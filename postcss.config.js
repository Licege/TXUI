const path = require('path');
const cssCustomProperties = require('postcss-custom-properties');
const cssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssModules = require('postcss-modules');
const csso = require('postcss-csso');
const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

const cssPropSources = [
  path.join(__dirname, 'src/styles/base.css'),
  path.join(__dirname, 'src/styles/constants.css'),
  path.join(__dirname, 'src/styles/animations.css')
]

let plugins = [
  cssImport(),
  cssCustomProperties({
    importFrom: cssPropSources,
    preserve: true
  }),
  autoprefixer(),
  cssModules({
    generateScopedName: name => name,
    getJSON: () => {},
  }),
]

if (isProduction) {
  plugins.push(csso({ restructure: false }));
}

module.exports = { plugins, cssPropSources }
