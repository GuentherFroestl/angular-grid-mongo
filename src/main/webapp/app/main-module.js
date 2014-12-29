
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
