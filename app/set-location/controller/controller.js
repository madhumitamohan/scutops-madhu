(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('set-locationController', Login);

    Login.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function Login($state, $filter, $http, config, $location) {
        var loginVm = this;
        // Variable declarations
        /*loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = ""; //mannu

        // Function declarations
        loginVm.authinticateUser = authinticateUser;
        loginVm.SignUp = SignUp;
        loginVm.ForgotPassword = ForgotPassword;
        loginVm.changeServerIp = changeServerIp;
*/
       activate();

       /* function myMap() {
        var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}*/

 function initialize() {
            console.log("initialize map.........................");
            var myLatlng = new google.maps.LatLng(9.9971, 76.3028);

            var mapOptions = {
                center: myLatlng,
                zoom: 18
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-cli

            
        }

        function doMapInitializations() {
                setTimeout(function(){ 
                    initialize();
            }, 1000);
            /*google.maps.event.addDomListener(window, 'load', initialize);*/

            
            
        }


        function activate() {
            doMapInitializations();
                /*setTimeout(function(){ 
                    console.log("Loading......"); 
                    
            }, 1000);*/
            // To initialize anything before the project starts
        }
    }

})();