module.exports = function (compose) {
  assert.ok(typeof compose === 'function', '"compose" must be a function');
  var oldCompose = global.compose;
  global.compose = compose;
  require('./src');
  global.compose = oldCompose;
};
