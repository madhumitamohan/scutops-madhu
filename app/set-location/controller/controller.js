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

    SetLocation.$inject = ['$state', '$filter', '$http', 'config', '$location', '$scope', '$compile','$window','BookingService'];

    function SetLocation($state, $filter, $http, config, $location, $scope, $compile, $window, BookingService ) {

        var SetLocationVm = this;
        // Variable declarations
        SetLocationVm.bookingDetails={};

        // Function declarations
        SetLocationVm.BookNow = BookNow;
        SetLocationVm.checkValidity = checkValidity;
        activate();

        function activate() {
            setTimeout(function(){ 
                    initMap();
            }, 1000);
            inputInitialize();
        }

        function onCreateMap(center){
            var map = new google.maps.Map(document.getElementById("map"), {
          center: center,
          scrollwheel: true,
          zoom: 15,
          disableDefaultUI: true,
          draggable:true,
          minZoom:10,
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

        function updateInputField(map,marker,currentLocation){
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
            var add = SetLocationVm.bookingLocation;
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

    function getDateFromDate(date){
        return date.toISOString().substr(0,10);
    }

    function getHoursFromDate(date){
        return date.getHours();
    }

    function getMinutesFromDate(date){
        return date.getMinutes();
    }

    function getTimeAddingZero(time){
        return ((time<10)? ("0" + time) : time);
    }

    function getCurrentDateString(){
        var date = new Date();
        return date;
    }

    function getCurrentDate(){
        return getDateFromDate(getCurrentDateString());
    }

    function getCurrentHour(){
        return getHoursFromDate(getCurrentDateString());
    }

    function getCurrentMinute(){
        return getMinutesFromDate(getCurrentDateString());
    }

    function getValidTime(){
        var validHour = getCurrentHour() + 2;
        validHour = getTimeAddingZero(validHour);

        var currentMinute = getTimeAddingZero(getCurrentMinute());
        
        var validTime = validHour + ":" + currentMinute;
        return validTime;
    }

    function getTomorrowDate(){
        var tomorrowDate = getCurrentDateString();
        tomorrowDate.setDate(tomorrowDate.getDate()+1);
        tomorrowDate = getDateFromDate(tomorrowDate);
        return tomorrowDate;
    }

        function inputInitialize(){
            SetLocationVm.bookingDetails.bookingDate = getCurrentDate();
            SetLocationVm.bookingDetails.bookingTime = getValidTime();
            SetLocationVm.bookingDetails.bookingCount = 1;
        }

        function BookNow() {       
            if(checkValidity(SetLocationVm.bookingDetails.bookingDate,SetLocationVm.bookingDetails.bookingTime,SetLocationVm.bookingDetails.bookingCount))
                {
                    BookingService.setCount(SetLocationVm.bookingDetails.bookingCount);
                    //console.log(BookingService.Message);
                    console.log(BookingService.getCount());
                    //localStorage.setItem("count",(SetLocationVm.bookingDetails.bookingCount));
                    $state.go('confirm-booking');
                }

        }


        function checkValidity(bookingDate,bookingTime,bookingCount){
            if(dateValidity(bookingDate) && timeValidity(bookingDate,bookingTime) && countValidity(bookingCount))
                return true;
        }

        function timeValidity(bookingDate,bookingTime){
            var bookingTimeHour = bookingTime.substr(0,2);
            //bookinghour
            
            if(bookingTime < "07:00" || bookingTime > "18:00")//if booking is before 7 or after 6
               {
                alert("Booking is allowed only between 7am and 5pm");
                return false;
               }
            else if((getCurrentDate() == bookingDate) && (bookingTime<getValidTime()))//if booking time is less than 2 hours from now
            {
                alert("Booking is only allowed 2 hours from now");
                return false;
            }
            else if(bookingDate == getTomorrowDate() && getCurrentHour()>=18 && bookingTimeHour<9)
            {
                alert("Booking for the next day before 9am is taken only before 6pm");
                return false;
            }
            return true;

        }

        function dateValidity(bookingDate){
            if(isSunday(bookingDate))//if the booking is for sunday
            {
                var fridayDate = getCurrentDateString();
                var convertedBookingDate = new Date(bookingDate);
                fridayDate.setDate(convertedBookingDate.getDate() - 2);
                if(Date.parse(getCurrentDateString()) > Date.parse(fridayDate)){
                    alert("Booking for Sunday is taken till Friday only");
                    return false;
                } 
                //console.log(validDate);
            }

            if(Date.parse(bookingDate) < Date.parse(getCurrentDate())) //if the booking is before current date
                {
                    alert("Booking starts from today");
                    return false;
                }
                return true;
        }

        function countValidity(bookingCount){
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

        function isSunday(bookingDate){
            var convertedBookingDate = new Date(bookingDate);
            //console.log(d.getDay());
            //console.log(d);
            if(convertedBookingDate.getDay() == 0)
                return true;
            else
                return false;
        }

    }

}) ();