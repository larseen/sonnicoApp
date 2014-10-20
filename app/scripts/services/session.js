'use strict';

angular.module('vioApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
