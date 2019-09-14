const assignmentTests = require('./assignment-tests');
const composeBasicTests = require('./compose-basic-tests');
const composeTests = require('./compose-tests');
const descriptorTests = require('./descriptor-tests');
const initializerTests = require('./initializer-tests');
const composerTests = require('./composer-tests');
const instanceReplacemenmtTests = require('./instance-replacement-tests');
const getterSetterTests = require('./getters-setters');
const mergeTests = require('./merge-tests');
const priorityTests = require('./priority-tests');
const peoprtyDescriptorTests = require('./property-descriptor-tests');
const propertySafetyTests = require('./property-safety-tests');
const stampTests = require('./stamp-tests');
const staticPropertiesTests = require('./static-properties-tests');


module.exports = function (compose) {
  if (typeof compose !== 'function') throw new Error('"compose" must be a function');

  assignmentTests(compose);
  composeBasicTests(compose);
  composeTests(compose);
  descriptorTests(compose);
  initializerTests(compose);
  composerTests(compose);
  instanceReplacemenmtTests(compose);
  getterSetterTests(compose);
  mergeTests(compose);
  priorityTests(compose);
  peoprtyDescriptorTests(compose);
  propertySafetyTests(compose);
  stampTests(compose);
  staticPropertiesTests(compose);
};
