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

    Dashboard.$inject = ['$state', '$filter', '$http', 'config', '$location', 'DashboardDataService'];

    function Dashboard($state, $filter, $http, config, $location, DashboardDataService) {
        var dashboardVm = this;
        // Variable declarations
        dashboardVm.currentUser = {};
        dashboardVm.currentUser.email = ""; //manu@gmail.com
        dashboardVm.currentUser.password = ""; //mannu

        // Function declarations
        dashboardVm.feedbackCall = feedbackCall;
        dashboardVm.aboutCall = aboutCall;
        dashboardVm.settingsCall = settingsCall;
        dashboardVm.bookService = bookService;
        dashboardVm.displayMenu = displayMenu;
        dashboardVm.logOut = logOut;


        activate();

        function activate() {
            // To initialize anything before the project starts
        }

        function bookService() {
            $state.go('set-location');
        }

        function feedbackCall(){
             $state.go('feedback');
        }

        function settingsCall(){
             $state.go('settings');
        }

        function aboutCall(){
             $state.go('about');
        }

        function logOut(){
            DashboardDataService.logoutUser().then(function(response){
                console.log("logged out");
            });
             $state.go('login');
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