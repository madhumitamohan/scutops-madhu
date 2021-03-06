(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('DashboardController', Dashboard);

    Dashboard.$inject = ['$state', '$filter', '$http', 'config', '$location', 'DashboardDataService','CommonService'];

    function Dashboard($state, $filter, $http, config, $location, DashboardDataService,CommonService) {
        var dashboardVm = this;
        // Variable declarations
        dashboardVm.dashboardDetails={};
        dashboardVm.dashboardDetails.services={};
        dashboardVm.dashboardDetails.services.cooking={};
        dashboardVm.dashboardDetails.services.cleaning={};
        dashboardVm.dashboardDetails.services.spCooking={};
        dashboardVm.dashboardDetails.services.spCleaning={};
        dashboardVm.dashboardDetails.instructions = "";


        // Function declarations
        dashboardVm.bookNow = bookNow;
        dashboardVm.bookPackage = bookPackage;
        
        activate();

        function activate() {
            // To initialize anything before the project starts
           /* DashboardDataService.activateUser().then(function(response){             
                dashboardVm.currentUser.username = response.data;
                console.log(dashboardVm.currentUser.username);
            });*/
        }

        function bookPackage(){
            if(bookService())
                $state.go('bookPackage');
            else
                alert("Select atleast one option");
        }

        function bookNow(){
            if(bookService())
                $state.go('set-location');
            else
                alert("Select atleast one option");
        }

        function bookService() {
            if(dashboardVm.dashboardDetails.services.cooking.breakfast || dashboardVm.dashboardDetails.services.cooking.lunch || dashboardVm.dashboardDetails.services.cooking.snacks|| dashboardVm.dashboardDetails.services.cooking.dinner ||dashboardVm.dashboardDetails.services.cleaning.bedRoom || dashboardVm.dashboardDetails.services.cleaning.livingRoom|| dashboardVm.dashboardDetails.services.cleaning.diningRoom|| dashboardVm.dashboardDetails.services.cleaning.washRoom)
                {
                    CommonService.setBookingDetails(dashboardVm.dashboardDetails);
                    return true;
                }
            else if(dashboardVm.dashboardDetails.services.spCooking.breakfast || dashboardVm.dashboardDetails.services.spCooking.lunch || dashboardVm.dashboardDetails.services.spCooking.snacks|| dashboardVm.dashboardDetails.services.spCooking.dinner)
                {
                    CommonService.setBookingDetails(dashboardVm.dashboardDetails);
                    return true;
                }
            else if(dashboardVm.dashboardDetails.services.spCleaning.bedRoom || dashboardVm.dashboardDetails.services.spCleaning.livingRoom|| dashboardVm.dashboardDetails.services.spCleaning.diningRoom|| dashboardVm.dashboardDetails.services.spCleaning.washRoom)
                {
                    CommonService.setBookingDetails(dashboardVm.dashboardDetails);
                    return true;
                    }
            else
                return false;
            /*console.log(dashboardVm.dashboardDetails.services.cooking);
            console.log(dashboardVm.dashboardDetails.services.cleaning);
            console.log(dashboardVm.dashboardDetails.services.spCooking);
            console.log(dashboardVm.dashboardDetails.services.spCleaning);
            console.log(dashboardVm.dashboardDetails);*/
            
        }

        function displayMenu(){           
            var opacity = document.getElementsByClassName("content")[0].style.opacity;
            if(opacity == 0.5)
                document.getElementsByClassName("content")[0].style.opacity = 1;
            else
                document.getElementsByClassName("content")[0].style.opacity = 0.5;
        }

    }

})();