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

    PhoneNumber.$inject = ['$state', '$filter', '$http', 'config', '$location','PhoneNumberDataService','CommonService'];

    function PhoneNumber($state, $filter, $http, config, $location,PhoneNumberDataService,CommonService) {
        //variable declarations
        var phoneNumberVm = this;

        //function declarations
        phoneNumberVm.addPhoneNumber = addPhoneNumber;
        activate();

        function activate(){
            //before project starts
        }

        function addPhoneNumber(){
            var newUser = CommonService.getUserDetails();
            newUser.phone_number = (phoneNumberVm.phoneNumber);
            var newUserJSON = JSON.stringify(newUser);
            console.log(newUserJSON);
            PhoneNumberDataService.createAccount(newUserJSON).then(function(response){
                if(response.result){
                        CommonService.setCookie("id",response.payload.id);
                        CommonService.setUserDetails(response.payload);
                        console.log(response.payload);
                        $state.go('sidebar.dashboard');
                    }
                else
                    alert(response.description);
            });
        }

        }

})();