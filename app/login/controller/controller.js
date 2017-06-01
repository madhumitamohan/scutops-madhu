(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('LoginController', Login);

    Login.$inject = ['$state', '$filter', '$http', 'config', '$location'];

    function Login($state, $filter, $http, config, $location) {
        var loginVm = this;
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = ""; //mannu

        // Function declarations
        loginVm.authenticateUser = authenticateUser;
        loginVm.SignUp = SignUp;
        loginVm.ForgotPassword = ForgotPassword;
        loginVm.displayPassword = displayPassword;

        activate();

        function displayPassword(){
            document.getElementById("password").type="text";
            setTimeout(function(){
                document.getElementById("password").type="password";
            },500);
            
        }

        function activate() {
            
            // To initialize anything before the project starts
        }

        function authenticateUser() {
            if(loginVm.currentUser.email== "Scutops")
            {
                if(loginVm.currentUser.password == "123")
                    $state.go('dashboard');
                else
                    alert("Please enter the right password");
            }
            else
                alert("This username has not been signed up. Please signup");
        }

        function SignUp() {
        $state.go('signup');
             //change state go to app.module
        }


        function ForgotPassword() {
            /*$state.go('forgotPassword');*/
            $location.path('/forgot');
        }
    }

})();