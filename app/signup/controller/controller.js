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
        var loginVm = this;
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = ""; //mannu

        // Function declarations
        loginVm.signUp = signUp;
        loginVm.ForgotPassword = ForgotPassword;
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

        function signUp() {
            $state.go('dashboard'); //change state go to app.module
        }


        function ForgotPassword() {
            /*$state.go('forgotPassword');*/
            $location.path('/forgot');
        }
    }

})();