(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('AboutController', About);

    About.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function About($state, $filter, $http, config, $location) {
        var aboutVm = this;

  
        activate();

        function activate(){

        }
    }

})();