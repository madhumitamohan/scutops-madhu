 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('PhoneNumberDataService', PhoneNumberDataService)

     .factory('PhoneNumberClientDataService', PhoneNumberClientDataService)

     .factory('PhoneNumberPersistenceDataService', PhoneNumberPersistenceDataService);

     PhoneNumberDataService.$inject = ['PhoneNumberClientDataService','PhoneNumberPersistenceDataService'];

     function PhoneNumberDataService(PhoneNumberClientDataService,PhoneNumberPersistenceDataService) {
         var newUserDetailsDataService = {
            createAccount : createAccount
         };

         function createAccount(newUserDetails){
            return PhoneNumberPersistenceDataService.createAccount(newUserDetails);
         }

        return newUserDetailsDataService;
     }

     PhoneNumberClientDataService.$inject = ['$q', 'config'];

     function PhoneNumberClientDataService($q, config) {
         var PhoneNumberClientDataService = {
         };
         return PhoneNumberClientDataService;
     }

     PhoneNumberPersistenceDataService.$inject = ['$q', 'config','$http'];

     function PhoneNumberPersistenceDataService($q, config, $http) {
         var newUserDetailsPersistenceDataService = {
           createAccount : createAccount
         };

         function createAccount(newUserDetails){
            console.log(newUserDetails);
            var defer = $q.defer();
            $http({
                url:config.API_URL.signup,
                method:"POST",
                data:newUserDetails
            }).then(function onSuccess(response){    
                console.log(response.data);        
                defer.resolve(response.data);
            },function onFailure(response){
                console.log(response); 
                console.log("FAILURE");
                defer.resolve(false);
            });

            return defer.promise;
         }
         return newUserDetailsPersistenceDataService;
     }
 })();