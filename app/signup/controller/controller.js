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

    SignUp.$inject = ['$state', '$filter', '$http', 'config', '$location','SignUpDataService', 'CommonService'];

    function SignUp($state, $filter, $http, config, $location,SignUpDataService, CommonService) {
        var signUpVm = this;
        // Variable declarations
        signUpVm.newUser = {};
        signUpVm.newUser.email = "";
        signUpVm.newUser.type = 0;
        signUpVm.newUser.phone_number = "";
        signUpVm.newUser.password = "";
        signUpVm.newUser.username = "";
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
            /*firebase.auth().createUserWithEmailAndPassword(signUpVm.newUser.email, signUpVm.newUser.password).catch(function(error) {
              console.log("error")
            });*/
            //console.log(signUpVm.newUser);
            var newUserJSON = JSON.stringify(signUpVm.newUser);
            //console.log(newUserJSON);
            if(signUpVm.newUser.type == 1)
              {
                SignUpDataService.createAccount(newUserJSON).then(function(response){
                              //console.log(response.description);
                              if(response.result){
                                CommonService.setCookie("id",response.payload.id);
                                CommonService.setUserDetails(response.payload);
                                $state.go('sidebar.dashboard');
                              }
                              else
                                  alert(response.description);
                          });
            }
            else if(signUpVm.newUser.type == 3){
              CommonService.setValue(signUpVm.newUser);
              $state.go('phoneNumber');
            }
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