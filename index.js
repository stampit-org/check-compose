var assert = require('assert');
module.exports = function (compose) {
  assert.ok(typeof compose === 'function', '"compose" must be a function');
  var oldCompose = global.compose;
  global.compose = compose;
  try {
    require('./build');
  } finally {
    global.compose = oldCompose;
  }
};
