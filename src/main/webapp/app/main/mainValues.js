// another file and/or another anonymous function
(function (global) {
  global.console.log("mainValues executed!");
  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .value('appProperties',
      {
        name: "angularjs bootstrap application",
        version: "0.1.0",
        author: "Guenther Froestl"
      }

    );

})(this);
