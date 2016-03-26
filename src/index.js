var assert = require('assert');
var fs = require('fs');
module.exports = function (compose) {
  assert.ok(typeof compose === 'function', '"compose" must be a function');

  fs.readdirSync(__dirname)
    .filter(RegExp.prototype.test.bind(/.+-tests\.js$/))
    .forEach(function (file) {
      require('./' + file)(compose);
    });
};
