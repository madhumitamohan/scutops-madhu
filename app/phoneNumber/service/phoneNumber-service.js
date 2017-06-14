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
         var phoneNumberDataService = {
            addPhoneNumber : addPhoneNumber
         };

         function addPhoneNumber(phoneNumber){
            return PhoneNumberPersistenceDataService.addPhoneNumber(phoneNumber);
         }

        return phoneNumberDataService;
     }

     PhoneNumberClientDataService.$inject = ['$q', 'config'];

     function PhoneNumberClientDataService($q, config) {
         var PhoneNumberClientDataService = {
         };
         return PhoneNumberClientDataService;
     }

     PhoneNumberPersistenceDataService.$inject = ['$q', 'config','$http'];

     function PhoneNumberPersistenceDataService($q, config, $http) {
         var phoneNumberPersistenceDataService = {
           addPhoneNumber : addPhoneNumber
         };

         function addPhoneNumber(phoneNumber){
            console.log(phoneNumber);
            var defer = $q.defer();
            $http({
                url:config.API_URL.addPhoneNumber,
                method:"POST",
                data:phoneNumber
            }).then(function onSuccess(response){    
                console.log(response);        
                defer.resolve(response.data);
            },function onFailure(response){
                console.log(response); 
                console.log("FAILURE");
                defer.resolve(false);
            });

            return defer.promise;
         }
         return phoneNumberPersistenceDataService;
     }
 })();