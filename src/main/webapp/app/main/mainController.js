// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
   global.console.log("MainController executed!");
"use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainmodule')
    .controller('MainController', [
      '$scope', 'accessService', 'mainUtilities', 'mainValues',
      function ($scope, accessService, mainUtilities, mainValues) {
        $scope.info = 
          mainUtilities.concatNullSave("name: ", mainValues.appProperties.name)+
          mainUtilities.concatNullSave(" version: ", mainValues.appProperties.version)+
          mainUtilities.concatNullSave(" author: ", mainValues.appProperties.author);
      }])
    ;

})(this);

