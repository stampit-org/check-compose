import assignmentTests from './assignment-tests';
import composeBasicTests from './compose-basic-tests';
import composeTests from './compose-tests';
import descriptorTests from './descriptor-tests';
import initializerTests from './initializer-tests';
import instanceReplacemenmtTests from './instance-replacement-tests';
import mergeTests from './merge-tests';
import priorityTests from './priority-tests';
import peoprtyDescriptorTests from './property-descriptor-tests';
import propertySafetyTests from './property-safety-tests';
import stampTests from './stamp-tests';
import staticPropertiesTests from './static-properties-tests';


module.exports = function (compose) {
  if (typeof compose !== 'function') throw new Error('"compose" must be a function');

  assignmentTests(compose);
  composeBasicTests(compose);
  composeTests(compose);
  descriptorTests(compose);
  initializerTests(compose);
  instanceReplacemenmtTests(compose);
  mergeTests(compose);
  priorityTests(compose);
  peoprtyDescriptorTests(compose);
  propertySafetyTests(compose);
  stampTests(compose);
  staticPropertiesTests(compose);
};
