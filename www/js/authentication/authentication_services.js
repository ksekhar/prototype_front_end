angular.module('starter.user.services', [])
.factory('userSession', function($http, $cookies) {
	var LOCAL_USER_DETAILs = 'userDetails';
  var username = '';

  function storeUserDetails(userDetails) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    // Setting a cookie
    $cookies.put('auth', userDetails.auth, {'expires': expireDate});
    window.localStorage.setItem(LOCAL_USER_DETAILs, userDetails.username);
    username = userDetails.username;
  }
 
  function destroyUserDetails() {
  	$cookies.remove('auth');
    window.localStorage.removeItem(LOCAL_USER_DETAILs);
    SessionStorage.clear();
  }

	var login = function(loginDetails){
			return $http.post("http://localhost:3000/users/login", loginDetails).success(function(response){
				if(response.success) {
					storeUserDetails(response.user_details);
					return response;
				}
			});
		}

	var register = function(userDetails) {
    return $http.post('http://localhost:3000/users', userDetails)
     .success(function (response) {
          if(response.success){
            storeUserDetails(response.user_details);
            return response;
          }
     });
  }
 
  var logout = function() {
    return $http.get('http://localhost:3000/users/logout')
     .success(function (res) {
          destroyUserDetails();
        });
  }

  return {login: login,
  				logout: logout,
  				register: register,
  				username: function() {return username}};
});