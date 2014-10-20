'use strict';

angular.module('vioApp')
  .factory('Employee', function ($resource) {
    return $resource('/api/employees/:id', 
    {
      id: '@_id'
    }, 
    {
      update: {
        method: 'POST',
        params: {id: '@_id'}
      },
      remove: {
        method: 'DELETE',
        params: { id:'@_id'}
      },
      all: {
        method: 'GET',
        params: {}
      },
      get: {
        method: 'GET',
        params: { id:'me'}
      }
	  });
});