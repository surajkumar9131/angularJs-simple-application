(function() {
  'use strict';

  angular
    .module('assignment')
    .controller('UserViewController', UserViewController);

  /** @ngInject */
  function UserViewController(HomeService) {
    var vm = this;

    vm.userDetails = HomeService.userDetails;
    vm.category = HomeService.category;
    vm.location = HomeService.location;
    vm.status = HomeService.status;

    
    

  }
})();
