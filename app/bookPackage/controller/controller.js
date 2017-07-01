(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * BookPackage Controller.
         */
    .controller('BookPackageController', BookPackage);

    BookPackage.$inject = ['$state', '$filter', '$http', 'config', '$location','BookPackageDataService','CommonService'];

    function BookPackage($state, $filter, $http, config, $location, BookPackageDataService, CommonService) {
        var bookPackageVm = this;
        bookPackageVm.packageDetails={};
        bookPackageVm.packageDetails.packageDays = {};
        bookPackageVm.packageDetails.bookingTime = "07:00";
        bookPackageVm.packageDetails.bookingCount = 1;
        bookPackageVm.packageDetails.promocode = "";
        bookPackageVm.packageDetails.bookingLocation = "HimasTech, Kaloor";
        bookPackageVm.packageDetails.no_of_days = 0;
        bookPackageVm.buttonDisableStatus = false;

        // Variable declarations
        var currentDate,currentHour,validTime,date;

        bookPackageVm.bookNow = bookNow;
        // Function declarations
        
       

        activate();
        function activate() {
            bookPackageVm.packageDetails.services = CommonService.getBookingDetails().services;
            bookPackageVm.packageDetails.instructions = CommonService.getBookingDetails().instructions;
            bookPackageVm.packageDetails.cust_id = CommonService.getUserDetails().id;
            setTimeout(function(){ 
                    initMap();
            }, 1000);
            
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
                    bookPackageVm.packageDetails.bookingLocation=(results[0].formatted_address);
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
                }else {
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

    function checkValidity(bookingDays,bookingTime,bookingCount){
            if(daysValidity(bookingDays) && timeValidity(bookingTime) && countValidity(bookingCount))
                return true;
        }

    function daysValidity(bookingDays){
        bookPackageVm.packageDetails.no_of_days=0;
        if(bookingDays.sunday)
            bookPackageVm.packageDetails.no_of_days+=1;
        if(bookingDays.monday)
            bookPackageVm.packageDetails.no_of_days+=1;
        if(bookingDays.tuesday)
            bookPackageVm.packageDetails.no_of_days+=1;
        if(bookingDays.wednesday)
            bookPackageVm.packageDetails.no_of_days+=1;
        if(bookingDays.thursday)
            bookPackageVm.packageDetails.no_of_days+=1;
        if(bookingDays.friday)
            bookPackageVm.packageDetails.no_of_days+=1;
        if(bookingDays.satday)
            bookPackageVm.packageDetails.no_of_days+=1;

        if(bookPackageVm.packageDetails.no_of_days>=2)
            return true;
        else
            {
                alert("Select atleast two days");
                bookPackageVm.buttonDisableStatus = false;
            }
    }

    function timeValidity(bookingTime){
            var bookingTimeHour = bookingTime.substr(0,2);
            //bookinghour
            
            if(bookingTime < "07:00" || bookingTime > "18:00")//if booking is before 7 or after 6
               {
                alert("Booking is allowed only between 7am and 5pm");
                bookPackageVm.buttonDisableStatus = false;
                return false;
               }
            return true;

        }

    function countValidity(bookingCount){
            if(bookingCount<1)
                {
                    alert("Book atleast one professional");
                    bookPackageVm.buttonDisableStatus = false;
                    return false;
                }
            else if(bookingCount>5)
                {
                    alert("Book less than or equal to five professionals");
                    bookPackageVm.buttonDisableStatus = false;
                    return false;
                }
            return true;
            
        }

    function bookNow(){
        bookPackageVm.buttonDisableStatus = true;
        console.log(bookPackageVm.packageDetails);
        console.log(bookPackageVm.packageDetails.packageDays);

        var packageDetails = JSON.stringify(bookPackageVm.packageDetails);
        

        if(checkValidity(bookPackageVm.packageDetails.packageDays,bookPackageVm.packageDetails.bookingTime,bookPackageVm.packageDetails.bookingCount)){
           
            BookPackageDataService.applyPackage(packageDetails).then(function(response){
                    if(response.result)
                        $state.go("liveUpdate");
                    else
                        {
                            alert(response.description);
                            bookPackageVm.buttonDisableStatus = false;
                        }
                });
        }
    }

    
}    



}) ();