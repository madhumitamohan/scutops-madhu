(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('PhoneNumberController', PhoneNumber);

    PhoneNumber.$inject = ['$state', '$filter', '$http', 'config', '$location','PhoneNumberDataService'];

    function PhoneNumber($state, $filter, $http, config, $location,PhoneNumberDataService) {
        //variable declarations
        var phoneNumberVm = this;

        //function declarations
        phoneNumberVm.addPhoneNumber = addPhoneNumber;
        activate();

        function activate(){
            //before project starts
        }

        function addPhoneNumber(){
            var phoneNumber = (phoneNumberVm.phoneNumber);
            PhoneNumberDataService.addPhoneNumber(phoneNumber).then(function(response){
                $state.go("dashboard");
            });
        }

        }

})();