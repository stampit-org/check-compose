var assert = require('assert');
assert.ok(typeof global.compose === 'function', 'Global variable "compose" was not found. Aborting tests.');

require('babel-register')(require('babel-preset-es2015'));
require('babel-polyfill');

var requireAll = require('require-all');
requireAll({
  dirname: __dirname,
  filter: /.+-tests\.js$/
});
