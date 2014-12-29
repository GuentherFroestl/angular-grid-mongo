/*
 * CssController
 * controls css theme
 */
(function (global) {
  // using the function form of use-strict...
  global.console.log("CssController executed!");
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainmodule')
    .controller('CssController', [
      '$location', '$log', '$scope', 'accessService', 'mainUtilities', 'mainValues',
      function ($location, $log, $scope, accessService, mainUtilities, mainValues)
      {
        $scope.selectedTheme={};
        $scope.currentPath = $location.path();
        $scope.themes = accessService.cssSelection.themes;
        if (global.angular.isDefined($scope.themes) &&
          global.angular.isArray($scope.themes) &&
          $scope.themes.length > 0) {
          $scope.selectedTheme = $scope.themes[0];

        }

        $scope.selectTheme = function (theme) {
          $log.info("CssController selectTheme:", theme);
          $scope.selectedTheme = theme;
          global.jQuery("link").attr("href", theme.css);
        };
        $scope.isSelectedTheme = function(theme){
          if (global.angular.isDefined(theme) && theme.name ===$scope.selectedTheme.name){
            return true;
          }else{
            return false;
          }
        };
      }
    ]);

})(this);

