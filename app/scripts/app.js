'use strict';

angular.module('vioApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ngMap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl',
        authenticate: true
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/company/:companyId', {
        templateUrl: 'partials/company',
        controller: 'CompanyCtrl',
        authenticate: true
      })
      .when('/users', {
        templateUrl: 'partials/users',
        controller: 'UsersCtrl',
        authenticate: true
      })
      .when('/customer/new/:customerId', {
        templateUrl: 'partials/customerReg',
        controller: 'CustomerRegCtrl',
        authenticate: true
      })
      .when('/customer/new', {
        templateUrl: 'partials/customerReg',
        controller: 'CustomerRegCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/login'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {
    // Redirect to main if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });