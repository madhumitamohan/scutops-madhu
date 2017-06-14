 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('LoginDataService', LoginDataService)

     .factory('LoginClientDataService', LoginClientDataService)

     .factory('LoginPersistenceDataService', LoginPersistenceDataService);

     LoginDataService.$inject = ['LoginClientDataService', 'LoginPersistenceDataService'];

     function LoginDataService(LoginClientDataService, LoginPersistenceDataService) {
         var loginDataService = {
            authenticateUser : authenticateUser,
            //googleSignIn : googleSignIn
         };

         function authenticateUser(userDetails){
            return LoginPersistenceDataService.authenticateUser(userDetails);
         }

         /*function googleSignIn(authResult){
            return LoginPersistenceDataService.googleSignIn();
         }*/

        return loginDataService;
     }

     LoginClientDataService.$inject = [ 'config'];

     function LoginClientDataService( config) {
         var loginClientDataService = {
         };
         return loginClientDataService;
     }

     LoginPersistenceDataService.$inject = ['$q','$http','config'];

     function LoginPersistenceDataService($q, $http, config) {
         var loginPersistenceDataService = {
            authenticateUser : authenticateUser,
            //googleSignIn : googleSignIn
         };
          return loginPersistenceDataService;
         function authenticateUser(userDetails){
            var defer = $q.defer();
            $http({
                method:"POST",
                url: config.API_URL.login,
                data: userDetails
            }).then(function mySuccess(response){
                //console.log(response.statusText);
                //console.log(response.data);
                defer.resolve(response.data);
            }, function myError(response){
                //console.log(response.statusText);
                defer.resolve(false);
            });

            return defer.promise;
         }

         /*function googleSignIn(authResult){
            var defer = $q.defer();
            $http({
                method:"POST",
                url: config.API_URL.google,
                data:authResult
            }).then(function mySuccess(response){
                //console.log(response.statusText);
                console.log(response.data);
                //defer.resolve(response.data);
            }, function myError(response){
                //console.log(response.statusText);
                //defer.resolve(false);
            });

         }*/
        
     }
 })();