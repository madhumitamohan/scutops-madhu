(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('LiveUpdateController', LiveUpdate);

    LiveUpdate.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function LiveUpdate($state, $filter, $http, config, $location) {
        var loginVm = this;
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = ""; //mannu

        // Function declarations

        activate();

        function activate() {
            // To initialize anything before the project starts
        }


    }

})();