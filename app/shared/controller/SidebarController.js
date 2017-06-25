(function() {
/* global angular */
angular.module(appName)

.controller('SidebarController', function($scope,$state, config, SidebarDataService) {
    
    $scope.state = false;
    
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };


    $scope.bookPackage = function(){
        $state.go('bookPackage');
    }

    $scope.feedbackCall = function(){
         $state.go('feedback');
    }

    $scope.settingsCall = function(){
         $state.go('settings');
    }

    $scope.aboutCall = function(){
         $state.go('about');
    }

    $scope.logOut = function(){
       
        SidebarDataService.logoutUser().then(function(response){
            console.log("logged out");
            $state.go('login');
        });
         
    }


    $scope.userDetails = config.userDetails;
    console.log("loading header.....");

    /*if ($scope.userDetails && $scope.userDetails.union_member && $scope.userDetails.union_member == "true") {
        $scope.showUnionLink = true;
        console.log("Is union member");
    } else {
      console.log("Not union member");
    }*/
    
})

.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show'); 
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});
    
}());