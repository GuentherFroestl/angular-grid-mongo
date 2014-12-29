// another file and/or another anonymous function
(function (global) {

  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainmodule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .config(function ($routeProvider) {
      /*
       * ---------------------------------------------------------------------------
       * ----------- Start of route definition -------------------------------------
       * ---------------------------------------------------------------------------
       */
      global.console.log("config routes executed!");

      $routeProvider
        .when('/', {
          title: 'Start Page',
          templateUrl: 'app/main/startPage.html',
          controller: 'MainController'
        })
        .otherwise({
          redirectTo: '/'
        });

    });

})(this);

