var assert = require('assert');
var requireAll = require('require-all');
module.exports = function (compose) {
  assert.ok(typeof compose === 'function', '"compose" must be a function');

  global.compose = compose;
  requireAll({
    dirname: __dirname,
    filter: /.+-tests\.js$/
  });
};
