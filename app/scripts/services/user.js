'use strict';

angular.module('vioApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', 
    {
      id: '@id'
    }, 
    { //parameters default
      updateUser: {
        method: 'POST',
        params: {id: '@id'}
      },
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      remove: {
        method: 'DELETE',
        params: { id: '@id'}
      }
	  });
  });
