(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('DisplayOptionsController', DisplayOptions);

    DisplayOptions.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function DisplayOptions($state, $filter, $http, config, $location) {
        var loginVm = this;
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = ""; //mannu

        // Function declarations
        loginVm.bookService = bookService;
      
        
        loginVm.changeServerIp = changeServerIp;

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

    }

})();