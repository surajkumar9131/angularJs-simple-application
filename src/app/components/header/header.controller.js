(function() {
  'use strict';

  angular
    .module('assignment')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($state) {
    var vm = this;
    
    vm.showMenu = false;
    vm.showIcon = function(){
      vm.showMenu = !vm.showMenu
    }

    vm.goToHomePage = function(){
      $state.go("home", {}, {reload: true});
    }

  }
})();
