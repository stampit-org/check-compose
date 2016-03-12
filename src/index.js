assert.ok(typeof global.compose === 'function', 'Global variable "compose" was not found. Aborting tests.');

var requireAll = require('require-all');
require('babel-register');
require('babel-polyfill');

requireAll({
  dirname: __dirname,
  filter: /.+-tests\.js$/
});
