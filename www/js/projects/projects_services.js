angular.module('starter.projects.services', [])
.factory('services', function($http) {
	return {
		primaryServices: function(){
			return $http.get("http://localhost:3000/services/primary_services").success(function(response){
				return response.services;
			});
		},
		secondaryServices: function(serviceId){
			return $http.get("http://localhost:3000/services/secondary_services", {params: {service_id: serviceId}}).success(function(response){
				return response.services;
			});
		},
		allServices: function(){
			return $http.get("http://localhost:3000/services").success(function(response){
				return response.services;
			});
		}
	}
})
.factory('projects', function($http) {
	return {
		create: function(projectDetails){
			return $http.post("http://localhost:3000/projects", projectDetails).success(function(response){
				return response.success;
			});
		}
	}
});