angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/customer_login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin1 = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('UserMgmtCtrl', function($scope, $http) {
  $scope.loginData = {};
  $scope.doLogin = function() {
    console.log($scope.loginData);
     $http.post('http://localhost:3000/users/login', {email : $scope.loginData.username, password: $scope.loginData.password})
     .then(function (res) {
            $scope.response = res.data;
            console.log($scope.response);
            $scope.success = $scope.response.success;
        });
  }
  $scope.registerData = {}
  $scope.doRegister = function() {
    console.log($scope.registerData);
     $http.post('http://localhost:3000/users', {email : $scope.loginData.email, username: $scope.loginData.username, 
                                                      first_name: $scope.loginData.first_name, last_name: $scope.loginData.last_name,
                                                      password: $scope.loginData.password, 
                                                      password_confirm: $scope.loginData.password_confirm})
     .then(function (res) {
            $scope.response = res.data;
            console.log($scope.response);
            $scope.success = $scope.response.success;
            $scope.errors = $scope.response.errors;
        });
  }

})
;
