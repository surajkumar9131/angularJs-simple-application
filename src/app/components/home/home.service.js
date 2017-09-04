(function(){
  'use strict';
  angular
    .module('assignment')
    .factory('HomeService', HomeService)
    .factory('ToastrService', ToastrService);

  function HomeService($window, $q, $sessionStorage){
    var map;
    var places;
    var isLoaded = false;

    var callback;
    function registerCallBack(blah){
      callback = blah;
    }

    $window.addEventListener('load', function(){
      isLoaded = true;
    })
    function initMap(details) {
      var options = {
        center: new google.maps.LatLng(19.0821976, 72.7407546),
        zoom: 4,
        disableDefaultUI: true
      };
      map = new google.maps.Map(document.getElementById("map"), options);
      places = new google.maps.places.PlacesService(map);
      if(details != undefined){
        showMultipleMark(details);
      }
    }

    function callMap(details){
      var cb = function (){
        initMap(details);
        $window.removeEventListener('load', cb);
      }
      if(isLoaded) initMap(details);
      else $window.addEventListener('load', cb);
    }
    function search (str) {
        var d = $q.defer();
        places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }

    function saveData(map, event)
      {
        var zoomLevel = map.getZoom();
        var pos = (event.latLng).toString();
        pos = pos.replace('(','');
        pos = pos.replace(')','');
        pos = pos.replace(' ','');
        callback(pos);
    }

    var marker;
    function addMarker(res) {
      if (marker) marker.setMap(null);
      marker = new google.maps.Marker({
        map: map,
        position: res.geometry.location,
        animation: google.maps.Animation.DROP,
        draggable:true
      });
      google.maps.event.addListener(marker, 'dragend', function (event) {
			  saveData(map,event);
		  });
      map.setCenter(res.geometry.location);
    }

    function showMultipleMark(details){
       for (var i = 0, length = details.length; i < length; i++) {
          var data = details[i],
          latLng = new google.maps.LatLng(data.lat, data.lng); 
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: data.title
          });
        }
    }

     var category = [
      {id: 1, name: "Technology"},
      {id: 1, name: "Design"},
      {id: 1, name: "Marketing"},
      {id: 1, name: "Operations"}
    ];
    var status = [
      {id: 1, name: "Pending"},
      {id: 1, name: "Verified"}
    ];
    var location = [
      {id: 1, name: "mumbai"},
      {id: 1, name: "Delhi"},
      {id: 1, name: "Hyderabad"},
      {id: 1, name: "Pune"},
      {id: 1, name: "Bangalore"}
    ];

    var userDetails = [
      {
        name: "user 1",
        number: "9988776655",
        date: new Date().toLocaleDateString('en-GB'),
        category: "Technology",
        location: "mumbai",
        status: "Verified",
        lat: 19.0821976,
        lng: 72.7411
      },
      {
        name: "user 2",
        number: "96725836655",
        date: new Date().toLocaleDateString('en-GB'),
        category: "Marketing",
        location: "Delhi",
        status: "Verified",
        lat: 28.692115,
        lng: 76.8104654
      },
      {
        name: "user 3",
        number: "7653815134",
        date: new Date().toLocaleDateString('en-GB'),
        category: "Technology",
        location: "Bangalore",
        status: "Pending",
        lat: 12.953847,
        lng: 77.3500492
      },
      {
        name: "user 4",
        number: "7652423",
        date: new Date().toLocaleDateString('en-GB'),
        category: "Operations",
        location: "Hyderabad",
        status: "Pending",
        lat: 17.4122996,
        lng: 78.2676139
      },
      {
        name: "user 5",
        number: "8572476",
        date: new Date().toLocaleDateString('en-GB'),
        category: "Design",
        location: "Pune",
        status: "Pending",
        lat: 18.5245646,
        lng: 73.7225358
      }
    ];
    $sessionStorage.userDetails = userDetails;

    return {
        initMap: initMap,
        search: search,
        addMarker: addMarker,
        callMap: callMap,
        userDetails: userDetails,
        category: category,
        status: status,
        location: location,
        registerCallBack: registerCallBack
    }
  }


  
  function ToastrService(toastr) {

    return {
        success: function (message,title) {
          toastr["success"](message,title);
        },
        error: function (message,title) {
          toastr["error"](message,title);
        }
    };
  }



})(); 