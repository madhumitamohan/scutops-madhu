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
        signUpVm.newUser.email = "";
        signUpVm.newUser.type = 0;
        signUpVm.newUser.phone_number = "";
        signUpVm.newUser.password = "";
        signUpVm.newUser.landmark = "";
        signUpVm.newUser.address = "";
        signUpVm.newUser.username = "";
        // Function declarations
        signUpVm.scutopsSignUp = scutopsSignUp;
        signUpVm.googleSignUp = googleSignUp;


        activate();

        function activate() {
            // To initialize anything before the project starts
        }

        function scutopsSignUp(){
            signUpVm.newUser.type=1;
            signUp();
        }

        function signUp() {
            //console.log(signUpVm.newUser);
            var newUserJSON = JSON.stringify(signUpVm.newUser);
            //console.log(newUserJSON);
            SignUpDataService.createAccount(newUserJSON).then(function(response){
                //console.log(response.description);
                if(response.result){
                  //if(signUpVm.newUser.type == 1)
                    $state.go('dashboard');
                  //else if(signUpVm.newUser.type == 3)
                    //$state.go('phoneNumber');
                }
                else
                    alert(response.description);
            });
             //change state go to app.module
        }

        
        var provider = new firebase.auth.GoogleAuthProvider();
        function googleSignUp() {
          provider.setCustomParameters({
             prompt: 'select_account'
            });

           firebase.auth()
   
             .signInWithPopup(provider).then(function(result) {
              var token = result.credential.accessToken;
              var user = result.user;
        
              console.log(token);
              console.log(user);

              signUpVm.newUser.email = user.email;
              signUpVm.newUser.username = user.displayName;
              signUpVm.newUser.type = 3;
              signUpVm.newUser.phone_number = "";
              signUp();
              
            }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        
          console.log(error.code);
          console.log(error.message);

            });
        
    }
}

})();