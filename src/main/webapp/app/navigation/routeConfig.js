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

