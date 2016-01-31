angular.module('starter.authentication', [])

.controller('LoginCtrl', function($scope, $location, UserSession, $ionicPopup, $rootScope) {
  $scope.doLogin = function() {
    var result = UserSession.submit(loginData);
    console.log(result);
  }
});
