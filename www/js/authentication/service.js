angular.module('starter.controllers', [])
.factory('UserSession', function($resource) {
  return $resource("http://localhost:3000/users/sign_in.json");
});
