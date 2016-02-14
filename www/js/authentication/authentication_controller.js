angular.module('starter.authentication.controllers', [])

.controller('AuthenticationCtrl', function($rootScope, $scope, $http, $stateParams, $state, services, userSession) {
	$scope.loginData = {};
  $scope.doLogin = function() {
  	userSession.login({email : $scope.loginData.username, password: $scope.loginData.password}).success(function(response) {
  		$scope.success = response.success;
  		$rootScope.username = window.localStorage.getItem('userDetails');
  		$state.go('app.home', {}, { reload: true });
  	});
  }

  $scope.registerData = {}
  $scope.doRegister = function() {
    console.log($scope.registerData);
     $http.post('http://localhost:3000/users', {email : $scope.registerData.email, username: $scope.registerData.username,
                                                      first_name: $scope.registerData.first_name, last_name: $scope.registerData.last_name,
                                                      password: $scope.registerData.password,
                                                      password_confirmation: $scope.registerData.password_confirm})
     .then(function (res) {
            $scope.response = res.data;
            console.log($scope.response);
            $scope.success = $scope.response.success;
            $scope.errors = $scope.response.errors;
        });
     var registerDetails = {email : $scope.registerData.email, username: $scope.registerData.username,
                                                      first_name: $scope.registerData.first_name, last_name: $scope.registerData.last_name,
                                                      password: $scope.registerData.password,
                                                      password_confirmation: $scope.registerData.password_confirm};

     userSession.login(registerDetails).success(function(response) {
	  		$scope.success = response.success;
	  	});
	  	$state.go('app.home');
  }
});
