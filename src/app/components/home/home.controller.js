(function() {
  'use strict';

  angular
    .module('assignment')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($timeout, HomeService, $state, $sessionStorage) {
    var vm = this;

    vm.userDetails = $sessionStorage.userDetails;
    HomeService.callMap(vm.userDetails);
    vm.category = HomeService.category;
    vm.location = HomeService.location;
    vm.status = HomeService.status;

    vm.applyFilter = function(filter1, filter2){
     HomeService.callMap(
       angular.copy(vm.userDetails)
          .filter(function(userDetail){
            if(filter1){
              return userDetail.status === (filter1 && filter1.name);
            }else{
              return true;
            }
          }).filter(function(userDetail){
            if(filter2){
            return userDetail.category === (filter2 && filter2.name);
            }else {
              return true;
            }
          })
      );
    }

    vm.removeFilters = function(){
      $state.go($state.current, {}, {reload: true});
    }

  }
})();
