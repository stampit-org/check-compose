#!/usr/bin/env node
(function () {
  var path = require('path');
  var composeImplementationFile = process.argv[2];
  if (!composeImplementationFile) {
    console.log('usage: ' + path.basename(process.argv[1]) + ' COMPOSE_FILE_NAME');
    return;
  }

  var imported;
  try {
    imported = require(composeImplementationFile);
  } catch (err1) {
    try {
      composeImplementationFile = path.join(process.cwd(), composeImplementationFile);
      imported = require(composeImplementationFile);
    } catch (err2) {
      console.error(err2 + '\nFailed to read JavaScript file ' + composeImplementationFile);
      return;
    }
  }

  var compose = typeof imported === 'function' ? imported :
    typeof imported.default === 'function' ? imported.default :
      typeof imported.compose === 'function' ? imported.compose :
        undefined;
  if (!compose) {
    console.error('The file ' + composeImplementationFile + ' should export the "compose" function.');
    return;
  }

  global.compose = compose;
  require('../build');
}());
