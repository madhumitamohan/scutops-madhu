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

    Dashboard.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function Dashboard($state, $filter, $http, config, $location) {
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

        function displayMenu(){           
            var opacity = document.getElementById("content-portion").style.opacity;
            if(opacity == 0.5)
                document.getElementById("content-portion").style.opacity = 1;
            else
                document.getElementById("content-portion").style.opacity = 0.5;
        }

    }

})();