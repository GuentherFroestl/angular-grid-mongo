// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
  global.console.log("GenericViewController executed!");
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    .controller('GenericViewController', [
      '$scope', '$route', '$log', 'accessService', 'mainUtilities', 'objectFactory',
      function ($scope, $route, $log, accessService, mainUtilities, objectFactory) {
        $scope.title = $route.current.title;
        $scope.hasObjects = false;
        $scope.hasGrid = false;
        $scope.gridOptions = {};
        $scope.editModus = false;
        $scope.data = [];
        $scope.currentObjectDef = {};

        $scope.init = function () {

          //build grid options
          if (global.angular.isDefined($route.current.guiConfig)) {
            $scope.guiConfigInfo = global.angular.toJson($route.current.guiConfig, true);
            if (global.angular.isArray($route.current.guiConfig.objects) && $route.current.guiConfig.objects.length > 0) {
              $scope.currentObjectDef = $route.current.guiConfig.objects[0];
              $scope.hasObjects = true;

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
                  populateView($scope.currentObjectDef.resource);
                  $scope.gridOptions =
                    {
                      restCall: $scope.currentObjectDef.resource,
                      enableColumnResize: true,
                      enableCellEditOnFocus: cellEditFunction,
                      enableFiltering: false,
                      multiSelect: true,
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

        /*
         * GUI function 
         */
        $scope.edit = function () {
          enableEdit();
        };
        /*
         * GUI function
         */
        $scope.add = function () {
          enableEdit();
          var newRow = objectFactory.newInstanceForName($scope.currentObjectDef.className);
          $scope.gridOptions.data.push(newRow);
        };

        /*
         * GUI function
         */
        $scope.cancel = function () {
          disableEdit();
        };

        function enableEdit() {
          $scope.gridOptions.enableCellEditOnFocus = true;
          $scope.editModus = true;
        }

        function disableEdit() {
          $scope.gridOptions.enableCellEditOnFocus = false;
          $scope.editModus = false;
        }

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

