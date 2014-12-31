
// one file
(function (global) {
  // declaring the module in one file / anonymous function
  // (only pass a second parameter THIS ONE TIME as a redecleration creates bugs
  // which are very hard to dedect)
  global.angular.module('mainModule', [
    'ngResource',
    'ngRoute',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ui.grid.pinning',
    'ui.grid.selection',
    'ui.grid.rowEdit',
    'ui.grid.resizeColumns',
    'ui.grid.autoResize'
  ])
  .run(function(){
    global.console.log("run() executed!");
  });
})(this);
;
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

;
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
  global.angular.module('mainModule')
    .controller('CssController', [
      '$location', '$log', '$scope', 'accessService', 'mainUtilities',
      function ($location, $log, $scope, accessService, mainUtilities)
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
          global.jQuery("#bootstrap").attr("href", theme.css);
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

;
// another file and/or another anonymous function
(function (global) {
  global.console.log("accessService executed!");
  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .service('accessService', function ($q) {
      /**
       * returns available css themes
       */
      this.cssSelection = {"version": "3.3.1+2", "themes": [
          {"name": "Default", "description": "Default bootstrap theme", "thumbnail": "", "preview": "", "css": "lib/css/bootstrap/bootstrap-3.2.0.css", "cssMin": "lib/css/bootstrap/bootstrap-3.2.0.css", "cssCdn": "lib/css/bootstrap/bootstrap-3.2.0.css", "less": "", "lessVariables": "", "scss": "", "scssVariables": ""},
          {"name": "Cerulean", "description": "A calm blue sky", "thumbnail": "http://bootswatch.com/cerulean/thumbnail.png", "preview": "http://bootswatch.com/cerulean/", "css": "http://bootswatch.com/cerulean/bootstrap.css", "cssMin": "http://bootswatch.com/cerulean/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/cerulean/bootstrap.css", "less": "http://bootswatch.com/cerulean/bootswatch.less", "lessVariables": "http://bootswatch.com/cerulean/variables.less", "scss": "http://bootswatch.com/cerulean/_bootswatch.scss", "scssVariables": "http://bootswatch.com/cerulean/_variables.scss"}, {"name": "Cosmo", "description": "An ode to Metro", "thumbnail": "http://bootswatch.com/cosmo/thumbnail.png", "preview": "http://bootswatch.com/cosmo/", "css": "http://bootswatch.com/cosmo/bootstrap.css", "cssMin": "http://bootswatch.com/cosmo/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/cosmo/bootstrap.css", "less": "http://bootswatch.com/cosmo/bootswatch.less", "lessVariables": "http://bootswatch.com/cosmo/variables.less", "scss": "http://bootswatch.com/cosmo/_bootswatch.scss", "scssVariables": "http://bootswatch.com/cosmo/_variables.scss"}, {"name": "Cyborg", "description": "Jet black and electric blue", "thumbnail": "http://bootswatch.com/cyborg/thumbnail.png", "preview": "http://bootswatch.com/cyborg/", "css": "http://bootswatch.com/cyborg/bootstrap.css", "cssMin": "http://bootswatch.com/cyborg/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/cyborg/bootstrap.css", "less": "http://bootswatch.com/cyborg/bootswatch.less", "lessVariables": "http://bootswatch.com/cyborg/variables.less", "scss": "http://bootswatch.com/cyborg/_bootswatch.scss", "scssVariables": "http://bootswatch.com/cyborg/_variables.scss"}, {"name": "Darkly", "description": "Flatly in night mode", "thumbnail": "http://bootswatch.com/darkly/thumbnail.png", "preview": "http://bootswatch.com/darkly/", "css": "http://bootswatch.com/darkly/bootstrap.css", "cssMin": "http://bootswatch.com/darkly/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/darkly/bootstrap.css", "less": "http://bootswatch.com/darkly/bootswatch.less", "lessVariables": "http://bootswatch.com/darkly/variables.less", "scss": "http://bootswatch.com/darkly/_bootswatch.scss", "scssVariables": "http://bootswatch.com/darkly/_variables.scss"}, {"name": "Flatly", "description": "Flat and modern", "thumbnail": "http://bootswatch.com/flatly/thumbnail.png", "preview": "http://bootswatch.com/flatly/", "css": "http://bootswatch.com/flatly/bootstrap.css", "cssMin": "http://bootswatch.com/flatly/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/flatly/bootstrap.css", "less": "http://bootswatch.com/flatly/bootswatch.less", "lessVariables": "http://bootswatch.com/flatly/variables.less", "scss": "http://bootswatch.com/flatly/_bootswatch.scss", "scssVariables": "http://bootswatch.com/flatly/_variables.scss"}, {"name": "Journal", "description": "Crisp like a new sheet of paper", "thumbnail": "http://bootswatch.com/journal/thumbnail.png", "preview": "http://bootswatch.com/journal/", "css": "http://bootswatch.com/journal/bootstrap.css", "cssMin": "http://bootswatch.com/journal/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/journal/bootstrap.css", "less": "http://bootswatch.com/journal/bootswatch.less", "lessVariables": "http://bootswatch.com/journal/variables.less", "scss": "http://bootswatch.com/journal/_bootswatch.scss", "scssVariables": "http://bootswatch.com/journal/_variables.scss"}, {"name": "Lumen", "description": "Light and shadow", "thumbnail": "http://bootswatch.com/lumen/thumbnail.png", "preview": "http://bootswatch.com/lumen/", "css": "http://bootswatch.com/lumen/bootstrap.css", "cssMin": "http://bootswatch.com/lumen/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/lumen/bootstrap.css", "less": "http://bootswatch.com/lumen/bootswatch.less", "lessVariables": "http://bootswatch.com/lumen/variables.less", "scss": "http://bootswatch.com/lumen/_bootswatch.scss", "scssVariables": "http://bootswatch.com/lumen/_variables.scss"}, {"name": "Paper", "description": "Material is the metaphor", "thumbnail": "http://bootswatch.com/paper/thumbnail.png", "preview": "http://bootswatch.com/paper/", "css": "http://bootswatch.com/paper/bootstrap.css", "cssMin": "http://bootswatch.com/paper/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/paper/bootstrap.css", "less": "http://bootswatch.com/paper/bootswatch.less", "lessVariables": "http://bootswatch.com/paper/variables.less", "scss": "http://bootswatch.com/paper/_bootswatch.scss", "scssVariables": "http://bootswatch.com/paper/_variables.scss"}, {"name": "Readable", "description": "Optimized for legibility", "thumbnail": "http://bootswatch.com/readable/thumbnail.png", "preview": "http://bootswatch.com/readable/", "css": "http://bootswatch.com/readable/bootstrap.css", "cssMin": "http://bootswatch.com/readable/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/readable/bootstrap.css", "less": "http://bootswatch.com/readable/bootswatch.less", "lessVariables": "http://bootswatch.com/readable/variables.less", "scss": "http://bootswatch.com/readable/_bootswatch.scss", "scssVariables": "http://bootswatch.com/readable/_variables.scss"}, {"name": "Sandstone", "description": "A touch of warmth", "thumbnail": "http://bootswatch.com/sandstone/thumbnail.png", "preview": "http://bootswatch.com/sandstone/", "css": "http://bootswatch.com/sandstone/bootstrap.css", "cssMin": "http://bootswatch.com/sandstone/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/sandstone/bootstrap.css", "less": "http://bootswatch.com/sandstone/bootswatch.less", "lessVariables": "http://bootswatch.com/sandstone/variables.less", "scss": "http://bootswatch.com/sandstone/_bootswatch.scss", "scssVariables": "http://bootswatch.com/sandstone/_variables.scss"}, {"name": "Simplex", "description": "Mini and minimalist", "thumbnail": "http://bootswatch.com/simplex/thumbnail.png", "preview": "http://bootswatch.com/simplex/", "css": "http://bootswatch.com/simplex/bootstrap.css", "cssMin": "http://bootswatch.com/simplex/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/simplex/bootstrap.css", "less": "http://bootswatch.com/simplex/bootswatch.less", "lessVariables": "http://bootswatch.com/simplex/variables.less", "scss": "http://bootswatch.com/simplex/_bootswatch.scss", "scssVariables": "http://bootswatch.com/simplex/_variables.scss"}, {"name": "Slate", "description": "Shades of gunmetal gray", "thumbnail": "http://bootswatch.com/slate/thumbnail.png", "preview": "http://bootswatch.com/slate/", "css": "http://bootswatch.com/slate/bootstrap.css", "cssMin": "http://bootswatch.com/slate/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/slate/bootstrap.css", "less": "http://bootswatch.com/slate/bootswatch.less", "lessVariables": "http://bootswatch.com/slate/variables.less", "scss": "http://bootswatch.com/slate/_bootswatch.scss", "scssVariables": "http://bootswatch.com/slate/_variables.scss"}, {"name": "Spacelab", "description": "Silvery and sleek", "thumbnail": "http://bootswatch.com/spacelab/thumbnail.png", "preview": "http://bootswatch.com/spacelab/", "css": "http://bootswatch.com/spacelab/bootstrap.css", "cssMin": "http://bootswatch.com/spacelab/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/spacelab/bootstrap.css", "less": "http://bootswatch.com/spacelab/bootswatch.less", "lessVariables": "http://bootswatch.com/spacelab/variables.less", "scss": "http://bootswatch.com/spacelab/_bootswatch.scss", "scssVariables": "http://bootswatch.com/spacelab/_variables.scss"}, {"name": "Superhero", "description": "The brave and the blue", "thumbnail": "http://bootswatch.com/superhero/thumbnail.png", "preview": "http://bootswatch.com/superhero/", "css": "http://bootswatch.com/superhero/bootstrap.css", "cssMin": "http://bootswatch.com/superhero/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/superhero/bootstrap.css", "less": "http://bootswatch.com/superhero/bootswatch.less", "lessVariables": "http://bootswatch.com/superhero/variables.less", "scss": "http://bootswatch.com/superhero/_bootswatch.scss", "scssVariables": "http://bootswatch.com/superhero/_variables.scss"}, {"name": "United", "description": "Ubuntu orange and unique font", "thumbnail": "http://bootswatch.com/united/thumbnail.png", "preview": "http://bootswatch.com/united/", "css": "http://bootswatch.com/united/bootstrap.css", "cssMin": "http://bootswatch.com/united/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/united/bootstrap.css", "less": "http://bootswatch.com/united/bootswatch.less", "lessVariables": "http://bootswatch.com/united/variables.less", "scss": "http://bootswatch.com/united/_bootswatch.scss", "scssVariables": "http://bootswatch.com/united/_variables.scss"}, {"name": "Yeti", "description": "A friendly foundation", "thumbnail": "http://bootswatch.com/yeti/thumbnail.png", "preview": "http://bootswatch.com/yeti/", "css": "http://bootswatch.com/yeti/bootstrap.css", "cssMin": "http://bootswatch.com/yeti/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/yeti/bootstrap.css", "less": "http://bootswatch.com/yeti/bootswatch.less", "lessVariables": "http://bootswatch.com/yeti/variables.less", "scss": "http://bootswatch.com/yeti/_bootswatch.scss", "scssVariables": "http://bootswatch.com/yeti/_variables.scss"}]};

      this.list = function (url) {

        var deferred = $q.defer();
        var result = [];
        if ('/projects' === url) {
          result = [
            {
              title: 'project 1',
              description: 'for test purposes'
            },
            {
              title: 'some other project',
              description: 'other project'
            },
            {
              title: 'a weired project',
              description: 'weired??'
            }
          ];
        }
        deferred.resolve(result);
        return deferred.promise;

      };

    });

})(this);

;
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

;
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


;
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
;
/**
 * Object factory.
 * Creates instances for a given Class name.
 * @param {type} global
 */
(function (global) {
  global.console.log("objectfactory executed!");
  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')

    .service('objectFactory', function () {

      this.newInstanceForName = function (className) {
        if ('Project' === className) {
          return new Project();
        }
      };

      function Project() {
        this.title = "title";
        this.description = "description";
      }

    });

})(this);

;
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

;


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

;
// another file and/or another anonymous function
(function (global) {

  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainModule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .config(["$routeProvider", "guiRouteDefinitionsProvider", function ($routeProvider, guiRouteDefinitionsProvider) {
        /*
         * ---------------------------------------------------------------------------
         * ----------- Start of route definition -------------------------------------
         * ---------------------------------------------------------------------------
         */
        global.console.log("guiRouteDefinitionsProvider.guiRoutes", guiRouteDefinitionsProvider.guiRootNode);
        if (global.angular.isDefined(guiRouteDefinitionsProvider.guiRootNode)) {
          configureRoutes($routeProvider, guiRouteDefinitionsProvider.guiRootNode.guiRoutes);
          $routeProvider.otherwise({
            redirectTo: guiRouteDefinitionsProvider.defaultRoute
          });
        } else {
          global.console.log("no guiRouteDefinitionsProvider.guiRootNode, fallback to default route");
          $routeProvider
            .when('/info', {
              title: 'App Info',
              templateUrl: 'app/main/infoPage.html',
              controller: 'MainController'
            })
            .otherwise({
              redirectTo: '/info'
            });
        }


        /**
         * configure routes according to config objects.
         * @param {type} routeProvider
         * @param {type} guiRoutes Array with guiRootes
         */
        function configureRoutes(routeProvider, guiRoutes) {
          if (global.angular.isArray(guiRoutes)) {
            for (var i = 0; i < guiRoutes.length; i++) {
              var guiRoute = guiRoutes[i];
              if (global.angular.isDefined(guiRoute.routeUrl)) {

                var routeSpec = {
                  title: guiRoute.title,
                  templateUrl: guiRoute.templateUrl,
                  controller: guiRoute.controller,
                  guiConfig: guiRoute.guiConfig
                };
                global.console.log("buildRoute() routSpec=: ", routeSpec);
                routeProvider.when(guiRoute.routeUrl, routeSpec);
              }
              if (global.angular.isArray(guiRoute.guiRoutes)) {
                configureRoutes(routeProvider, guiRoute.guiRoutes);
              }
            }
          }
        }

      }]);

})(this);

;
/**
 * This is the definition of all applicaion routes.
 * coded as a provider to injectable for .config()
 * @param {type} global = window object
 */
(function (global) {
  global.console.log("guiRouteDefinitions executed!");
  // using the function form of use-strict...
  "use strict";

  global.angular.module('mainModule')
    .provider('guiRouteDefinitions', function guiRouteDefinitionsProvider() {
      this.guiRootNode =
        {
          title: "root",
          order: 1,
          description: "the root node",
          guiRoutes: [
            {
              title: "Activities",
              order: 1,
              description: "Shows current activities",
              routeUrl: "/activities",
              templateUrl: 'app/activities/activityPage.html',
              controller: 'MainController',
              guiRoutes: [],
              guiConfig: {
              }
            },
            {
              title: "Projects & Tasks",
              order: 2,
              description: "Project Managment Stuff",
              guiRoutes: [
                {
                  title: "Projects",
                  order: 1,
                  description: "Maintainance of Projects",
                  routeUrl: "/projects",
                  templateUrl: 'app/common/genericView.html',
                  controller: 'GenericViewController',
                  guiRoutes: [],
                  guiConfig: {
                    objects: [
                      {
                        className: "Project",
                        resource: "/projects",
                        listView: 
                          {
                            viewType: "list",
                            implType: "ui-grid",
                            populateView: true,
                            fields: [
                              {
                                name: "title",
                                label: "Titel",
                                type: "String",
                                focusable: true,
                                filterable: true,
                                sortOrder: "ASC"
                              },
                              {
                                name: "description",
                                label: "Description",
                                type: "String",
                                focusable: true,
                                filterable: false,
                                sortOrder: "ASC"
                                
                              }
                            ]
                          }
                        
                      }
                    ]

                  }

                },
                {
                  title: "Tasks",
                  order: 2,
                  description: "Maintainance of Tasks",
                  routeUrl: "/tasks",
                  templateUrl: 'app/common/genericView.html',
                  controller: 'GenericViewController',
                  guiRoutes: [],
                  guiConfig: {
                  }
                }

              ]
            },
            {
              title: "App Info",
              order: 3,
              description: "Shows current activities",
              routeUrl: "/info",
              templateUrl: 'app/main/infoPage.html',
              controller: 'MainController',
              guiRoutes: []
            }
          ]
        };
      this.defaultRoute = "/activities";
      var self = this;

      this.$get = function () {
        return {
          guiRootNode: self.guiRootNode,
          defaultRoute: self.defaultRoute
        };
      };

    });

})(this);



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW5Nb2R1bGUuanMiLCJjb21tb24vZ2VuZXJpY1ZpZXdDb250cm9sbGVyLmpzIiwiY3NzX3RoZW1lL2Nzc0NvbnRyb2xsZXIuanMiLCJtYWluL2FjY2Vzc1NlcnZpY2UuanMiLCJtYWluL21haW5Db250cm9sbGVyLmpzIiwibWFpbi9tYWluVXRpbGl0aWVzLmpzIiwibWFpbi9tYWluVmFsdWVzLmpzIiwibWFpbi9vYmplY3RGYWN0b3J5LmpzIiwibWFpbi9ydW4uanMiLCJuYXZpZ2F0aW9uL25hdmlnYXRpb25Db250cm9sbGVyLmpzIiwibmF2aWdhdGlvbi9yb3V0ZUNvbmZpZy5qcyIsIm5hdmlnYXRpb24vcm91dGVEZWZpbml0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gb25lIGZpbGVcbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIC8vIGRlY2xhcmluZyB0aGUgbW9kdWxlIGluIG9uZSBmaWxlIC8gYW5vbnltb3VzIGZ1bmN0aW9uXG4gIC8vIChvbmx5IHBhc3MgYSBzZWNvbmQgcGFyYW1ldGVyIFRISVMgT05FIFRJTUUgYXMgYSByZWRlY2xlcmF0aW9uIGNyZWF0ZXMgYnVnc1xuICAvLyB3aGljaCBhcmUgdmVyeSBoYXJkIHRvIGRlZGVjdClcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWluTW9kdWxlJywgW1xuICAgICduZ1Jlc291cmNlJyxcbiAgICAnbmdSb3V0ZScsXG4gICAgJ3VpLmdyaWQnLFxuICAgICd1aS5ncmlkLmVkaXQnLFxuICAgICd1aS5ncmlkLmNlbGxOYXYnLFxuICAgICd1aS5ncmlkLnBpbm5pbmcnLFxuICAgICd1aS5ncmlkLnNlbGVjdGlvbicsXG4gICAgJ3VpLmdyaWQucm93RWRpdCcsXG4gICAgJ3VpLmdyaWQucmVzaXplQ29sdW1ucycsXG4gICAgJ3VpLmdyaWQuYXV0b1Jlc2l6ZSdcbiAgXSlcbiAgLnJ1bihmdW5jdGlvbigpe1xuICAgIGdsb2JhbC5jb25zb2xlLmxvZyhcInJ1bigpIGV4ZWN1dGVkIVwiKTtcbiAgfSk7XG59KSh0aGlzKTtcbiIsIi8vIGFub3RoZXIgZmlsZSBhbmQvb3IgYW5vdGhlciBhbm9ueW1vdXMgZnVuY3Rpb25cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIC8vIHVzaW5nIHRoZSBmdW5jdGlvbiBmb3JtIG9mIHVzZS1zdHJpY3QuLi5cbiAgZ2xvYmFsLmNvbnNvbGUubG9nKFwiR2VuZXJpY1ZpZXdDb250cm9sbGVyIGV4ZWN1dGVkIVwiKTtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWluTW9kdWxlJylcbiAgICAuY29udHJvbGxlcignR2VuZXJpY1ZpZXdDb250cm9sbGVyJywgW1xuICAgICAgJyRzY29wZScsICckcm91dGUnLCAnJGxvZycsICdhY2Nlc3NTZXJ2aWNlJywgJ21haW5VdGlsaXRpZXMnLCAnb2JqZWN0RmFjdG9yeScsXG4gICAgICBmdW5jdGlvbiAoJHNjb3BlLCAkcm91dGUsICRsb2csIGFjY2Vzc1NlcnZpY2UsIG1haW5VdGlsaXRpZXMsIG9iamVjdEZhY3RvcnkpIHtcbiAgICAgICAgJHNjb3BlLnRpdGxlID0gJHJvdXRlLmN1cnJlbnQudGl0bGU7XG4gICAgICAgICRzY29wZS5oYXNPYmplY3RzID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5oYXNHcmlkID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5ncmlkT3B0aW9ucyA9IHt9O1xuICAgICAgICAkc2NvcGUuZWRpdE1vZHVzID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5kYXRhID0gW107XG4gICAgICAgICRzY29wZS5jdXJyZW50T2JqZWN0RGVmID0ge307XG5cbiAgICAgICAgJHNjb3BlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAvL2J1aWxkIGdyaWQgb3B0aW9uc1xuICAgICAgICAgIGlmIChnbG9iYWwuYW5ndWxhci5pc0RlZmluZWQoJHJvdXRlLmN1cnJlbnQuZ3VpQ29uZmlnKSkge1xuICAgICAgICAgICAgJHNjb3BlLmd1aUNvbmZpZ0luZm8gPSBnbG9iYWwuYW5ndWxhci50b0pzb24oJHJvdXRlLmN1cnJlbnQuZ3VpQ29uZmlnLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChnbG9iYWwuYW5ndWxhci5pc0FycmF5KCRyb3V0ZS5jdXJyZW50Lmd1aUNvbmZpZy5vYmplY3RzKSAmJiAkcm91dGUuY3VycmVudC5ndWlDb25maWcub2JqZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jdXJyZW50T2JqZWN0RGVmID0gJHJvdXRlLmN1cnJlbnQuZ3VpQ29uZmlnLm9iamVjdHNbMF07XG4gICAgICAgICAgICAgICRzY29wZS5oYXNPYmplY3RzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBpZiAoZ2xvYmFsLmFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5jdXJyZW50T2JqZWN0RGVmLmxpc3RWaWV3KSAmJlxuICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW50T2JqZWN0RGVmLmxpc3RWaWV3LnZpZXdUeXBlID09PSAnbGlzdCcgJiZcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudE9iamVjdERlZi5saXN0Vmlldy5pbXBsVHlwZSA9PT0gJ3VpLWdyaWQnKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhhc0dyaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBjb2x1bW5EZWZzID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbC5hbmd1bGFyLmlzQXJyYXkoJHNjb3BlLmN1cnJlbnRPYmplY3REZWYubGlzdFZpZXcuZmllbGRzKSAmJiAkc2NvcGUuY3VycmVudE9iamVjdERlZi5saXN0Vmlldy5maWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUuY3VycmVudE9iamVjdERlZi5saXN0Vmlldy5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkU3BlYyA9ICRzY29wZS5jdXJyZW50T2JqZWN0RGVmLmxpc3RWaWV3LmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uRGVmcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBmaWVsZFNwZWMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBmaWVsZFNwZWMubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVGaWx0ZXJpbmc6IGZpZWxkU3BlYy5maWx0ZXJhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dDZWxsRm9jdXM6IGZpZWxkU3BlYy5mb2N1c2FibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgZnVuY3Rpb24gaXMgbmVlZGVkIHRvIGJlIGFibGUgdG8gc3dpdGNoIGVkaXQgbW9kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFZGl0YWJsZUNvbmRpdGlvbjogY2VsbEVkaXRGdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgJHNjb3BlLnNldERhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZ3JpZE9wdGlvbnMuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgcG9wdWxhdGVWaWV3KCRzY29wZS5jdXJyZW50T2JqZWN0RGVmLnJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICRzY29wZS5ncmlkT3B0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXN0Q2FsbDogJHNjb3BlLmN1cnJlbnRPYmplY3REZWYucmVzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgZW5hYmxlQ29sdW1uUmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUNlbGxFZGl0T25Gb2N1czogY2VsbEVkaXRGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICBlbmFibGVGaWx0ZXJpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIC8vdG8gcHJldmVudCBhdXRvc2F2ZSBvZiBkaXJ0eSByb3dzLFxuICAgICAgICAgICAgICAgICAgICAgIHJvd0VkaXRXYWl0SW50ZXJ2YWw6IC0xLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IGNvbHVtbkRlZnNcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25zb2xlLmxvZyhcIiRzY29wZS5ncmlkT3B0aW9uczogXCIsICRzY29wZS5ncmlkT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjZWxsRWRpdEZ1bmN0aW9uID0gZnVuY3Rpb24gKHNjb3BlSW4pIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmVkaXRNb2R1cztcbiAgICAgICAgfTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBHVUkgZnVuY3Rpb24gXG4gICAgICAgICAqL1xuICAgICAgICAkc2NvcGUuZWRpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBlbmFibGVFZGl0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qXG4gICAgICAgICAqIEdVSSBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgJHNjb3BlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBlbmFibGVFZGl0KCk7XG4gICAgICAgICAgdmFyIG5ld1JvdyA9IG9iamVjdEZhY3RvcnkubmV3SW5zdGFuY2VGb3JOYW1lKCRzY29wZS5jdXJyZW50T2JqZWN0RGVmLmNsYXNzTmFtZSk7XG4gICAgICAgICAgJHNjb3BlLmdyaWRPcHRpb25zLmRhdGEucHVzaChuZXdSb3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIEdVSSBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkaXNhYmxlRWRpdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGVuYWJsZUVkaXQoKSB7XG4gICAgICAgICAgJHNjb3BlLmdyaWRPcHRpb25zLmVuYWJsZUNlbGxFZGl0T25Gb2N1cyA9IHRydWU7XG4gICAgICAgICAgJHNjb3BlLmVkaXRNb2R1cyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkaXNhYmxlRWRpdCgpIHtcbiAgICAgICAgICAkc2NvcGUuZ3JpZE9wdGlvbnMuZW5hYmxlQ2VsbEVkaXRPbkZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgJHNjb3BlLmVkaXRNb2R1cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9wdWxhdGVWaWV3KHVybCkge1xuICAgICAgICAgIGFjY2Vzc1NlcnZpY2UubGlzdCh1cmwpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAkc2NvcGUuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAkbG9nLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIGNvdW50cmllcyBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1dKVxuICAgIDtcblxufSkodGhpcyk7XG5cbiIsIi8qXG4gKiBDc3NDb250cm9sbGVyXG4gKiBjb250cm9scyBjc3MgdGhlbWVcbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgLy8gdXNpbmcgdGhlIGZ1bmN0aW9uIGZvcm0gb2YgdXNlLXN0cmljdC4uLlxuICBnbG9iYWwuY29uc29sZS5sb2coXCJDc3NDb250cm9sbGVyIGV4ZWN1dGVkIVwiKTtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWluTW9kdWxlJylcbiAgICAuY29udHJvbGxlcignQ3NzQ29udHJvbGxlcicsIFtcbiAgICAgICckbG9jYXRpb24nLCAnJGxvZycsICckc2NvcGUnLCAnYWNjZXNzU2VydmljZScsICdtYWluVXRpbGl0aWVzJyxcbiAgICAgIGZ1bmN0aW9uICgkbG9jYXRpb24sICRsb2csICRzY29wZSwgYWNjZXNzU2VydmljZSwgbWFpblV0aWxpdGllcylcbiAgICAgIHtcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGhlbWU9e307XG4gICAgICAgICRzY29wZS5jdXJyZW50UGF0aCA9ICRsb2NhdGlvbi5wYXRoKCk7XG4gICAgICAgICRzY29wZS50aGVtZXMgPSBhY2Nlc3NTZXJ2aWNlLmNzc1NlbGVjdGlvbi50aGVtZXM7XG4gICAgICAgIGlmIChnbG9iYWwuYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLnRoZW1lcykgJiZcbiAgICAgICAgICBnbG9iYWwuYW5ndWxhci5pc0FycmF5KCRzY29wZS50aGVtZXMpICYmXG4gICAgICAgICAgJHNjb3BlLnRoZW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGhlbWUgPSAkc2NvcGUudGhlbWVzWzBdO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2VsZWN0VGhlbWUgPSBmdW5jdGlvbiAodGhlbWUpIHtcbiAgICAgICAgICAkbG9nLmluZm8oXCJDc3NDb250cm9sbGVyIHNlbGVjdFRoZW1lOlwiLCB0aGVtZSk7XG4gICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGhlbWUgPSB0aGVtZTtcbiAgICAgICAgICBnbG9iYWwualF1ZXJ5KFwiI2Jvb3RzdHJhcFwiKS5hdHRyKFwiaHJlZlwiLCB0aGVtZS5jc3MpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaXNTZWxlY3RlZFRoZW1lID0gZnVuY3Rpb24odGhlbWUpe1xuICAgICAgICAgIGlmIChnbG9iYWwuYW5ndWxhci5pc0RlZmluZWQodGhlbWUpICYmIHRoZW1lLm5hbWUgPT09JHNjb3BlLnNlbGVjdGVkVGhlbWUubmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgXSk7XG5cbn0pKHRoaXMpO1xuXG4iLCIvLyBhbm90aGVyIGZpbGUgYW5kL29yIGFub3RoZXIgYW5vbnltb3VzIGZ1bmN0aW9uXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuICBnbG9iYWwuY29uc29sZS5sb2coXCJhY2Nlc3NTZXJ2aWNlIGV4ZWN1dGVkIVwiKTtcbiAgLy8gdXNpbmcgdGhlIGZ1bmN0aW9uIGZvcm0gb2YgdXNlLXN0cmljdC4uLlxuICBcInVzZSBzdHJpY3RcIjtcbiAgLy8gYWNjZXNzaW5nIHRoZSBtb2R1bGUgaW4gYW5vdGhlci4gXG4gIC8vIHRoaXMgY2FuIGJlIGRvbmUgYnkgY2FsbGluZyBhbmd1bGFyLm1vZHVsZSB3aXRob3V0IHRoZSBbXS1icmFja2V0c1xuICBnbG9iYWwuYW5ndWxhci5tb2R1bGUoJ21haW5Nb2R1bGUnKVxuICAgIC8vIGFwcGVuZGluZyBhbm90aGVyIHNlcnZpY2UvY29udHJvbGxlci9maWx0ZXIgZXRjIHRvIHRoZSBzYW1lIG1vZHVsZS1jYWxsIGluc2lkZSB0aGUgc2FtZSBmaWxlXG4gICAgLnNlcnZpY2UoJ2FjY2Vzc1NlcnZpY2UnLCBmdW5jdGlvbiAoJHEpIHtcbiAgICAgIC8qKlxuICAgICAgICogcmV0dXJucyBhdmFpbGFibGUgY3NzIHRoZW1lc1xuICAgICAgICovXG4gICAgICB0aGlzLmNzc1NlbGVjdGlvbiA9IHtcInZlcnNpb25cIjogXCIzLjMuMSsyXCIsIFwidGhlbWVzXCI6IFtcbiAgICAgICAgICB7XCJuYW1lXCI6IFwiRGVmYXVsdFwiLCBcImRlc2NyaXB0aW9uXCI6IFwiRGVmYXVsdCBib290c3RyYXAgdGhlbWVcIiwgXCJ0aHVtYm5haWxcIjogXCJcIiwgXCJwcmV2aWV3XCI6IFwiXCIsIFwiY3NzXCI6IFwibGliL2Nzcy9ib290c3RyYXAvYm9vdHN0cmFwLTMuMi4wLmNzc1wiLCBcImNzc01pblwiOiBcImxpYi9jc3MvYm9vdHN0cmFwL2Jvb3RzdHJhcC0zLjIuMC5jc3NcIiwgXCJjc3NDZG5cIjogXCJsaWIvY3NzL2Jvb3RzdHJhcC9ib290c3RyYXAtMy4yLjAuY3NzXCIsIFwibGVzc1wiOiBcIlwiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJcIiwgXCJzY3NzXCI6IFwiXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcIlwifSxcbiAgICAgICAgICB7XCJuYW1lXCI6IFwiQ2VydWxlYW5cIiwgXCJkZXNjcmlwdGlvblwiOiBcIkEgY2FsbSBibHVlIHNreVwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jZXJ1bGVhbi90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jZXJ1bGVhbi9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY2VydWxlYW4vYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jZXJ1bGVhbi9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9jZXJ1bGVhbi9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jZXJ1bGVhbi9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2NlcnVsZWFuL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jZXJ1bGVhbi9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jZXJ1bGVhbi9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJDb3Ntb1wiLCBcImRlc2NyaXB0aW9uXCI6IFwiQW4gb2RlIHRvIE1ldHJvXCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2Nvc21vL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2Nvc21vL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jb3Ntby9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2Nvc21vL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L2Nvc21vL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2Nvc21vL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY29zbW8vdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2Nvc21vL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2Nvc21vL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIkN5Ym9yZ1wiLCBcImRlc2NyaXB0aW9uXCI6IFwiSmV0IGJsYWNrIGFuZCBlbGVjdHJpYyBibHVlXCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2N5Ym9yZy90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jeWJvcmcvXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2N5Ym9yZy9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2N5Ym9yZy9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9jeWJvcmcvYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY3lib3JnL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY3lib3JnL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jeWJvcmcvX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY3lib3JnL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIkRhcmtseVwiLCBcImRlc2NyaXB0aW9uXCI6IFwiRmxhdGx5IGluIG5pZ2h0IG1vZGVcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZGFya2x5L3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2RhcmtseS9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZGFya2x5L2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZGFya2x5L2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L2RhcmtseS9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9kYXJrbHkvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9kYXJrbHkvdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2RhcmtseS9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9kYXJrbHkvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiRmxhdGx5XCIsIFwiZGVzY3JpcHRpb25cIjogXCJGbGF0IGFuZCBtb2Rlcm5cIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZmxhdGx5L3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2ZsYXRseS9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZmxhdGx5L2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZmxhdGx5L2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L2ZsYXRseS9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9mbGF0bHkvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9mbGF0bHkvdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2ZsYXRseS9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9mbGF0bHkvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiSm91cm5hbFwiLCBcImRlc2NyaXB0aW9uXCI6IFwiQ3Jpc3AgbGlrZSBhIG5ldyBzaGVldCBvZiBwYXBlclwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9qb3VybmFsL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2pvdXJuYWwvXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2pvdXJuYWwvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9qb3VybmFsL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L2pvdXJuYWwvYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vam91cm5hbC9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2pvdXJuYWwvdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2pvdXJuYWwvX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vam91cm5hbC9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJMdW1lblwiLCBcImRlc2NyaXB0aW9uXCI6IFwiTGlnaHQgYW5kIHNoYWRvd1wiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9sdW1lbi90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9sdW1lbi9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vbHVtZW4vYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9sdW1lbi9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9sdW1lbi9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9sdW1lbi9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2x1bWVuL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9sdW1lbi9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9sdW1lbi9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJQYXBlclwiLCBcImRlc2NyaXB0aW9uXCI6IFwiTWF0ZXJpYWwgaXMgdGhlIG1ldGFwaG9yXCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3BhcGVyL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3BhcGVyL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9wYXBlci9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3BhcGVyL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L3BhcGVyL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3BhcGVyL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcGFwZXIvdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3BhcGVyL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3BhcGVyL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIlJlYWRhYmxlXCIsIFwiZGVzY3JpcHRpb25cIjogXCJPcHRpbWl6ZWQgZm9yIGxlZ2liaWxpdHlcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcmVhZGFibGUvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcmVhZGFibGUvXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3JlYWRhYmxlL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcmVhZGFibGUvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3QvcmVhZGFibGUvYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcmVhZGFibGUvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9yZWFkYWJsZS92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcmVhZGFibGUvX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcmVhZGFibGUvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiU2FuZHN0b25lXCIsIFwiZGVzY3JpcHRpb25cIjogXCJBIHRvdWNoIG9mIHdhcm10aFwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zYW5kc3RvbmUvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2FuZHN0b25lL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zYW5kc3RvbmUvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zYW5kc3RvbmUvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3Qvc2FuZHN0b25lL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NhbmRzdG9uZS9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NhbmRzdG9uZS92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2FuZHN0b25lL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NhbmRzdG9uZS9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJTaW1wbGV4XCIsIFwiZGVzY3JpcHRpb25cIjogXCJNaW5pIGFuZCBtaW5pbWFsaXN0XCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NpbXBsZXgvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2ltcGxleC9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2ltcGxleC9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NpbXBsZXgvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3Qvc2ltcGxleC9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zaW1wbGV4L2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2ltcGxleC92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2ltcGxleC9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zaW1wbGV4L192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIlNsYXRlXCIsIFwiZGVzY3JpcHRpb25cIjogXCJTaGFkZXMgb2YgZ3VubWV0YWwgZ3JheVwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zbGF0ZS90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zbGF0ZS9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2xhdGUvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zbGF0ZS9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9zbGF0ZS9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zbGF0ZS9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NsYXRlL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zbGF0ZS9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zbGF0ZS9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJTcGFjZWxhYlwiLCBcImRlc2NyaXB0aW9uXCI6IFwiU2lsdmVyeSBhbmQgc2xlZWtcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3BhY2VsYWIvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3BhY2VsYWIvXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NwYWNlbGFiL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3BhY2VsYWIvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3Qvc3BhY2VsYWIvYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3BhY2VsYWIvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zcGFjZWxhYi92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3BhY2VsYWIvX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3BhY2VsYWIvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiU3VwZXJoZXJvXCIsIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgYnJhdmUgYW5kIHRoZSBibHVlXCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3N1cGVyaGVyby90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zdXBlcmhlcm8vXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3N1cGVyaGVyby9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3N1cGVyaGVyby9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9zdXBlcmhlcm8vYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3VwZXJoZXJvL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3VwZXJoZXJvL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zdXBlcmhlcm8vX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3VwZXJoZXJvL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIlVuaXRlZFwiLCBcImRlc2NyaXB0aW9uXCI6IFwiVWJ1bnR1IG9yYW5nZSBhbmQgdW5pcXVlIGZvbnRcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vdW5pdGVkL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3VuaXRlZC9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vdW5pdGVkL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vdW5pdGVkL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L3VuaXRlZC9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS91bml0ZWQvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS91bml0ZWQvdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3VuaXRlZC9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS91bml0ZWQvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiWWV0aVwiLCBcImRlc2NyaXB0aW9uXCI6IFwiQSBmcmllbmRseSBmb3VuZGF0aW9uXCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3lldGkvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20veWV0aS9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20veWV0aS9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3lldGkvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3QveWV0aS9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS95ZXRpL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20veWV0aS92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20veWV0aS9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS95ZXRpL192YXJpYWJsZXMuc2Nzc1wifV19O1xuXG4gICAgICB0aGlzLmxpc3QgPSBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoJy9wcm9qZWN0cycgPT09IHVybCkge1xuICAgICAgICAgIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdwcm9qZWN0IDEnLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2ZvciB0ZXN0IHB1cnBvc2VzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdzb21lIG90aGVyIHByb2plY3QnLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ290aGVyIHByb2plY3QnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aXRsZTogJ2Egd2VpcmVkIHByb2plY3QnLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ3dlaXJlZD8/J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgfTtcblxuICAgIH0pO1xuXG59KSh0aGlzKTtcblxuIiwiLy8gYW5vdGhlciBmaWxlIGFuZC9vciBhbm90aGVyIGFub255bW91cyBmdW5jdGlvblxuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgLy8gdXNpbmcgdGhlIGZ1bmN0aW9uIGZvcm0gb2YgdXNlLXN0cmljdC4uLlxuICBnbG9iYWwuY29uc29sZS5sb2coXCJNYWluQ29udHJvbGxlciBleGVjdXRlZCFcIik7XG4gIFwidXNlIHN0cmljdFwiO1xuICAvLyBhY2Nlc3NpbmcgdGhlIG1vZHVsZSBpbiBhbm90aGVyLiBcbiAgLy8gdGhpcyBjYW4gYmUgZG9uZSBieSBjYWxsaW5nIGFuZ3VsYXIubW9kdWxlIHdpdGhvdXQgdGhlIFtdLWJyYWNrZXRzXG4gIGdsb2JhbC5hbmd1bGFyLm1vZHVsZSgnbWFpbk1vZHVsZScpXG4gICAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgW1xuICAgICAgJyRzY29wZScsICckcm91dGUnLCAnYWNjZXNzU2VydmljZScsICdtYWluVXRpbGl0aWVzJywgJ2FwcFByb3BlcnRpZXMnLFxuICAgICAgZnVuY3Rpb24gKCRzY29wZSwgJHJvdXRlLCBhY2Nlc3NTZXJ2aWNlLCBtYWluVXRpbGl0aWVzLCBhcHBQcm9wZXJ0aWVzKSB7XG4gICAgICAgICRzY29wZS5pbmZvID1cbiAgICAgICAgICBtYWluVXRpbGl0aWVzLmNvbmNhdE51bGxTYXZlKFwibmFtZTogXCIsIGFwcFByb3BlcnRpZXMubmFtZSkgK1xuICAgICAgICAgIG1haW5VdGlsaXRpZXMuY29uY2F0TnVsbFNhdmUoXCIgdmVyc2lvbjogXCIsIGFwcFByb3BlcnRpZXMudmVyc2lvbikgK1xuICAgICAgICAgIG1haW5VdGlsaXRpZXMuY29uY2F0TnVsbFNhdmUoXCIgYXV0aG9yOiBcIiwgYXBwUHJvcGVydGllcy5hdXRob3IpO1xuICAgICAgICAkc2NvcGUudGl0bGUgPSAkcm91dGUuY3VycmVudC50aXRsZTtcbiAgICAgIH1dKVxuICAgIDtcblxufSkodGhpcyk7XG5cbiIsIi8vIGFub3RoZXIgZmlsZSBhbmQvb3IgYW5vdGhlciBhbm9ueW1vdXMgZnVuY3Rpb25cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIC8vIHVzaW5nIHRoZSBmdW5jdGlvbiBmb3JtIG9mIHVzZS1zdHJpY3QuLi5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWluTW9kdWxlJylcbiAgICAvLyBhcHBlbmRpbmcgYW5vdGhlciBzZXJ2aWNlL2NvbnRyb2xsZXIvZmlsdGVyIGV0YyB0byB0aGUgc2FtZSBtb2R1bGUtY2FsbCBpbnNpZGUgdGhlIHNhbWUgZmlsZVxuICAgIC5mYWN0b3J5KCdtYWluVXRpbGl0aWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbmNhdE51bGxTYXZlID0gZnVuY3Rpb24gKHN0cmluZzEsIHN0cmluZzIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGlmIChnbG9iYWwuYW5ndWxhci5pc0RlZmluZWQoc3RyaW5nMSkpIHtcbiAgICAgICAgICByZXN1bHQgPSBzdHJpbmcxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnbG9iYWwuYW5ndWxhci5pc0RlZmluZWQoc3RyaW5nMikpIHtcbiAgICAgICAgICByZXN1bHQgKz0gc3RyaW5nMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICAgIHJldHVybntcbiAgICAgICAgY29uY2F0TnVsbFNhdmU6IGNvbmNhdE51bGxTYXZlXG4gICAgICB9O1xuICAgIH0pO1xuXG59KSh0aGlzKTtcblxuXG4iLCIvLyBhbm90aGVyIGZpbGUgYW5kL29yIGFub3RoZXIgYW5vbnltb3VzIGZ1bmN0aW9uXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuICBnbG9iYWwuY29uc29sZS5sb2coXCJtYWluVmFsdWVzIGV4ZWN1dGVkIVwiKTtcbiAgLy8gdXNpbmcgdGhlIGZ1bmN0aW9uIGZvcm0gb2YgdXNlLXN0cmljdC4uLlxuICBcInVzZSBzdHJpY3RcIjtcbiAgLy8gYWNjZXNzaW5nIHRoZSBtb2R1bGUgaW4gYW5vdGhlci4gXG4gIC8vIHRoaXMgY2FuIGJlIGRvbmUgYnkgY2FsbGluZyBhbmd1bGFyLm1vZHVsZSB3aXRob3V0IHRoZSBbXS1icmFja2V0c1xuICBnbG9iYWwuYW5ndWxhci5tb2R1bGUoJ21haW5Nb2R1bGUnKVxuICAgIC8vIGFwcGVuZGluZyBhbm90aGVyIHNlcnZpY2UvY29udHJvbGxlci9maWx0ZXIgZXRjIHRvIHRoZSBzYW1lIG1vZHVsZS1jYWxsIGluc2lkZSB0aGUgc2FtZSBmaWxlXG4gICAgLnZhbHVlKCdhcHBQcm9wZXJ0aWVzJyxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJhbmd1bGFyanMgYm9vdHN0cmFwIGFwcGxpY2F0aW9uXCIsXG4gICAgICAgIHZlcnNpb246IFwiMC4xLjBcIixcbiAgICAgICAgYXV0aG9yOiBcIkd1ZW50aGVyIEZyb2VzdGxcIlxuICAgICAgfVxuXG4gICAgKTtcblxufSkodGhpcyk7XG4iLCIvKipcbiAqIE9iamVjdCBmYWN0b3J5LlxuICogQ3JlYXRlcyBpbnN0YW5jZXMgZm9yIGEgZ2l2ZW4gQ2xhc3MgbmFtZS5cbiAqIEBwYXJhbSB7dHlwZX0gZ2xvYmFsXG4gKi9cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIGdsb2JhbC5jb25zb2xlLmxvZyhcIm9iamVjdGZhY3RvcnkgZXhlY3V0ZWQhXCIpO1xuICAvLyB1c2luZyB0aGUgZnVuY3Rpb24gZm9ybSBvZiB1c2Utc3RyaWN0Li4uXG4gIFwidXNlIHN0cmljdFwiO1xuICAvLyBhY2Nlc3NpbmcgdGhlIG1vZHVsZSBpbiBhbm90aGVyLiBcbiAgLy8gdGhpcyBjYW4gYmUgZG9uZSBieSBjYWxsaW5nIGFuZ3VsYXIubW9kdWxlIHdpdGhvdXQgdGhlIFtdLWJyYWNrZXRzXG4gIGdsb2JhbC5hbmd1bGFyLm1vZHVsZSgnbWFpbk1vZHVsZScpXG5cbiAgICAuc2VydmljZSgnb2JqZWN0RmFjdG9yeScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgdGhpcy5uZXdJbnN0YW5jZUZvck5hbWUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmICgnUHJvamVjdCcgPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvamVjdCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiBQcm9qZWN0KCkge1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJkZXNjcmlwdGlvblwiO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKHRoaXMpO1xuXG4iLCIvLyBhbm90aGVyIGZpbGUgYW5kL29yIGFub3RoZXIgYW5vbnltb3VzIGZ1bmN0aW9uXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuICAvLyB1c2luZyB0aGUgZnVuY3Rpb24gZm9ybSBvZiB1c2Utc3RyaWN0Li4uXG4gIFwidXNlIHN0cmljdFwiO1xuICAvLyBhY2Nlc3NpbmcgdGhlIG1vZHVsZSBpbiBhbm90aGVyLiBcbiAgLy8gdGhpcyBjYW4gYmUgZG9uZSBieSBjYWxsaW5nIGFuZ3VsYXIubW9kdWxlIHdpdGhvdXQgdGhlIFtdLWJyYWNrZXRzXG4gIGdsb2JhbC5hbmd1bGFyLm1vZHVsZSgnbWFpbk1vZHVsZScpXG4gICAgLy8gYXBwZW5kaW5nIGFub3RoZXIgc2VydmljZS9jb250cm9sbGVyL2ZpbHRlciBldGMgdG8gdGhlIHNhbWUgbW9kdWxlLWNhbGwgaW5zaWRlIHRoZSBzYW1lIGZpbGVcbiAgICAucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGdsb2JhbC5jb25zb2xlLmxvZyhcInJ1bigpIGV4ZWN1dGVkIVwiKTtcbiAgICB9KTtcblxufSkodGhpcyk7XG5cbiIsIlxuXG4vLyBhbm90aGVyIGZpbGUgYW5kL29yIGFub3RoZXIgYW5vbnltb3VzIGZ1bmN0aW9uXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuICAvLyB1c2luZyB0aGUgZnVuY3Rpb24gZm9ybSBvZiB1c2Utc3RyaWN0Li4uXG4gIGdsb2JhbC5jb25zb2xlLmxvZyhcIk5hdmlnYXRpb25Db250cm9sbGVyIGV4ZWN1dGVkIVwiKTtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWluTW9kdWxlJylcbiAgICAuY29udHJvbGxlcignTmF2aWdhdGlvbkNvbnRyb2xsZXInLCBbXG4gICAgICAnJHNjb3BlJywgJyRyb3V0ZScsICckbG9jYXRpb24nLCAnZ3VpUm91dGVEZWZpbml0aW9ucycsXG4gICAgICBmdW5jdGlvbiAoJHNjb3BlLCAkcm91dGUsICRsb2NhdGlvbiwgZ3VpUm91dGVEZWZpbml0aW9ucykge1xuICAgICAgICAkc2NvcGUuY3VycmVudFBhdGggPSAkbG9jYXRpb24ucGF0aCgpO1xuICAgICAgICAkc2NvcGUucm91dGVzID0gZ3VpUm91dGVEZWZpbml0aW9ucy5ndWlSb290Tm9kZS5ndWlSb3V0ZXM7XG4gICAgICB9XSlcbiAgICA7XG5cbn0pKHRoaXMpO1xuXG4iLCIvLyBhbm90aGVyIGZpbGUgYW5kL29yIGFub3RoZXIgYW5vbnltb3VzIGZ1bmN0aW9uXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuXG4gIC8vIHVzaW5nIHRoZSBmdW5jdGlvbiBmb3JtIG9mIHVzZS1zdHJpY3QuLi5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWluTW9kdWxlJylcbiAgICAvLyBhcHBlbmRpbmcgYW5vdGhlciBzZXJ2aWNlL2NvbnRyb2xsZXIvZmlsdGVyIGV0YyB0byB0aGUgc2FtZSBtb2R1bGUtY2FsbCBpbnNpZGUgdGhlIHNhbWUgZmlsZVxuICAgIC5jb25maWcoW1wiJHJvdXRlUHJvdmlkZXJcIiwgXCJndWlSb3V0ZURlZmluaXRpb25zUHJvdmlkZXJcIiwgZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyLCBndWlSb3V0ZURlZmluaXRpb25zUHJvdmlkZXIpIHtcbiAgICAgICAgLypcbiAgICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAqIC0tLS0tLS0tLS0tIFN0YXJ0IG9mIHJvdXRlIGRlZmluaXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICovXG4gICAgICAgIGdsb2JhbC5jb25zb2xlLmxvZyhcImd1aVJvdXRlRGVmaW5pdGlvbnNQcm92aWRlci5ndWlSb3V0ZXNcIiwgZ3VpUm91dGVEZWZpbml0aW9uc1Byb3ZpZGVyLmd1aVJvb3ROb2RlKTtcbiAgICAgICAgaWYgKGdsb2JhbC5hbmd1bGFyLmlzRGVmaW5lZChndWlSb3V0ZURlZmluaXRpb25zUHJvdmlkZXIuZ3VpUm9vdE5vZGUpKSB7XG4gICAgICAgICAgY29uZmlndXJlUm91dGVzKCRyb3V0ZVByb3ZpZGVyLCBndWlSb3V0ZURlZmluaXRpb25zUHJvdmlkZXIuZ3VpUm9vdE5vZGUuZ3VpUm91dGVzKTtcbiAgICAgICAgICAkcm91dGVQcm92aWRlci5vdGhlcndpc2Uoe1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogZ3VpUm91dGVEZWZpbml0aW9uc1Byb3ZpZGVyLmRlZmF1bHRSb3V0ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdsb2JhbC5jb25zb2xlLmxvZyhcIm5vIGd1aVJvdXRlRGVmaW5pdGlvbnNQcm92aWRlci5ndWlSb290Tm9kZSwgZmFsbGJhY2sgdG8gZGVmYXVsdCByb3V0ZVwiKTtcbiAgICAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAgICAgLndoZW4oJy9pbmZvJywge1xuICAgICAgICAgICAgICB0aXRsZTogJ0FwcCBJbmZvJyxcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9pbmZvUGFnZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vdGhlcndpc2Uoe1xuICAgICAgICAgICAgICByZWRpcmVjdFRvOiAnL2luZm8nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvbmZpZ3VyZSByb3V0ZXMgYWNjb3JkaW5nIHRvIGNvbmZpZyBvYmplY3RzLlxuICAgICAgICAgKiBAcGFyYW0ge3R5cGV9IHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICogQHBhcmFtIHt0eXBlfSBndWlSb3V0ZXMgQXJyYXkgd2l0aCBndWlSb290ZXNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVJvdXRlcyhyb3V0ZVByb3ZpZGVyLCBndWlSb3V0ZXMpIHtcbiAgICAgICAgICBpZiAoZ2xvYmFsLmFuZ3VsYXIuaXNBcnJheShndWlSb3V0ZXMpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGd1aVJvdXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgZ3VpUm91dGUgPSBndWlSb3V0ZXNbaV07XG4gICAgICAgICAgICAgIGlmIChnbG9iYWwuYW5ndWxhci5pc0RlZmluZWQoZ3VpUm91dGUucm91dGVVcmwpKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcm91dGVTcGVjID0ge1xuICAgICAgICAgICAgICAgICAgdGl0bGU6IGd1aVJvdXRlLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGd1aVJvdXRlLnRlbXBsYXRlVXJsLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogZ3VpUm91dGUuY29udHJvbGxlcixcbiAgICAgICAgICAgICAgICAgIGd1aUNvbmZpZzogZ3VpUm91dGUuZ3VpQ29uZmlnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uc29sZS5sb2coXCJidWlsZFJvdXRlKCkgcm91dFNwZWM9OiBcIiwgcm91dGVTcGVjKTtcbiAgICAgICAgICAgICAgICByb3V0ZVByb3ZpZGVyLndoZW4oZ3VpUm91dGUucm91dGVVcmwsIHJvdXRlU3BlYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGdsb2JhbC5hbmd1bGFyLmlzQXJyYXkoZ3VpUm91dGUuZ3VpUm91dGVzKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyZVJvdXRlcyhyb3V0ZVByb3ZpZGVyLCBndWlSb3V0ZS5ndWlSb3V0ZXMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1dKTtcblxufSkodGhpcyk7XG5cbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgZGVmaW5pdGlvbiBvZiBhbGwgYXBwbGljYWlvbiByb3V0ZXMuXG4gKiBjb2RlZCBhcyBhIHByb3ZpZGVyIHRvIGluamVjdGFibGUgZm9yIC5jb25maWcoKVxuICogQHBhcmFtIHt0eXBlfSBnbG9iYWwgPSB3aW5kb3cgb2JqZWN0XG4gKi9cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIGdsb2JhbC5jb25zb2xlLmxvZyhcImd1aVJvdXRlRGVmaW5pdGlvbnMgZXhlY3V0ZWQhXCIpO1xuICAvLyB1c2luZyB0aGUgZnVuY3Rpb24gZm9ybSBvZiB1c2Utc3RyaWN0Li4uXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGdsb2JhbC5hbmd1bGFyLm1vZHVsZSgnbWFpbk1vZHVsZScpXG4gICAgLnByb3ZpZGVyKCdndWlSb3V0ZURlZmluaXRpb25zJywgZnVuY3Rpb24gZ3VpUm91dGVEZWZpbml0aW9uc1Byb3ZpZGVyKCkge1xuICAgICAgdGhpcy5ndWlSb290Tm9kZSA9XG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCJyb290XCIsXG4gICAgICAgICAgb3JkZXI6IDEsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwidGhlIHJvb3Qgbm9kZVwiLFxuICAgICAgICAgIGd1aVJvdXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aXRsZTogXCJBY3Rpdml0aWVzXCIsXG4gICAgICAgICAgICAgIG9yZGVyOiAxLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTaG93cyBjdXJyZW50IGFjdGl2aXRpZXNcIixcbiAgICAgICAgICAgICAgcm91dGVVcmw6IFwiL2FjdGl2aXRpZXNcIixcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvYWN0aXZpdGllcy9hY3Rpdml0eVBhZ2UuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgIGd1aVJvdXRlczogW10sXG4gICAgICAgICAgICAgIGd1aUNvbmZpZzoge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aXRsZTogXCJQcm9qZWN0cyAmIFRhc2tzXCIsXG4gICAgICAgICAgICAgIG9yZGVyOiAyLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9qZWN0IE1hbmFnbWVudCBTdHVmZlwiLFxuICAgICAgICAgICAgICBndWlSb3V0ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJQcm9qZWN0c1wiLFxuICAgICAgICAgICAgICAgICAgb3JkZXI6IDEsXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYWludGFpbmFuY2Ugb2YgUHJvamVjdHNcIixcbiAgICAgICAgICAgICAgICAgIHJvdXRlVXJsOiBcIi9wcm9qZWN0c1wiLFxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tbW9uL2dlbmVyaWNWaWV3Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0dlbmVyaWNWaWV3Q29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICBndWlSb3V0ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgZ3VpQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2U6IFwiL3Byb2plY3RzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0VmlldzogXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3VHlwZTogXCJsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wbFR5cGU6IFwidWktZ3JpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVsYXRlVmlldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUaXRlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRPcmRlcjogXCJBU0NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0T3JkZXI6IFwiQVNDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJUYXNrc1wiLFxuICAgICAgICAgICAgICAgICAgb3JkZXI6IDIsXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYWludGFpbmFuY2Ugb2YgVGFza3NcIixcbiAgICAgICAgICAgICAgICAgIHJvdXRlVXJsOiBcIi90YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tbW9uL2dlbmVyaWNWaWV3Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0dlbmVyaWNWaWV3Q29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICBndWlSb3V0ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgZ3VpQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkFwcCBJbmZvXCIsXG4gICAgICAgICAgICAgIG9yZGVyOiAzLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTaG93cyBjdXJyZW50IGFjdGl2aXRpZXNcIixcbiAgICAgICAgICAgICAgcm91dGVVcmw6IFwiL2luZm9cIixcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9pbmZvUGFnZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcbiAgICAgICAgICAgICAgZ3VpUm91dGVzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgIHRoaXMuZGVmYXVsdFJvdXRlID0gXCIvYWN0aXZpdGllc1wiO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZ3VpUm9vdE5vZGU6IHNlbGYuZ3VpUm9vdE5vZGUsXG4gICAgICAgICAgZGVmYXVsdFJvdXRlOiBzZWxmLmRlZmF1bHRSb3V0ZVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgIH0pO1xuXG59KSh0aGlzKTtcblxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=