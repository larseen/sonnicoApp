'use strict';

angular.module('vioApp')
  .factory('Comment', function ($resource) {
    return $resource('/api/comments/:id', 
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