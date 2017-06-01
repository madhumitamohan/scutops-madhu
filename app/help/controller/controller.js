(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('HelpController', Help);

    Help.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function Help($state, $filter, $http, config, $location) {
        var helpVm = this;

  
        activate();

        function activate(){

        }
    }

})();