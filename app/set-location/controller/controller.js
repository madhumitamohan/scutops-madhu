(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Set location Controller.
         */
        .controller('SetLocationController', SetLocation);

    SetLocation.$inject = ['$state', '$filter', '$http', 'config', '$location', '$scope', '$compile','$window'];

    function SetLocation($state, $filter, $http, config, $location, $scope, $compile, $window ) {
        var loginVm = this;
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = ""; //mannu

        // Function declarations
        loginVm.BookNow = BookNow;

        activate();





      function initMap() {
        // Create a map object and specify the DOM element for display.
        var center = new google.maps.LatLng(9.994015,76.293758);

        //REMOVING DEFAULT CONTROLS OF THE MAP
        //var mapOptions {disableDefaultUI: true}


        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 9.994015, lng: 76.293758},
          scrollwheel: true,
          zoom: 8,
          disableDefaultUI: true,
          draggable:true     });

        //FOR PLACING THE MARKER AT THE CENTER
        var marker = new google.maps.Marker({
            map:map,
            position: center,
            //draggable:true,
            animation: google.maps.Animation.DROP,
            icon:'img/marker2.gif'
        });
       
       var geocoder = new google.maps.Geocoder;

       //ALTERNATE METHOD FOR LINKING THE MARKER TO THE MAP
         // marker.setMap(map);
        //ON CLICKING THE MARKER IT ZOOMS IN
        google.maps.event.addListener(marker,'click',function() {
        map.setZoom(15);
        map.setCenter(marker.getPosition());
       });

        //FOR DISPLAYING THE INFO WINDOW
        /*var infowindow = new google.maps.InfoWindow({
         content:"Hello World!"
        });

        infowindow.open(map,marker);
        */

        //MAKING THE MAP MOVABLE
        google.maps.event.addListener(map, 'click', function(event) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
                marker.setAnimation(null);
            },500);
            placeMarker(event.latLng);

            //finding the formatted address of the position
            geocoder.geocode({location:event.latLng},function(results,status){

            document.getElementById("location-input").value=(results[0].formatted_address);
            console.log(results[0].formatted_address);
            })
        });

        function placeMarker(location) {
            //setting the marker at the right position
            marker.setPosition(location);
            
           // map.setCenter(location);

        }
      }

       function doMapInitializations() {
                setTimeout(function(){ 
                    initMap();
            }, 1000);
            google.maps.event.addDomListener(window, 'load', initialize);

         /*   $scope.centerOnMe = function() {
                if (!$scope.map) {
                    return;
                }


                navigator.geolocation.getCurrentPosition(function(pos) {
                    $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                    $scope.loading.hide();
                }, function(error) {
                    alert('Unable to get location: ' + error.message);
                });
            };*/
        }

        function activate() {
            doMapInitializations();
        }


        function BookNow() {
            $state.go('login');
        }
    }

})();