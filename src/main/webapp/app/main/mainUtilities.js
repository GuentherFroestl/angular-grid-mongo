// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .factory('mainUtilities', function () {
      var concatNullSave = function (string1, string2) {
        var result = "";
        if (global.angular.isDefined(string1)) {
          result = string1;
        }
        if (global.angular.isDefined(string2)) {
          result += string2;
        }
        return result;
      };
      return{
        concatNullSave: concatNullSave
      };
    });

})(this);


