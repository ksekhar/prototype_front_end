angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $state, userSession) {
  $rootScope.username = window.localStorage.getItem('userDetails');
  $scope.logout = function() {
    userSession.logout().success(function(response) {
    });
    $rootScope.username = null;
    // $rootScope.$apply(function(){$rootScope.username = null;});
    $state.go('app.home', {}, { reload: true });
  }
})

.controller('HomeCtrl', function($scope, $http, $state, services) {
  services.primaryServices().success(function(response){ 
    $scope.primaryServices = response.services;
  });
  services.allServices().success(function(response){  
    $scope.allServices = response.services;
  });
  $scope.categories = services.primaryServices();
  $scope.categorySelected = function(selected) {
      if (selected) {
        $state.transitionTo('projects.new', {selectedCategory: selected});
      } else {
        console.log('cleared');
      }
    };
})
;
