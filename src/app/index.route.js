(function() {
  'use strict';

  angular
    .module('assignment')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('home',{
      url: '/',
      views: {
        "@":{
          templateUrl: 'app/main/main.html'
        },
         "header@home": {
          templateUrl: 'app/components/header/header.html',
          controller: 'HeaderController',
          controllerAs: 'headCtrl'
        },
        "main-content@home": {
          templateUrl: 'app/components/home/home.html',
          controller: 'HomeController',
          controllerAs: 'homeCtrl'
        }
      }
    })
    .state('home.user-form',{
      url: '^/user-form',
      views: {
        "main-content@home": {
          templateUrl: 'app/components/user-form/form.html',
          controller: 'UserFormController',
          controllerAs: 'formCtrl'
        }
      }
    })
    .state('home.view-user',{
      url: '^/view-user',
      views: {
        "main-content@home": {
          templateUrl: 'app/components/view-user/user.html',
          controller: 'UserViewController',
          controllerAs: 'userCtrl'
        }
      }
    })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })

    $urlRouterProvider.otherwise('/');
  }

})();
