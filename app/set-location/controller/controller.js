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
        SetLocationVm.checkValidity = checkValidity;
        activate();

        function activate() {
            setTimeout(function(){ 
                    initMap();
            }, 1000);
            inputInitialize();
        }


       function positionValidity(map,latLngBounds){
            map.addListener('bounds_changed',function(){
                var c = map.getCenter();
                var x = c.lng();
                var y = c.lat();
                var maxX = latLngBounds.getNorthEast().lng();
                var maxY = latLngBounds.getNorthEast().lat();
                var minX = latLngBounds.getSouthWest().lng();
                var minY = latLngBounds.getSouthWest().lat();
                if(x>maxX)
                    x = maxX;
                if(y>maxY)
                    y = maxY;
                if(x<minX)
                    x = minX;
                if(y<minY)
                    y=minY;
                map.setCenter(new google.maps.LatLng(y,x));

        });
        }



        function onCreateMap(center){
            var map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          scrollwheel: true,
          zoom: 15,
          disableDefaultUI: true,
          draggable:true,
          minZoom:10,
          //heading:100
          });
            return map;
        }

        function onCreateMarker(map,center){
            var marker = new google.maps.Marker({
            map:map,
            position: center,
            animation: google.maps.Animation.DROP,
            icon:'img/marker2.gif'
        });

            return marker;
        }

        function Animate(marker){
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
                marker.setAnimation(null);
            },500);
        }

        function placeMarker(marker,location) {
            Animate(marker);
            marker.setPosition(location);
        }

        function updateInputField(map,marker,currentLocation){
            console.log("hello");
            var geocoder = new google.maps.Geocoder;
            google.maps.event.addListener(map, 'click', function(event) {         
            placeMarker(marker,event.latLng);
            geocoder.geocode({location:event.latLng},function(results,status){
            currentLocation.value=(results[0].formatted_address);
            console.log(results[0].formatted_address);
            })
        });

        }

        function updateMarker(map,marker,currentLocation){
            currentLocation.addEventListener('input',function(){
            var add = currentLocation.value;
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({address:add},function(results,status){
                if(status == "OK")
                    {
                     map.setCenter(results[0].geometry.location);
                     placeMarker(marker,results[0].geometry.location);
                     console.log(status);
                    }
                else{
                    alert("Geolocation was not set due to the following reason : " + status);
                }
            });
        })
        }

        function autocompleteSuggestions(map,marker,currentLocation){
        var autocomplete = new google.maps.places.Autocomplete(currentLocation);
        autocomplete.bindTo('bounds', map);
        autocomplete.addListener('place_changed', function() {
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

        });
        }

      function initMap() {        
        var southwest= new google.maps.LatLng({lat:9.88501, lng: 76.0609}); 
        var northeast = new google.maps.LatLng({lat:10.32704, lng: 76.9983});
        var latLngBounds = new google.maps.LatLngBounds(southwest,northeast);   

        var center = new google.maps.LatLng(9.993014,76.2942063);


        var map = onCreateMap(center);
        var marker = onCreateMarker(map,center);
        var currentLocation = document.getElementById("location-input");
        //console.log(map.getHeading());
        //FOR PLACING THE MARKER AT THE CENTER
        updateInputField(map,marker,currentLocation);
        updateMarker(map,marker,currentLocation);
        autocompleteSuggestions(map,marker,currentLocation,latLngBounds);
        positionValidity(map,latLngBounds);

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
                {
                    localStorage.setItem("count",(bookingCount));
                    $state.go('confirm-booking');
                }

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