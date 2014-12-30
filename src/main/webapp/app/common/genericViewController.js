// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
  global.console.log("GenericViewController executed!");
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    .controller('GenericViewController', [
      '$scope', '$route', '$log', 'accessService', 'mainUtilities', 'appProperties',
      function ($scope, $route, $log, accessService, mainUtilities, appProperties) {
        $scope.title = $route.current.title;
        $scope.hasObjects = false;
        $scope.hasGrid = false;
        $scope.gridOptions = {};
        $scope.editModus = true;
        $scope.data = [];
        $scope.url = {};

        $scope.init = function () {

          //build grid options
          if (global.angular.isDefined($route.current.guiConfig)) {
            $scope.guiConfigInfo = global.angular.toJson($route.current.guiConfig, true);
            if (global.angular.isArray($route.current.guiConfig.objects) && $route.current.guiConfig.objects.length > 0) {
              $scope.currentObjectDef = $route.current.guiConfig.objects[0];
              $scope.hasObjects = true;
              $scope.url = $scope.currentObjectDef.resource;
              if (global.angular.isDefined($scope.currentObjectDef.listView) &&
                $scope.currentObjectDef.listView.viewType === 'list' &&
                $scope.currentObjectDef.listView.implType === 'ui-grid') {
                $scope.hasGrid = true;
                var columnDefs = [];
                if (global.angular.isArray($scope.currentObjectDef.listView.fields) && $scope.currentObjectDef.listView.fields.length > 0) {
                  for (var i = 0; i < $scope.currentObjectDef.listView.fields.length; i++) {
                    var fieldSpec = $scope.currentObjectDef.listView.fields[i];
                    columnDefs.push(
                      {
                        field: fieldSpec.name,
                        displayName: fieldSpec.label,
                        enableFiltering: fieldSpec.filterable,
                        allowCellFocus: fieldSpec.focusable,
                        //this function is needed to be able to switch edit mode.
                        cellEditableCondition: cellEditFunction
                      });
                  }
                  $scope.setData = function (data) {
                    $scope.gridOptions.data = data;
                  };
                  populateView($scope.url);
                  $scope.gridOptions =
                    {
                      restCall: $scope.currentObjectDef.resource,
                      enableColumnResize: true,
                      enableCellEditOnFocus: cellEditFunction,
                      multiSelect: true,
//                      enableFiltering: true,
                      //to prevent autosave of dirty rows,
                      rowEditWaitInterval: -1,
                      columnDefs: columnDefs
                    };
                  global.console.log("$scope.gridOptions: ", $scope.gridOptions);
                }
              }

            }
          }
        };

        var cellEditFunction = function (scopeIn) {
          return $scope.editModus;
        };

        function populateView(url) {
          accessService.list(url)
            .then(function (data) {
              $scope.setData(data);
            }, function (error) {
              $log.error("Error searching countries ", error);
            });
        }
      }])
    ;

})(this);

