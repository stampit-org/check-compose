var assert = require('assert');
assert.ok(typeof global.compose === 'function', 'Global variable "compose" was not found. Aborting tests.');

var requireAll = require('require-all');
requireAll({
  dirname: __dirname,
  filter: /.+-tests\.js$/
});
