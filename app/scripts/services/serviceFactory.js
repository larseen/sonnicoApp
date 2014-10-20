'use strict';

angular.module('vioApp')
  .factory('Service', function ($resource) {
    return $resource('/api/services/:id', 
    {
      id: '@id'
    }, 
    {
      add: {
        method: 'POST',
        params: {}
      },
      update: {
        method: 'PUT',
        params: { id:'@me'}
      },
      remove: {
        method: 'DELETE',
        params: { id:'@me'}
      }
	});
});