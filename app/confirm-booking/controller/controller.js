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

    ConfirmBooking.$inject = ['$state', '$filter', '$http', 'config', '$location','CommonService','BookingDataService'];

    function ConfirmBooking($state, $filter, $http, config, $location,  CommonService, BookingDataService) {
        var BookingVm = this;
        BookingVm.finalBalance = 0;
        BookingVm.currentUserDetails = {};
        BookingVm.successMessagePopup = false;
        BookingVm.initialBalance = 0;
        BookingVm.paymentDetails = {};
        // Variable declarations
        // Function declarations
        BookingVm.decreaseOpacity = decreaseOpacity;
        BookingVm.increaseOpacity = increaseOpacity;
        BookingVm.bookingPayment = bookingPayment;
        BookingVm.goToLive = goToLive;

        activate();

        function activate() {
            BookingVm.bookingAmount = (CommonService.getBookingDetails().bookingCount * 157);
            BookingVm.currentUserDetails = CommonService.getUserDetails(); 
            BookingVm.initialBalance = CommonService.getUserDetails().scutops_money;

            BookingVm.paymentDetails.order_id = CommonService.getBookingDetails().order_id;
            BookingVm.paymentDetails.cust_id = CommonService.getUserDetails().id;
            // To initialize anything before the project starts
        }


        function decreaseOpacity(){
            document.getElementsByClassName("main-content2")[0].style.opacity="0.5";
        }

        function increaseOpacity(){
            document.getElementsByClassName("main-content2")[0].style.opacity="1";
        }

        function bookingPayment(){

            var balance = BookingVm.initialBalance - BookingVm.bookingAmount;

            if(balance >= 0){
                BookingVm.currentUserDetails.scutops_money = balance; //updating the user details

                BookingVm.paymentDetails.newBalance = balance;
            
                var paymentDetails = JSON.stringify(BookingVm.paymentDetails);// preparing for passing to the php file
                //console.log(paymentDetails);
                BookingDataService.makePayment(paymentDetails).then(function(response){
                    CommonService.setUserDetails(BookingVm.currentUserDetails);//updating user details in common service
                    BookingVm.finalBalance = balance;
                    decreaseOpacity();
                    BookingVm.successMessagePopup = true;
                });
            }
            else
                alert("Insufficient balance");
        }

        function goToLive(){
            $state.go("liveUpdate");
        }

    }

})();