// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .run(function () {
      global.console.log("run() executed!");
    });

})(this);

