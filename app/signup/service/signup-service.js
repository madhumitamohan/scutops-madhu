 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('SignUpDataService', SignUpDataService)

     .factory('SignUpClientDataService', SignUpClientDataService)

     .factory('SignUpPersistenceDataService', SignUpPersistenceDataService);

     SignUpDataService.$inject = ['SignUpClientDataService','SignUpPersistenceDataService'];

     function SignUpDataService(SignUpClientDataService,SignUpPersistenceDataService) {
         var signUpDataService = {
            createAccount : createAccount
         };

        function createAccount(newUserDetails){
            return SignUpPersistenceDataService.createAccount(newUserDetails);
        }

        return signUpDataService;
     }

     SignUpClientDataService.$inject = ['$q', 'config'];

     function SignUpClientDataService($q, config) {
         var SignUpClientDataService = {
         };
         return SignUpClientDataService;
     }

     SignUpPersistenceDataService.$inject = ['$q', 'config','$http'];

     function SignUpPersistenceDataService($q, config, $http) {
         var signUpPersistenceDataService = {
            createAccount : createAccount
         };
         return signUpPersistenceDataService;

         function createAccount(newUserDetails){
            //console.log(newUserDetails);
            var defer = $q.defer();
            $http({
                url:config.API_URL.signup,
                method:"POST",
                data:newUserDetails
            }).then(function onSuccess(response){
                /*console.log(response.data);
                console.log(response);
                console.log(defer.resolve(response.data));*/              
                defer.resolve(response.data);
            },function onFailure(response){
                console.log("FAILURE");
                defer.resolve(false);
            });

            return defer.promise;
         }
     }
 })();