 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('SetLocationDataService', SetLocationDataService)

     .factory('SetLocationClientDataService', SetLocationClientDataService)

     .factory('SetLocationPersistenceDataService', SetLocationPersistenceDataService);

     SetLocationDataService.$inject = ['SetLocationClientDataService','SetLocationPersistenceDataService'];

     function SetLocationDataService(SetLocationClientDataService,SetLocationPersistenceDataService) {
         var setLocationDataService = {
            createOrder : createOrder
         };

         function createOrder(bookingDetails){
            return SetLocationPersistenceDataService.createOrder(bookingDetails);
         }

        return setLocationDataService;
     }

     SetLocationClientDataService.$inject = ['$q', 'config'];

     function SetLocationClientDataService($q, config) {
         var setLocationClientDataService = {
         };
         return setLocationClientDataService;
     }

     SetLocationPersistenceDataService.$inject = ['$q', 'config', '$http'];

     function SetLocationPersistenceDataService($q, config, $http) {
         var setLocationPersistenceDataService = {
            createOrder : createOrder
        };

        function createOrder(bookingDetails){
            var defer = $q.defer();
            $http({
                method:"POST",
                url: config.API_URL.createOrder,
                data: bookingDetails
            }).then(function mySuccess(response){
                //console.log(response.data);
                defer.resolve(response.data);
            }, function myError(response){
                //console.log(response.statusText);
                defer.resolve(false);
            });

            return defer.promise;
        }
         return setLocationPersistenceDataService;
     }
 })();