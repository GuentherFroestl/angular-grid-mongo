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


