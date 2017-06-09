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

    SignUp.$inject = ['$state', '$filter', '$http', 'config', '$location','SignUpDataService'];

    function SignUp($state, $filter, $http, config, $location,SignUpDataService) {
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
            //console.log(signUpVm.newUser);
            var newUserJSON = JSON.stringify(signUpVm.newUser);
            //console.log(newUserJSON);
            SignUpDataService.createAccount(newUserJSON).then(function(response){
                //console.log(response.description);
                if(response.result)
                    $state.go('dashboard');
                else
                    alert(response.description);
            });
             //change state go to app.module
        }

    }

})();