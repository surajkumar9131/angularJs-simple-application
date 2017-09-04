(function() {
  'use strict';

  angular
    .module('assignment')
    .controller('UserFormController', UserFormController);

  /** @ngInject */
  function UserFormController(UserService, HomeService, ToastrService, $sessionStorage) {
    var vm = this;
    
    HomeService.callMap();
    vm.userDetails = $sessionStorage.userDetails;
    // vm.userDetails = UserService.userDetails;
   
    vm.newUser = {};
    vm.addNewUser = function(){
      vm.newUser.date = new Date().toLocaleDateString('en-GB'),
      vm.userDetails.push(vm.newUser);
      ToastrService.success('New User added Successfully');
      vm.newUser = {};
    }
  
    vm.search = function() {
      vm.apiError = false;
      HomeService.search(vm.newUser.location)
      .then(
        function(res) {
            HomeService.addMarker(res);
            vm.newUser.lat = res.geometry.location.lat();
            vm.newUser.lng = res.geometry.location.lng();
            vm.newUser.location = res.formatted_address;
        },
        function(status) {
            vm.apiError = true;
            vm.apiStatus = status;
        }
      );
    }

     function GetAddress(lat, lng) {
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  vm.newUser.location = results[1].formatted_address;
                  vm.search();
                }
            }
        });
    }

    vm.watchLatlong = function(pos){
      var array = pos.split(',');
      GetAddress(array[0], array[1]);
    }
    
    HomeService.registerCallBack(vm.watchLatlong);
    
    

  }
})();
