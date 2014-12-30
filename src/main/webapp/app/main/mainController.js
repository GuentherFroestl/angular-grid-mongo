// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
  global.console.log("MainController executed!");
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    .controller('MainController', [
      '$scope', '$route', 'accessService', 'mainUtilities', 'appProperties',
      function ($scope, $route, accessService, mainUtilities, appProperties) {
        $scope.info =
          mainUtilities.concatNullSave("name: ", appProperties.name) +
          mainUtilities.concatNullSave(" version: ", appProperties.version) +
          mainUtilities.concatNullSave(" author: ", appProperties.author);
        $scope.title = $route.current.title;
      }])
    ;

})(this);

