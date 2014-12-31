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

