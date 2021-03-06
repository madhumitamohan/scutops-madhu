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

    Login.$inject = ['$state', '$filter', '$http', 'config', '$location','LoginDataService','CommonService'];

    function Login($state, $filter, $http, config, $location, LoginDataService, CommonService) {
        var loginVm = this;
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = ""; //manu@gmail.com
        loginVm.currentUser.password = "";
        // Function declarations
        
        loginVm.SignUp = SignUp;
        loginVm.forgotPassword = forgotPassword;
        loginVm.displayPassword = displayPassword;
        loginVm.authenticateUser = authenticateUser;
        //loginVm.googleSignIn = googleSignIn;

        activate();

        function displayPassword(){
            document.getElementById("password").type="text";
            setTimeout(function(){
                document.getElementById("password").type="password";
            },500);
            
        }

        function forgotPassword(){
          var auth = firebase.auth();
          var emailAddress = loginVm.currentUser.email;

          auth.sendPasswordResetEmail(emailAddress).then(function() {
            console.log("sent");// Email sent.
          }, function(error) {
            console.log("error");// An error happened.
          });
        }

        function activate() {
            
        }

        function authenticateUser() {

          /*firebase.auth().signInWithEmailAndPassword(loginVm.currentUser.email, loginVm.currentUser.password).catch(function(error) {
           console.log("error");
          });
          $state.go('sidebar.dashboard');*/
            var userDetails = JSON.stringify(loginVm.currentUser);
            //console.log(userDetails);
            LoginDataService.authenticateUser(userDetails).then(function(response){
                if(response.result){
                    CommonService.setCookie("id",response.payload.id);
                    CommonService.setUserDetails(response.payload);
                    $state.go('sidebar.dashboard');
                  }
                else
                    alert(response.description);
            });
            return;
            /*if(loginVm.currentUser.email== "Scutops")
            {
                if(loginVm.currentUser.password == "123")
                    $state.go('dashboard');
                else
                    alert("Please enter the right password");
            }
            else
                alert("This username has not been signed up. Please signup");*/
        }

        function SignUp() {
        $state.go('signup');
             //change state go to app.module
        }

/*
        function ForgotPassword() {
            /*$state.go('forgotPassword');
            $location.path('/forgot');
        }*/

       
        //var provider = new firebase.auth.GoogleAuthProvider();

        /*function googleLogIn() {
          provider.setCustomParameters({
            prompt: 'select_account'
          });
            firebase.auth()
   
            .signInWithPopup(provider).then(function(result) {
             var token = result.credential.accessToken;
             var user = result.user;
        
             //console.log(token);
             //console.log(user);
             loginVm.currentUser.email = user.email;
             loginVm.currentUser.password = "";
             loginVm.currentUser.type = 3;
             authenticateUser();
            }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        
          console.log(error.code)
          console.log(error.message)
            });
        }

        function googleLogOut() {
   firebase.auth().signOut()
    
   .then(function() {
      console.log('Signout Succesfully');
   }, function(error) {
      console.log('Signout Failed');  
   });
}*/

}
})();