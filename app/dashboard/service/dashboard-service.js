 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('DashboardDataService', DashboardDataService)

     .factory('DashboardClientDataService', DashboardClientDataService)

     .factory('DashboardPersistenceDataService', DashboardPersistenceDataService);

     DashboardDataService.$inject = ['DashboardClientDataService','DashboardPersistenceDataService'];

     function DashboardDataService(DashboardClientDataService,DashboardPersistenceDataService) {
         var DashboardDataService = {
            logoutUser:logoutUser
         };

         function logoutUser(){
            return DashboardPersistenceDataService.logoutUser();
         }

        return DashboardDataService;
     }

     DashboardClientDataService.$inject = ['$q', 'config'];

     function DashboardClientDataService($q, config) {
         var DashboardClientDataService = {
         };
         return DashboardClientDataService;
     }

     DashboardPersistenceDataService.$inject = ['$q','config','$http'];

     function DashboardPersistenceDataService($q, config,$http) {
         var DashboardPersistenceDataService = {
            logoutUser:logoutUser
         };
         return DashboardPersistenceDataService;
         function logoutUser(){
            
            var defer = $q.defer();
            $http({
                method:"POST",
                url:config.API_URL.dashboard
            }).then(function success(response){
                //console.log(defer.resolve());
                //console.log(response);
                defer.resolve(response);
            },function failure(response){
                console.log(response.statusType);
                defer.resolve(false);
            });
            return defer.promise;
         }
         
     }
 })();