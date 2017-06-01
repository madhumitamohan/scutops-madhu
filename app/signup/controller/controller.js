(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('SignUpController', SignUp);

    SignUp.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function SignUp($state, $filter, $http, config, $location) {
        var signUpVm = this;
        // Variable declarations
        signUpVm.newUser = {};

        // Function declarations
        signUpVm.signUp = signUp;


        activate();

        function activate() {
            // To initialize anything before the project starts
        }

        function signUp() {
            $state.go('dashboard'); //change state go to app.module
        }

    }

})();