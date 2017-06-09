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
        var BookingVm = this;
        // Variable declarations
        // Function declarations
        BookingVm.decreaseOpacity = decreaseOpacity;
        BookingVm.increaseOpacity = increaseOpacity;

        activate();

        function activate() {
            console.log(BookingService.getCount() * 157);
            BookingVm.bookingAmount = (BookingService.getCount() * 157);
            // To initialize anything before the project starts
        }

        function decreaseOpacity(){
            document.getElementsByClassName("main-content2")[0].style.opacity="0.5";
        }

        function increaseOpacity(){
            document.getElementsByClassName("main-content2")[0].style.opacity="1";
        }

    }

})();