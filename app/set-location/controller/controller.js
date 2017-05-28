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

        var SetLocationVm = this;
        // Variable declarations
        SetLocationVm.currentUser = {};
        SetLocationVm.currentUser.email = ""; //manu@gmail.com
        SetLocationVm.currentUser.password = ""; //mannu
        var bookingDate,bookingTime,bookingCount,bookingPromocode,valid=true;
        var currentDate,currentTime,currentHour,currentMinute,currentSecond,validDate,validHour,validTime,date;

        // Function declarations
        var map;
        var marker;
        SetLocationVm.BookNow = BookNow;
        SetLocationVm.Search = Search;
        SetLocationVm.doMapInitializations = doMapInitializations;
        SetLocationVm.checkValidity = checkValidity;
        activate();


        function Search(){
            console.log("Hello");
            //document.getElementById('location-input').value="4th Cross Road,Thrikkakkara,Kerala";
            var add = document.getElementById('location-input').value;

            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({address:add},function(results,status){
                if(status == "OK")
                    {
                     map.setCenter(results[0].geometry.location);
                     placeMarker(results[0].geometry.location);
                     console.log(status);
                    }
                else{
                    alert("Geolocation was not set due to the following reason : " + status);
                }
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
            animation: google.maps.Animation.DROP,
            icon:'img/marker2.gif'
        });

        //MAKING THE MAP MOVABLE-REVERSE GEOLOCATION
        var geocoder = new google.maps.Geocoder;
        google.maps.event.addListener(map, 'click', function(event) {         
            placeMarker(event.latLng);
            //finding the formatted address of the position
            geocoder.geocode({location:event.latLng},function(results,status){
            document.getElementById("location-input").value=(results[0].formatted_address);
            console.log(results[0].formatted_address);
            })
        });

        //GEOLOCATION
        document.getElementById("location-input").addEventListener('input',function(){
            Search();
        })
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
            inputInitialize();

        }


        function inputInitialize(){
            date = new Date();
            currentDate = date.toISOString().substr(0,10);
            currentHour = date.getHours();
            currentMinute = date.getMinutes();
            currentSecond = date.getSeconds();
            validHour = date.getHours() + 2;

            currentHour = (currentHour<10)? ("0" + currentHour) : currentHour;
            currentMinute = (currentMinute<10)? ("0" + currentMinute) : currentMinute;
            currentSecond = (currentSecond<10)? ("0" + currentSecond) : currentSecond;          
            validHour = (validHour<10)? ("0" + validHour) : validHour;
            validTime = validHour + ":" + currentMinute;

            document.getElementById("date").value = currentDate;
            document.getElementById("time").value = validTime;
            document.getElementById("count").value = 1;
        }

        function BookNow() {
            if(checkValidity())
                $state.go('confirm-booking');

        }


        function checkValidity(){
            bookingTime = document.getElementById("time").value;
            bookingDate= document.getElementById("date").value;
            bookingCount = document.getElementById("count").value;
            validDate = new Date();
            validDate.setDate(date.getDate()+1);
            validDate = validDate.toISOString().substr(0,10);
            if(dateValidity() && timeValidity() && countValidity())
                return true;
        }

        function timeValidity(){
            
           /* console.log(date.getTime());
            console.log(Date.parse('01/01/2011 10:20:45') > Date.parse('01/01/2011 5:10:10'));*/
            var bookingTimeHour = bookingTime.substr(0,2);
            //bookinghour
                      
            
            
            if(bookingTime < "07:00" || bookingTime > "18:00")
               {
                alert("Booking is allowed only between 7am and 5pm");
                return false;
               }
            else if((currentDate == bookingDate) && (bookingTime<validTime))
            {
                alert("Booking is only allowed 2 hours from now");
                return false;
            }
            else if(bookingDate == validDate && currentHour>=18 && bookingTimeHour<9 )
            {
                alert("Not Possible");
                return false;
            }
            return true;

        }

        function dateValidity(){
            if(Date.parse(bookingDate) < Date.parse(currentDate))
                {
                    alert("Booking starts from today");
                    return false;
                }
                return true;
        }

        function countValidity(){
            console.log(bookingCount);
            if(bookingCount<1)
                {
                    alert("Book atleast one professional");
                    return false;
                }
            else if(bookingCount>5)
                {
                    alert("Book less than or equal to five professionals");
                    return false;
                }
            return true;
            
        }
    }

}) ();