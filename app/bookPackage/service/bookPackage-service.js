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
         };

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
         };
          return bookPackagePersistenceDataService;

        
     }
 })();