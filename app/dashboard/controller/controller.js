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
        dashboardVm.helpCall = helpCall;


        activate();

        function changeServerIp() {
            var newPrefix = window.prompt("Enter server url", config.prefix);
            if (newPrefix) {
                config.prefix = newPrefix;
                config.recalculateUrls(newPrefix);
                console.log(newPrefix);
                console.log(config.prefix);
            }
        }

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

        function helpCall(){
             $state.go('help');
        }

    }

})();