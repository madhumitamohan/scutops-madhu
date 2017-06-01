(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('ConfirmBookingController', ConfirmBooking);

    ConfirmBooking.$inject = ['$state', '$filter', '$http', 'config', '$location','BookingService'];

    function ConfirmBooking($state, $filter, $http, config, $location,  BookingService) {
        var loginVm = this;
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = ""; //mannu
        // Function declarations
        loginVm.amount = amount;

        activate();

        function activate() {
            console.log(BookingService.getCount() * 157);
            loginVm.bookingAmount = (BookingService.getCount() * 157);// To initialize anything before the project starts
        }

        function amount(){
           return BookingService.getCount() * 157;
        }


    }

})();