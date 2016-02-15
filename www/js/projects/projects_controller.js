angular.module('starter.projects.controllers', [])

.controller('ProjectsCtrl', function($scope, $http, $stateParams, $state, $cookies, services, projects) {
  $scope.selectedCategory = $stateParams.selectedCategory;
  // $scope.selectedCategory.originalObject.id
  services.secondaryServices(1).success(function(response){ 
    $scope.secondaryServices = response.services;
  });
  $scope.contactDate = null;
  $scope.newProjectDetails = {};
  $scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    };
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val);
        $scope.datepickerObject.inputDate = val;
        $scope.newProjectDetails.date = val;
      }
    };

    $scope.timePickerObject = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 15,  //Optional
      format: 24,  //Optional
      titleLabel: '24-hour Format',  //Optional
      setLabel: 'Set',  //Optional
      closeLabel: 'Close',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback(val);
      }
    };

    var timePickerCallback = function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.timePickerObject.inputEpochTime = val;
        var selectedTime = new Date(val * 1000);
        $scope.newProjectDetails.time = val;
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }

    $scope.categories = [{category: 'Plumbing', ref: 'plumbing'}, {category: 'Carpenting', ref: 'plumbing'},
                        {category: 'Cleaning', ref: 'plumbing'}, {category: 'Flooring', ref: 'plumbing'},
                        {category: 'Moulding', ref: 'plumbing'}, {category: 'Drying', ref: 'plumbing'},
                        {category: 'Sizing', ref: 'plumbing'}];
    $scope.categorySelected = function(selected) {
        if (selected) {
          $state.transitionTo('projects.new', {selectedCategory: selected});
        } else {
          console.log('cleared');
        }
      };

      $scope.submitProject = function() {
        var projectDetails = {};
        if($cookies.get('auth') !== undefined && $cookies.get('auth').length) {
          projects.create().success(function(response) { 
            if(response.success) {
                $state.go('projects.show', {project_id: response.project_id})
            }
            else {

            }

          });
        } else {
          $state.go('app.customer_login', {source: 'projectNew'});
        }
        
      }

});
