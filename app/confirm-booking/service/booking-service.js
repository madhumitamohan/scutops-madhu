 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('BookingDataService', BookingDataService)

     .factory('BookingClientDataService', BookingClientDataService)

     .factory('BookingPersistenceDataService', BookingPersistenceDataService);

     BookingDataService.$inject = ['BookingClientDataService','BookingPersistenceDataService'];

     function BookingDataService(BookingClientDataService, BookingPersistenceDataService) {
         var bookingDataService = {
            makePayment : makePayment
         };

         function makePayment(userDetails){
            return BookingPersistenceDataService.makePayment(userDetails);
         }

        return bookingDataService;
     }

     BookingClientDataService.$inject = ['$q', 'config'];

     function BookingClientDataService($q, config) {
         var bookingClientDataService = {
         };
         return bookingClientDataService;
     }

     BookingPersistenceDataService.$inject = ['$q', 'config','$http'];

     function BookingPersistenceDataService($q, config,$http) {
         var bookingPersistenceDataService = {
            makePayment : makePayment
         };

         function makePayment(userDetails){
            var defer = $q.defer();
            $http({
                method:"POST",
                url: config.API_URL.makePayment,
                data:userDetails
            }).then(function success(response){
                defer.resolve(response.data);
            }, function failure(response){
                console.log(response.statusType);
                defer.resolve(false);
            });

            return defer.promise;
         }
         return bookingPersistenceDataService;
     }
 })();