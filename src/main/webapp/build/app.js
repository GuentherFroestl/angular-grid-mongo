
// one file
(function (global) {
  // declaring the module in one file / anonymous function
  // (only pass a second parameter THIS ONE TIME as a redecleration creates bugs
  // which are very hard to dedect)
  global.angular.module('mainmodule', [
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

;
// another file and/or another anonymous function
(function (global) {
  global.console.log("accessService executed!");
  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainmodule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .service('accessService', function () {
/**
 * returns available css themes
 */
      this.cssSelection = {"version": "3.3.1+2", "themes": [
          {"name": "Default", "description": "Default bootstrap theme", "thumbnail": "", "preview": "", "css": "lib/css/bootstrap/bootstrap-3.2.0.css", "cssMin": "lib/css/bootstrap/bootstrap-3.2.0.css", "cssCdn": "lib/css/bootstrap/bootstrap-3.2.0.css", "less": "", "lessVariables": "", "scss": "", "scssVariables": ""},
          {"name": "Cerulean", "description": "A calm blue sky", "thumbnail": "http://bootswatch.com/cerulean/thumbnail.png", "preview": "http://bootswatch.com/cerulean/", "css": "http://bootswatch.com/cerulean/bootstrap.css", "cssMin": "http://bootswatch.com/cerulean/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/cerulean/bootstrap.css", "less": "http://bootswatch.com/cerulean/bootswatch.less", "lessVariables": "http://bootswatch.com/cerulean/variables.less", "scss": "http://bootswatch.com/cerulean/_bootswatch.scss", "scssVariables": "http://bootswatch.com/cerulean/_variables.scss"}, {"name": "Cosmo", "description": "An ode to Metro", "thumbnail": "http://bootswatch.com/cosmo/thumbnail.png", "preview": "http://bootswatch.com/cosmo/", "css": "http://bootswatch.com/cosmo/bootstrap.css", "cssMin": "http://bootswatch.com/cosmo/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/cosmo/bootstrap.css", "less": "http://bootswatch.com/cosmo/bootswatch.less", "lessVariables": "http://bootswatch.com/cosmo/variables.less", "scss": "http://bootswatch.com/cosmo/_bootswatch.scss", "scssVariables": "http://bootswatch.com/cosmo/_variables.scss"}, {"name": "Cyborg", "description": "Jet black and electric blue", "thumbnail": "http://bootswatch.com/cyborg/thumbnail.png", "preview": "http://bootswatch.com/cyborg/", "css": "http://bootswatch.com/cyborg/bootstrap.css", "cssMin": "http://bootswatch.com/cyborg/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/cyborg/bootstrap.css", "less": "http://bootswatch.com/cyborg/bootswatch.less", "lessVariables": "http://bootswatch.com/cyborg/variables.less", "scss": "http://bootswatch.com/cyborg/_bootswatch.scss", "scssVariables": "http://bootswatch.com/cyborg/_variables.scss"}, {"name": "Darkly", "description": "Flatly in night mode", "thumbnail": "http://bootswatch.com/darkly/thumbnail.png", "preview": "http://bootswatch.com/darkly/", "css": "http://bootswatch.com/darkly/bootstrap.css", "cssMin": "http://bootswatch.com/darkly/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/darkly/bootstrap.css", "less": "http://bootswatch.com/darkly/bootswatch.less", "lessVariables": "http://bootswatch.com/darkly/variables.less", "scss": "http://bootswatch.com/darkly/_bootswatch.scss", "scssVariables": "http://bootswatch.com/darkly/_variables.scss"}, {"name": "Flatly", "description": "Flat and modern", "thumbnail": "http://bootswatch.com/flatly/thumbnail.png", "preview": "http://bootswatch.com/flatly/", "css": "http://bootswatch.com/flatly/bootstrap.css", "cssMin": "http://bootswatch.com/flatly/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/flatly/bootstrap.css", "less": "http://bootswatch.com/flatly/bootswatch.less", "lessVariables": "http://bootswatch.com/flatly/variables.less", "scss": "http://bootswatch.com/flatly/_bootswatch.scss", "scssVariables": "http://bootswatch.com/flatly/_variables.scss"}, {"name": "Journal", "description": "Crisp like a new sheet of paper", "thumbnail": "http://bootswatch.com/journal/thumbnail.png", "preview": "http://bootswatch.com/journal/", "css": "http://bootswatch.com/journal/bootstrap.css", "cssMin": "http://bootswatch.com/journal/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/journal/bootstrap.css", "less": "http://bootswatch.com/journal/bootswatch.less", "lessVariables": "http://bootswatch.com/journal/variables.less", "scss": "http://bootswatch.com/journal/_bootswatch.scss", "scssVariables": "http://bootswatch.com/journal/_variables.scss"}, {"name": "Lumen", "description": "Light and shadow", "thumbnail": "http://bootswatch.com/lumen/thumbnail.png", "preview": "http://bootswatch.com/lumen/", "css": "http://bootswatch.com/lumen/bootstrap.css", "cssMin": "http://bootswatch.com/lumen/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/lumen/bootstrap.css", "less": "http://bootswatch.com/lumen/bootswatch.less", "lessVariables": "http://bootswatch.com/lumen/variables.less", "scss": "http://bootswatch.com/lumen/_bootswatch.scss", "scssVariables": "http://bootswatch.com/lumen/_variables.scss"}, {"name": "Paper", "description": "Material is the metaphor", "thumbnail": "http://bootswatch.com/paper/thumbnail.png", "preview": "http://bootswatch.com/paper/", "css": "http://bootswatch.com/paper/bootstrap.css", "cssMin": "http://bootswatch.com/paper/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/paper/bootstrap.css", "less": "http://bootswatch.com/paper/bootswatch.less", "lessVariables": "http://bootswatch.com/paper/variables.less", "scss": "http://bootswatch.com/paper/_bootswatch.scss", "scssVariables": "http://bootswatch.com/paper/_variables.scss"}, {"name": "Readable", "description": "Optimized for legibility", "thumbnail": "http://bootswatch.com/readable/thumbnail.png", "preview": "http://bootswatch.com/readable/", "css": "http://bootswatch.com/readable/bootstrap.css", "cssMin": "http://bootswatch.com/readable/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/readable/bootstrap.css", "less": "http://bootswatch.com/readable/bootswatch.less", "lessVariables": "http://bootswatch.com/readable/variables.less", "scss": "http://bootswatch.com/readable/_bootswatch.scss", "scssVariables": "http://bootswatch.com/readable/_variables.scss"}, {"name": "Sandstone", "description": "A touch of warmth", "thumbnail": "http://bootswatch.com/sandstone/thumbnail.png", "preview": "http://bootswatch.com/sandstone/", "css": "http://bootswatch.com/sandstone/bootstrap.css", "cssMin": "http://bootswatch.com/sandstone/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/sandstone/bootstrap.css", "less": "http://bootswatch.com/sandstone/bootswatch.less", "lessVariables": "http://bootswatch.com/sandstone/variables.less", "scss": "http://bootswatch.com/sandstone/_bootswatch.scss", "scssVariables": "http://bootswatch.com/sandstone/_variables.scss"}, {"name": "Simplex", "description": "Mini and minimalist", "thumbnail": "http://bootswatch.com/simplex/thumbnail.png", "preview": "http://bootswatch.com/simplex/", "css": "http://bootswatch.com/simplex/bootstrap.css", "cssMin": "http://bootswatch.com/simplex/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/simplex/bootstrap.css", "less": "http://bootswatch.com/simplex/bootswatch.less", "lessVariables": "http://bootswatch.com/simplex/variables.less", "scss": "http://bootswatch.com/simplex/_bootswatch.scss", "scssVariables": "http://bootswatch.com/simplex/_variables.scss"}, {"name": "Slate", "description": "Shades of gunmetal gray", "thumbnail": "http://bootswatch.com/slate/thumbnail.png", "preview": "http://bootswatch.com/slate/", "css": "http://bootswatch.com/slate/bootstrap.css", "cssMin": "http://bootswatch.com/slate/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/slate/bootstrap.css", "less": "http://bootswatch.com/slate/bootswatch.less", "lessVariables": "http://bootswatch.com/slate/variables.less", "scss": "http://bootswatch.com/slate/_bootswatch.scss", "scssVariables": "http://bootswatch.com/slate/_variables.scss"}, {"name": "Spacelab", "description": "Silvery and sleek", "thumbnail": "http://bootswatch.com/spacelab/thumbnail.png", "preview": "http://bootswatch.com/spacelab/", "css": "http://bootswatch.com/spacelab/bootstrap.css", "cssMin": "http://bootswatch.com/spacelab/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/spacelab/bootstrap.css", "less": "http://bootswatch.com/spacelab/bootswatch.less", "lessVariables": "http://bootswatch.com/spacelab/variables.less", "scss": "http://bootswatch.com/spacelab/_bootswatch.scss", "scssVariables": "http://bootswatch.com/spacelab/_variables.scss"}, {"name": "Superhero", "description": "The brave and the blue", "thumbnail": "http://bootswatch.com/superhero/thumbnail.png", "preview": "http://bootswatch.com/superhero/", "css": "http://bootswatch.com/superhero/bootstrap.css", "cssMin": "http://bootswatch.com/superhero/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/superhero/bootstrap.css", "less": "http://bootswatch.com/superhero/bootswatch.less", "lessVariables": "http://bootswatch.com/superhero/variables.less", "scss": "http://bootswatch.com/superhero/_bootswatch.scss", "scssVariables": "http://bootswatch.com/superhero/_variables.scss"}, {"name": "United", "description": "Ubuntu orange and unique font", "thumbnail": "http://bootswatch.com/united/thumbnail.png", "preview": "http://bootswatch.com/united/", "css": "http://bootswatch.com/united/bootstrap.css", "cssMin": "http://bootswatch.com/united/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/united/bootstrap.css", "less": "http://bootswatch.com/united/bootswatch.less", "lessVariables": "http://bootswatch.com/united/variables.less", "scss": "http://bootswatch.com/united/_bootswatch.scss", "scssVariables": "http://bootswatch.com/united/_variables.scss"}, {"name": "Yeti", "description": "A friendly foundation", "thumbnail": "http://bootswatch.com/yeti/thumbnail.png", "preview": "http://bootswatch.com/yeti/", "css": "http://bootswatch.com/yeti/bootstrap.css", "cssMin": "http://bootswatch.com/yeti/bootstrap.css", "cssCdn": "//netdna.bootstrapcdn.com/bootswatch/latest/yeti/bootstrap.css", "less": "http://bootswatch.com/yeti/bootswatch.less", "lessVariables": "http://bootswatch.com/yeti/variables.less", "scss": "http://bootswatch.com/yeti/_bootswatch.scss", "scssVariables": "http://bootswatch.com/yeti/_variables.scss"}]};
      
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

;
// another file and/or another anonymous function
(function(global){   
 // using the function form of use-strict...
 "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainmodule')
  // appending another service/controller/filter etc to the same module-call inside the same file
    .factory('mainUtilities', ['mainValues', function(mainValues){
        var concatNullSave = function(string1, string2){
          var result="";
          if(global.angular.isDefined(string1)){
            result=string1;
          }
          if(global.angular.isDefined(string2)){
            result+=string2;
          }
          return result;
        };
    return{
      concatNullSave : concatNullSave
    };
    }]);

})(this);


;
// another file and/or another anonymous function
(function(global){   
  global.console.log("mainValues executed!");
 // using the function form of use-strict...
 "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainmodule')
  // appending another service/controller/filter etc to the same module-call inside the same file
    .factory('mainValues', function (){ 
    var appProperties ={
      name: "angularjs bootstrap application",
      version: "0.1.0",
      author: "Guenther Froestl"
    } ;
    return{
      appProperties : appProperties
    };
    });

})(this);
;
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

;
// another file and/or another anonymous function
(function (global) {
  // using the function form of use-strict...
  "use strict";
  // accessing the module in another. 
  // this can be done by calling angular.module without the []-brackets
  global.angular.module('mainmodule')
    // appending another service/controller/filter etc to the same module-call inside the same file
    .run(function () {
      global.console.log("run() executed!");
    });

})(this);


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4tbW9kdWxlLmpzIiwiY3NzX3RoZW1lL2Nzc0NvbnRyb2xsZXIuanMiLCJtYWluL2FjY2Vzc1NlcnZpY2UuanMiLCJtYWluL21haW5Db250cm9sbGVyLmpzIiwibWFpbi9tYWluVXRpbGl0aWVzLmpzIiwibWFpbi9tYWluVmFsdWVzLmpzIiwibWFpbi9uYXZpZ2F0aW9uUm91dGVzLmpzIiwibWFpbi9ydW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBvbmUgZmlsZVxuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgLy8gZGVjbGFyaW5nIHRoZSBtb2R1bGUgaW4gb25lIGZpbGUgLyBhbm9ueW1vdXMgZnVuY3Rpb25cbiAgLy8gKG9ubHkgcGFzcyBhIHNlY29uZCBwYXJhbWV0ZXIgVEhJUyBPTkUgVElNRSBhcyBhIHJlZGVjbGVyYXRpb24gY3JlYXRlcyBidWdzXG4gIC8vIHdoaWNoIGFyZSB2ZXJ5IGhhcmQgdG8gZGVkZWN0KVxuICBnbG9iYWwuYW5ndWxhci5tb2R1bGUoJ21haW5tb2R1bGUnLCBbXG4gICAgJ25nUmVzb3VyY2UnLFxuICAgICduZ1JvdXRlJyxcbiAgICAndWkuZ3JpZCcsXG4gICAgJ3VpLmdyaWQuZWRpdCcsXG4gICAgJ3VpLmdyaWQuY2VsbE5hdicsXG4gICAgJ3VpLmdyaWQucGlubmluZycsXG4gICAgJ3VpLmdyaWQuc2VsZWN0aW9uJyxcbiAgICAndWkuZ3JpZC5yb3dFZGl0JyxcbiAgICAndWkuZ3JpZC5yZXNpemVDb2x1bW5zJyxcbiAgICAndWkuZ3JpZC5hdXRvUmVzaXplJ1xuICBdKVxuICAucnVuKGZ1bmN0aW9uKCl7XG4gICAgZ2xvYmFsLmNvbnNvbGUubG9nKFwicnVuKCkgZXhlY3V0ZWQhXCIpO1xuICB9KTtcbn0pKHRoaXMpO1xuIiwiLypcbiAqIENzc0NvbnRyb2xsZXJcbiAqIGNvbnRyb2xzIGNzcyB0aGVtZVxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuICAvLyB1c2luZyB0aGUgZnVuY3Rpb24gZm9ybSBvZiB1c2Utc3RyaWN0Li4uXG4gIGdsb2JhbC5jb25zb2xlLmxvZyhcIkNzc0NvbnRyb2xsZXIgZXhlY3V0ZWQhXCIpO1xuICBcInVzZSBzdHJpY3RcIjtcbiAgLy8gYWNjZXNzaW5nIHRoZSBtb2R1bGUgaW4gYW5vdGhlci4gXG4gIC8vIHRoaXMgY2FuIGJlIGRvbmUgYnkgY2FsbGluZyBhbmd1bGFyLm1vZHVsZSB3aXRob3V0IHRoZSBbXS1icmFja2V0c1xuICBnbG9iYWwuYW5ndWxhci5tb2R1bGUoJ21haW5tb2R1bGUnKVxuICAgIC5jb250cm9sbGVyKCdDc3NDb250cm9sbGVyJywgW1xuICAgICAgJyRsb2NhdGlvbicsICckbG9nJywgJyRzY29wZScsICdhY2Nlc3NTZXJ2aWNlJywgJ21haW5VdGlsaXRpZXMnLCAnbWFpblZhbHVlcycsXG4gICAgICBmdW5jdGlvbiAoJGxvY2F0aW9uLCAkbG9nLCAkc2NvcGUsIGFjY2Vzc1NlcnZpY2UsIG1haW5VdGlsaXRpZXMsIG1haW5WYWx1ZXMpXG4gICAgICB7XG4gICAgICAgICRzY29wZS5zZWxlY3RlZFRoZW1lPXt9O1xuICAgICAgICAkc2NvcGUuY3VycmVudFBhdGggPSAkbG9jYXRpb24ucGF0aCgpO1xuICAgICAgICAkc2NvcGUudGhlbWVzID0gYWNjZXNzU2VydmljZS5jc3NTZWxlY3Rpb24udGhlbWVzO1xuICAgICAgICBpZiAoZ2xvYmFsLmFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS50aGVtZXMpICYmXG4gICAgICAgICAgZ2xvYmFsLmFuZ3VsYXIuaXNBcnJheSgkc2NvcGUudGhlbWVzKSAmJlxuICAgICAgICAgICRzY29wZS50aGVtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRoZW1lID0gJHNjb3BlLnRoZW1lc1swXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNlbGVjdFRoZW1lID0gZnVuY3Rpb24gKHRoZW1lKSB7XG4gICAgICAgICAgJGxvZy5pbmZvKFwiQ3NzQ29udHJvbGxlciBzZWxlY3RUaGVtZTpcIiwgdGhlbWUpO1xuICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRoZW1lID0gdGhlbWU7XG4gICAgICAgICAgZ2xvYmFsLmpRdWVyeShcImxpbmtcIikuYXR0cihcImhyZWZcIiwgdGhlbWUuY3NzKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzU2VsZWN0ZWRUaGVtZSA9IGZ1bmN0aW9uKHRoZW1lKXtcbiAgICAgICAgICBpZiAoZ2xvYmFsLmFuZ3VsYXIuaXNEZWZpbmVkKHRoZW1lKSAmJiB0aGVtZS5uYW1lID09PSRzY29wZS5zZWxlY3RlZFRoZW1lLm5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIF0pO1xuXG59KSh0aGlzKTtcblxuIiwiLy8gYW5vdGhlciBmaWxlIGFuZC9vciBhbm90aGVyIGFub255bW91cyBmdW5jdGlvblxuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgZ2xvYmFsLmNvbnNvbGUubG9nKFwiYWNjZXNzU2VydmljZSBleGVjdXRlZCFcIik7XG4gIC8vIHVzaW5nIHRoZSBmdW5jdGlvbiBmb3JtIG9mIHVzZS1zdHJpY3QuLi5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWlubW9kdWxlJylcbiAgICAvLyBhcHBlbmRpbmcgYW5vdGhlciBzZXJ2aWNlL2NvbnRyb2xsZXIvZmlsdGVyIGV0YyB0byB0aGUgc2FtZSBtb2R1bGUtY2FsbCBpbnNpZGUgdGhlIHNhbWUgZmlsZVxuICAgIC5zZXJ2aWNlKCdhY2Nlc3NTZXJ2aWNlJywgZnVuY3Rpb24gKCkge1xuLyoqXG4gKiByZXR1cm5zIGF2YWlsYWJsZSBjc3MgdGhlbWVzXG4gKi9cbiAgICAgIHRoaXMuY3NzU2VsZWN0aW9uID0ge1widmVyc2lvblwiOiBcIjMuMy4xKzJcIiwgXCJ0aGVtZXNcIjogW1xuICAgICAgICAgIHtcIm5hbWVcIjogXCJEZWZhdWx0XCIsIFwiZGVzY3JpcHRpb25cIjogXCJEZWZhdWx0IGJvb3RzdHJhcCB0aGVtZVwiLCBcInRodW1ibmFpbFwiOiBcIlwiLCBcInByZXZpZXdcIjogXCJcIiwgXCJjc3NcIjogXCJsaWIvY3NzL2Jvb3RzdHJhcC9ib290c3RyYXAtMy4yLjAuY3NzXCIsIFwiY3NzTWluXCI6IFwibGliL2Nzcy9ib290c3RyYXAvYm9vdHN0cmFwLTMuMi4wLmNzc1wiLCBcImNzc0NkblwiOiBcImxpYi9jc3MvYm9vdHN0cmFwL2Jvb3RzdHJhcC0zLjIuMC5jc3NcIiwgXCJsZXNzXCI6IFwiXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcIlwiLCBcInNjc3NcIjogXCJcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiXCJ9LFxuICAgICAgICAgIHtcIm5hbWVcIjogXCJDZXJ1bGVhblwiLCBcImRlc2NyaXB0aW9uXCI6IFwiQSBjYWxtIGJsdWUgc2t5XCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2NlcnVsZWFuL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2NlcnVsZWFuL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jZXJ1bGVhbi9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2NlcnVsZWFuL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L2NlcnVsZWFuL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2NlcnVsZWFuL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY2VydWxlYW4vdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2NlcnVsZWFuL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2NlcnVsZWFuL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIkNvc21vXCIsIFwiZGVzY3JpcHRpb25cIjogXCJBbiBvZGUgdG8gTWV0cm9cIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY29zbW8vdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY29zbW8vXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2Nvc21vL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY29zbW8vYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3QvY29zbW8vYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY29zbW8vYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jb3Ntby92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY29zbW8vX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY29zbW8vX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiQ3lib3JnXCIsIFwiZGVzY3JpcHRpb25cIjogXCJKZXQgYmxhY2sgYW5kIGVsZWN0cmljIGJsdWVcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY3lib3JnL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2N5Ym9yZy9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY3lib3JnL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vY3lib3JnL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L2N5Ym9yZy9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jeWJvcmcvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jeWJvcmcvdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2N5Ym9yZy9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9jeWJvcmcvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiRGFya2x5XCIsIFwiZGVzY3JpcHRpb25cIjogXCJGbGF0bHkgaW4gbmlnaHQgbW9kZVwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9kYXJrbHkvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZGFya2x5L1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9kYXJrbHkvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9kYXJrbHkvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3QvZGFya2x5L2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2RhcmtseS9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2RhcmtseS92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZGFya2x5L19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2RhcmtseS9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJGbGF0bHlcIiwgXCJkZXNjcmlwdGlvblwiOiBcIkZsYXQgYW5kIG1vZGVyblwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9mbGF0bHkvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZmxhdGx5L1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9mbGF0bHkvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9mbGF0bHkvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3QvZmxhdGx5L2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2ZsYXRseS9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2ZsYXRseS92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vZmxhdGx5L19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2ZsYXRseS9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJKb3VybmFsXCIsIFwiZGVzY3JpcHRpb25cIjogXCJDcmlzcCBsaWtlIGEgbmV3IHNoZWV0IG9mIHBhcGVyXCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2pvdXJuYWwvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vam91cm5hbC9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vam91cm5hbC9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2pvdXJuYWwvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3Qvam91cm5hbC9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9qb3VybmFsL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vam91cm5hbC92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vam91cm5hbC9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9qb3VybmFsL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIkx1bWVuXCIsIFwiZGVzY3JpcHRpb25cIjogXCJMaWdodCBhbmQgc2hhZG93XCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2x1bWVuL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2x1bWVuL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9sdW1lbi9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2x1bWVuL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L2x1bWVuL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2x1bWVuL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vbHVtZW4vdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2x1bWVuL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL2x1bWVuL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIlBhcGVyXCIsIFwiZGVzY3JpcHRpb25cIjogXCJNYXRlcmlhbCBpcyB0aGUgbWV0YXBob3JcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcGFwZXIvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcGFwZXIvXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3BhcGVyL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcGFwZXIvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3QvcGFwZXIvYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcGFwZXIvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9wYXBlci92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcGFwZXIvX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcGFwZXIvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiUmVhZGFibGVcIiwgXCJkZXNjcmlwdGlvblwiOiBcIk9wdGltaXplZCBmb3IgbGVnaWJpbGl0eVwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9yZWFkYWJsZS90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9yZWFkYWJsZS9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vcmVhZGFibGUvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9yZWFkYWJsZS9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9yZWFkYWJsZS9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9yZWFkYWJsZS9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3JlYWRhYmxlL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9yZWFkYWJsZS9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9yZWFkYWJsZS9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJTYW5kc3RvbmVcIiwgXCJkZXNjcmlwdGlvblwiOiBcIkEgdG91Y2ggb2Ygd2FybXRoXCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NhbmRzdG9uZS90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zYW5kc3RvbmUvXCIsIFwiY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NhbmRzdG9uZS9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NhbmRzdG9uZS9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9zYW5kc3RvbmUvYm9vdHN0cmFwLmNzc1wiLCBcImxlc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2FuZHN0b25lL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2FuZHN0b25lL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zYW5kc3RvbmUvX2Jvb3Rzd2F0Y2guc2Nzc1wiLCBcInNjc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2FuZHN0b25lL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIlNpbXBsZXhcIiwgXCJkZXNjcmlwdGlvblwiOiBcIk1pbmkgYW5kIG1pbmltYWxpc3RcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2ltcGxleC90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zaW1wbGV4L1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zaW1wbGV4L2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2ltcGxleC9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9zaW1wbGV4L2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NpbXBsZXgvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zaW1wbGV4L3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zaW1wbGV4L19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NpbXBsZXgvX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiU2xhdGVcIiwgXCJkZXNjcmlwdGlvblwiOiBcIlNoYWRlcyBvZiBndW5tZXRhbCBncmF5XCIsIFwidGh1bWJuYWlsXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NsYXRlL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NsYXRlL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zbGF0ZS9ib290c3RyYXAuY3NzXCIsIFwiY3NzTWluXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NsYXRlL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L3NsYXRlL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NsYXRlL2Jvb3Rzd2F0Y2gubGVzc1wiLCBcImxlc3NWYXJpYWJsZXNcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc2xhdGUvdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NsYXRlL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NsYXRlL192YXJpYWJsZXMuc2Nzc1wifSwge1wibmFtZVwiOiBcIlNwYWNlbGFiXCIsIFwiZGVzY3JpcHRpb25cIjogXCJTaWx2ZXJ5IGFuZCBzbGVla1wiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zcGFjZWxhYi90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zcGFjZWxhYi9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3BhY2VsYWIvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zcGFjZWxhYi9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC9zcGFjZWxhYi9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zcGFjZWxhYi9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3NwYWNlbGFiL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zcGFjZWxhYi9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zcGFjZWxhYi9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJTdXBlcmhlcm9cIiwgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBicmF2ZSBhbmQgdGhlIGJsdWVcIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3VwZXJoZXJvL3RodW1ibmFpbC5wbmdcIiwgXCJwcmV2aWV3XCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3N1cGVyaGVyby9cIiwgXCJjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3VwZXJoZXJvL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vc3VwZXJoZXJvL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NDZG5cIjogXCIvL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2Jvb3Rzd2F0Y2gvbGF0ZXN0L3N1cGVyaGVyby9ib290c3RyYXAuY3NzXCIsIFwibGVzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zdXBlcmhlcm8vYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zdXBlcmhlcm8vdmFyaWFibGVzLmxlc3NcIiwgXCJzY3NzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3N1cGVyaGVyby9fYm9vdHN3YXRjaC5zY3NzXCIsIFwic2Nzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS9zdXBlcmhlcm8vX3ZhcmlhYmxlcy5zY3NzXCJ9LCB7XCJuYW1lXCI6IFwiVW5pdGVkXCIsIFwiZGVzY3JpcHRpb25cIjogXCJVYnVudHUgb3JhbmdlIGFuZCB1bmlxdWUgZm9udFwiLCBcInRodW1ibmFpbFwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS91bml0ZWQvdGh1bWJuYWlsLnBuZ1wiLCBcInByZXZpZXdcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vdW5pdGVkL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS91bml0ZWQvYm9vdHN0cmFwLmNzc1wiLCBcImNzc01pblwiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS91bml0ZWQvYm9vdHN0cmFwLmNzc1wiLCBcImNzc0NkblwiOiBcIi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN3YXRjaC9sYXRlc3QvdW5pdGVkL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3VuaXRlZC9ib290c3dhdGNoLmxlc3NcIiwgXCJsZXNzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3VuaXRlZC92YXJpYWJsZXMubGVzc1wiLCBcInNjc3NcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20vdW5pdGVkL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3VuaXRlZC9fdmFyaWFibGVzLnNjc3NcIn0sIHtcIm5hbWVcIjogXCJZZXRpXCIsIFwiZGVzY3JpcHRpb25cIjogXCJBIGZyaWVuZGx5IGZvdW5kYXRpb25cIiwgXCJ0aHVtYm5haWxcIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20veWV0aS90aHVtYm5haWwucG5nXCIsIFwicHJldmlld1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS95ZXRpL1wiLCBcImNzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS95ZXRpL2Jvb3RzdHJhcC5jc3NcIiwgXCJjc3NNaW5cIjogXCJodHRwOi8vYm9vdHN3YXRjaC5jb20veWV0aS9ib290c3RyYXAuY3NzXCIsIFwiY3NzQ2RuXCI6IFwiLy9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9ib290c3dhdGNoL2xhdGVzdC95ZXRpL2Jvb3RzdHJhcC5jc3NcIiwgXCJsZXNzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3lldGkvYm9vdHN3YXRjaC5sZXNzXCIsIFwibGVzc1ZhcmlhYmxlc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS95ZXRpL3ZhcmlhYmxlcy5sZXNzXCIsIFwic2Nzc1wiOiBcImh0dHA6Ly9ib290c3dhdGNoLmNvbS95ZXRpL19ib290c3dhdGNoLnNjc3NcIiwgXCJzY3NzVmFyaWFibGVzXCI6IFwiaHR0cDovL2Jvb3Rzd2F0Y2guY29tL3lldGkvX3ZhcmlhYmxlcy5zY3NzXCJ9XX07XG4gICAgICBcbiAgICB9KTtcblxufSkodGhpcyk7XG5cbiIsIi8vIGFub3RoZXIgZmlsZSBhbmQvb3IgYW5vdGhlciBhbm9ueW1vdXMgZnVuY3Rpb25cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIC8vIHVzaW5nIHRoZSBmdW5jdGlvbiBmb3JtIG9mIHVzZS1zdHJpY3QuLi5cbiAgIGdsb2JhbC5jb25zb2xlLmxvZyhcIk1haW5Db250cm9sbGVyIGV4ZWN1dGVkIVwiKTtcblwidXNlIHN0cmljdFwiO1xuICAvLyBhY2Nlc3NpbmcgdGhlIG1vZHVsZSBpbiBhbm90aGVyLiBcbiAgLy8gdGhpcyBjYW4gYmUgZG9uZSBieSBjYWxsaW5nIGFuZ3VsYXIubW9kdWxlIHdpdGhvdXQgdGhlIFtdLWJyYWNrZXRzXG4gIGdsb2JhbC5hbmd1bGFyLm1vZHVsZSgnbWFpbm1vZHVsZScpXG4gICAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgW1xuICAgICAgJyRzY29wZScsICdhY2Nlc3NTZXJ2aWNlJywgJ21haW5VdGlsaXRpZXMnLCAnbWFpblZhbHVlcycsXG4gICAgICBmdW5jdGlvbiAoJHNjb3BlLCBhY2Nlc3NTZXJ2aWNlLCBtYWluVXRpbGl0aWVzLCBtYWluVmFsdWVzKSB7XG4gICAgICAgICRzY29wZS5pbmZvID0gXG4gICAgICAgICAgbWFpblV0aWxpdGllcy5jb25jYXROdWxsU2F2ZShcIm5hbWU6IFwiLCBtYWluVmFsdWVzLmFwcFByb3BlcnRpZXMubmFtZSkrXG4gICAgICAgICAgbWFpblV0aWxpdGllcy5jb25jYXROdWxsU2F2ZShcIiB2ZXJzaW9uOiBcIiwgbWFpblZhbHVlcy5hcHBQcm9wZXJ0aWVzLnZlcnNpb24pK1xuICAgICAgICAgIG1haW5VdGlsaXRpZXMuY29uY2F0TnVsbFNhdmUoXCIgYXV0aG9yOiBcIiwgbWFpblZhbHVlcy5hcHBQcm9wZXJ0aWVzLmF1dGhvcik7XG4gICAgICB9XSlcbiAgICA7XG5cbn0pKHRoaXMpO1xuXG4iLCIvLyBhbm90aGVyIGZpbGUgYW5kL29yIGFub3RoZXIgYW5vbnltb3VzIGZ1bmN0aW9uXG4oZnVuY3Rpb24oZ2xvYmFsKXsgICBcbiAvLyB1c2luZyB0aGUgZnVuY3Rpb24gZm9ybSBvZiB1c2Utc3RyaWN0Li4uXG4gXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWlubW9kdWxlJylcbiAgLy8gYXBwZW5kaW5nIGFub3RoZXIgc2VydmljZS9jb250cm9sbGVyL2ZpbHRlciBldGMgdG8gdGhlIHNhbWUgbW9kdWxlLWNhbGwgaW5zaWRlIHRoZSBzYW1lIGZpbGVcbiAgICAuZmFjdG9yeSgnbWFpblV0aWxpdGllcycsIFsnbWFpblZhbHVlcycsIGZ1bmN0aW9uKG1haW5WYWx1ZXMpe1xuICAgICAgICB2YXIgY29uY2F0TnVsbFNhdmUgPSBmdW5jdGlvbihzdHJpbmcxLCBzdHJpbmcyKXtcbiAgICAgICAgICB2YXIgcmVzdWx0PVwiXCI7XG4gICAgICAgICAgaWYoZ2xvYmFsLmFuZ3VsYXIuaXNEZWZpbmVkKHN0cmluZzEpKXtcbiAgICAgICAgICAgIHJlc3VsdD1zdHJpbmcxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihnbG9iYWwuYW5ndWxhci5pc0RlZmluZWQoc3RyaW5nMikpe1xuICAgICAgICAgICAgcmVzdWx0Kz1zdHJpbmcyO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIHJldHVybntcbiAgICAgIGNvbmNhdE51bGxTYXZlIDogY29uY2F0TnVsbFNhdmVcbiAgICB9O1xuICAgIH1dKTtcblxufSkodGhpcyk7XG5cblxuIiwiLy8gYW5vdGhlciBmaWxlIGFuZC9vciBhbm90aGVyIGFub255bW91cyBmdW5jdGlvblxuKGZ1bmN0aW9uKGdsb2JhbCl7ICAgXG4gIGdsb2JhbC5jb25zb2xlLmxvZyhcIm1haW5WYWx1ZXMgZXhlY3V0ZWQhXCIpO1xuIC8vIHVzaW5nIHRoZSBmdW5jdGlvbiBmb3JtIG9mIHVzZS1zdHJpY3QuLi5cbiBcInVzZSBzdHJpY3RcIjtcbiAgLy8gYWNjZXNzaW5nIHRoZSBtb2R1bGUgaW4gYW5vdGhlci4gXG4gIC8vIHRoaXMgY2FuIGJlIGRvbmUgYnkgY2FsbGluZyBhbmd1bGFyLm1vZHVsZSB3aXRob3V0IHRoZSBbXS1icmFja2V0c1xuICBnbG9iYWwuYW5ndWxhci5tb2R1bGUoJ21haW5tb2R1bGUnKVxuICAvLyBhcHBlbmRpbmcgYW5vdGhlciBzZXJ2aWNlL2NvbnRyb2xsZXIvZmlsdGVyIGV0YyB0byB0aGUgc2FtZSBtb2R1bGUtY2FsbCBpbnNpZGUgdGhlIHNhbWUgZmlsZVxuICAgIC5mYWN0b3J5KCdtYWluVmFsdWVzJywgZnVuY3Rpb24gKCl7IFxuICAgIHZhciBhcHBQcm9wZXJ0aWVzID17XG4gICAgICBuYW1lOiBcImFuZ3VsYXJqcyBib290c3RyYXAgYXBwbGljYXRpb25cIixcbiAgICAgIHZlcnNpb246IFwiMC4xLjBcIixcbiAgICAgIGF1dGhvcjogXCJHdWVudGhlciBGcm9lc3RsXCJcbiAgICB9IDtcbiAgICByZXR1cm57XG4gICAgICBhcHBQcm9wZXJ0aWVzIDogYXBwUHJvcGVydGllc1xuICAgIH07XG4gICAgfSk7XG5cbn0pKHRoaXMpO1xuIiwiLy8gYW5vdGhlciBmaWxlIGFuZC9vciBhbm90aGVyIGFub255bW91cyBmdW5jdGlvblxuKGZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICAvLyB1c2luZyB0aGUgZnVuY3Rpb24gZm9ybSBvZiB1c2Utc3RyaWN0Li4uXG4gIFwidXNlIHN0cmljdFwiO1xuICAvLyBhY2Nlc3NpbmcgdGhlIG1vZHVsZSBpbiBhbm90aGVyLiBcbiAgLy8gdGhpcyBjYW4gYmUgZG9uZSBieSBjYWxsaW5nIGFuZ3VsYXIubW9kdWxlIHdpdGhvdXQgdGhlIFtdLWJyYWNrZXRzXG4gIGdsb2JhbC5hbmd1bGFyLm1vZHVsZSgnbWFpbm1vZHVsZScpXG4gICAgLy8gYXBwZW5kaW5nIGFub3RoZXIgc2VydmljZS9jb250cm9sbGVyL2ZpbHRlciBldGMgdG8gdGhlIHNhbWUgbW9kdWxlLWNhbGwgaW5zaWRlIHRoZSBzYW1lIGZpbGVcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuICAgICAgLypcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogLS0tLS0tLS0tLS0gU3RhcnQgb2Ygcm91dGUgZGVmaW5pdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuICAgICAgZ2xvYmFsLmNvbnNvbGUubG9nKFwiY29uZmlnIHJvdXRlcyBleGVjdXRlZCFcIik7XG5cbiAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgIHRpdGxlOiAnU3RhcnQgUGFnZScsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9zdGFydFBhZ2UuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgICAgICB9KVxuICAgICAgICAub3RoZXJ3aXNlKHtcbiAgICAgICAgICByZWRpcmVjdFRvOiAnLydcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkodGhpcyk7XG5cbiIsIi8vIGFub3RoZXIgZmlsZSBhbmQvb3IgYW5vdGhlciBhbm9ueW1vdXMgZnVuY3Rpb25cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIC8vIHVzaW5nIHRoZSBmdW5jdGlvbiBmb3JtIG9mIHVzZS1zdHJpY3QuLi5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIGFjY2Vzc2luZyB0aGUgbW9kdWxlIGluIGFub3RoZXIuIFxuICAvLyB0aGlzIGNhbiBiZSBkb25lIGJ5IGNhbGxpbmcgYW5ndWxhci5tb2R1bGUgd2l0aG91dCB0aGUgW10tYnJhY2tldHNcbiAgZ2xvYmFsLmFuZ3VsYXIubW9kdWxlKCdtYWlubW9kdWxlJylcbiAgICAvLyBhcHBlbmRpbmcgYW5vdGhlciBzZXJ2aWNlL2NvbnRyb2xsZXIvZmlsdGVyIGV0YyB0byB0aGUgc2FtZSBtb2R1bGUtY2FsbCBpbnNpZGUgdGhlIHNhbWUgZmlsZVxuICAgIC5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgZ2xvYmFsLmNvbnNvbGUubG9nKFwicnVuKCkgZXhlY3V0ZWQhXCIpO1xuICAgIH0pO1xuXG59KSh0aGlzKTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9