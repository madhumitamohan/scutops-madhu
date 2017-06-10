 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('BookPackageDataService', BookPackageDataService)

     .factory('BookPackageClientDataService', BookPackageClientDataService)

     .factory('BookPackagePersistenceDataService', BookPackagePersistenceDataService);

     BookPackageDataService.$inject = ['BookPackageClientDataService', 'BookPackagePersistenceDataService'];

     function BookPackageDataService(BookPackageClientDataService, BookPackagePersistenceDataService) {
         var bookPackageDataService = {
            authenticateUser : authenticateUser
         };

         function authenticateUser(userDetails){
            return BookPackagePersistenceDataService.authenticateUser(userDetails);
         }

        return bookPackageDataService;
     }

     BookPackageClientDataService.$inject = [ 'config'];

     function BookPackageClientDataService( config) {
         var bookPackageClientDataService = {
         };
         return bookPackageClientDataService;
     }

     BookPackagePersistenceDataService.$inject = ['$q','$http','config'];

     function BookPackagePersistenceDataService($q, $http, config) {
         var bookPackagePersistenceDataService = {
            authenticateUser : authenticateUser
         };
          return bookPackagePersistenceDataService;
         function authenticateUser(userDetails){
            var defer = $q.defer();
            $http({
                method:"POST",
                url: config.API_URL.bookPackage,
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
        
     }
 })();