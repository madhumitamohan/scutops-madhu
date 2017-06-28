 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('SidebarDataService', SidebarDataService)

     .factory('SidebarClientDataService', SidebarClientDataService)

     .factory('SidebarPersistenceDataService', SidebarPersistenceDataService);

     SidebarDataService.$inject = ['SidebarClientDataService','SidebarPersistenceDataService'];

     function SidebarDataService(SidebarClientDataService,SidebarPersistenceDataService) {
         var SidebarDataService = {
            logoutUser:logoutUser
         };

         function logoutUser(){
            return SidebarPersistenceDataService.logoutUser();
         }

        return SidebarDataService;
     }

     SidebarClientDataService.$inject = ['$q', 'config'];

     function SidebarClientDataService($q, config) {
         var SidebarClientDataService = {
         };
         return SidebarClientDataService;
     }

     SidebarPersistenceDataService.$inject = ['$q','config','$http'];

     function SidebarPersistenceDataService($q, config,$http) {
         var SidebarPersistenceDataService = {
            logoutUser:logoutUser
         };
         return SidebarPersistenceDataService;
         function logoutUser(){
            
            var defer = $q.defer();
            $http({
                method:"POST",
                url:config.API_URL.logout
            }).then(function success(response){
                //console.log(defer.resolve());
                //console.log(response);
                defer.resolve(response);
            },function failure(response){
                //console.log(response.statusType);
                defer.resolve(false);
            });
            return defer.promise;
         }
         
     }
 })();