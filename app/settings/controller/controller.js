(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('SettingsController', Settings);

    Settings.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function Settings($state, $filter, $http, config, $location) {
        var settingsVm = this;

  
        activate();

        function activate(){

        }

    }

})();