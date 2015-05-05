'use strict';

var handlebars = require('handlebars');

module.exports = function(source) {

  var runtimePath = require.resolve("handlebars/runtime");

  if (!versionCheck(handlebars, require(runtimePath))) {
    throw new Error('Handlebars compiler version does not match runtime version');
  }

  var code = handlebars.precompile(source);
  code = 'var Handlebars = require('+JSON.stringify(runtimePath)+');\n' +
    'module.exports = (Handlebars["default"] || Handlebars).template(' + code + ');\n';

  return code;
};

function versionCheck(hbCompiler, hbRuntime) {
  return hbCompiler.COMPILER_REVISION === (hbRuntime["default"] || hbRuntime).COMPILER_REVISION;
}
