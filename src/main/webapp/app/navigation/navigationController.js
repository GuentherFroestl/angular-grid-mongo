

// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
  global.console.log("NavigationController executed!");
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    .controller('NavigationController', [
      '$scope', '$route', '$location', 'guiRouteDefinitions',
      function ($scope, $route, $location, guiRouteDefinitions) {
        $scope.currentPath = $location.path();
        $scope.routes = guiRouteDefinitions.guiRootNode.guiRoutes;
      }])
    ;

})(this);

