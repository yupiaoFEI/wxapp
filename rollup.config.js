// Rollup plugins
var babel = require('rollup-plugin-babel');
// var eslint = require('rollup-plugin-eslint');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

module.exports = {
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    })
  ],
};
