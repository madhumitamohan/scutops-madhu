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
        var map;
        var marker;
        loginVm.BookNow = BookNow;
        loginVm.Search = Search;
        loginVm.doMapInitializations = doMapInitializations;
        activate();


        function Search(){
            console.log("Hello");
            //document.getElementById('location-input').value="4th Cross Road,Thrikkakkara,Kerala";
            var add = document.getElementById('location-input').value;

            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({address:add},function(results,status){
                map.setCenter(results[0].geometry.location);
                placeMarker(results[0].geometry.location);
                console.log(status);
            });

        }

      function initMap() {        
        var center = new google.maps.LatLng(9.994015,76.293758);
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 9.994015, lng: 76.293758},
          scrollwheel: true,
          zoom: 15,
          disableDefaultUI: true,
          draggable:true     });

        //FOR PLACING THE MARKER AT THE CENTER
        marker = new google.maps.Marker({
            map:map,
            position: center,
            //draggable:true,
            animation: google.maps.Animation.DROP,
            icon:'img/marker2.gif'
        });

        //MAKING THE MAP MOVABLE
        var geocoder = new google.maps.Geocoder;
        google.maps.event.addListener(map, 'click', function(event) {
            
            placeMarker(event.latLng);

            //finding the formatted address of the position
            geocoder.geocode({location:event.latLng},function(results,status){

            document.getElementById("location-input").value=(results[0].formatted_address);
            console.log(results[0].formatted_address);
            })
        });
    }

        function Animate(){
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
                marker.setAnimation(null);
            },500);
        }

        function placeMarker(location) {
            Animate();
            marker.setPosition(location);
        }
      

      function doMapInitializations() {
                setTimeout(function(){ 
                    initMap();
            }, 1000);
            //google.maps.event.addDomListener(window, 'load', initialize);
        }

        function activate() {
            doMapInitializations();

        }


        function BookNow() {
            $state.go('confirm-booking');
        }

        
    }

}) ();