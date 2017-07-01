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
            applyPackage : applyPackage
         };

         function applyPackage(packageDetails){
            return BookPackagePersistenceDataService.applyPackage(packageDetails);
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
            applyPackage : applyPackage
         };

         function applyPackage(packageDetails){

            var defer = $q.defer();
            $http({
                method:"POST",
                url:config.API_URL.applyPackage,
                data:packageDetails
            }).then( function success(response){
                defer.resolve(response.data);

            }, function failure(response){
                console.log(response.statusType);
                defer.resolve(false);
            });

            return defer.promise;

         }
          return bookPackagePersistenceDataService;

        
     }
 })();