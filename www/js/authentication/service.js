angular.module('starter', ['ngResource'])
.factory('UserSession', function($resource) {
	var login = {}
	login.submit = function(loginData){
		return $resource({
			method: 'POST',
			params: {
				email: loginData.username,
				password: loginData.password
			}
			url: "http://localhost:3000/users"
		})
	}

  return login;
});