'use strict';

angular.module('vioApp')
  .factory('Customer', function ($resource) {
    return $resource('/api/customers/:id', 
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
        params: { id:'@id'}
      },
      remove: {
        method: 'DELETE',
        params: { id:'@me'}
      }
	});
});