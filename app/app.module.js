var appName = "Kakes";
// Ionic Starter App


angular.module(appName, ['ionic'])

.run(function($ionicPlatform, $rootScope, $state) {
    $rootScope.$state = $state;

    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$stateChangeStart', function(e, curr, prev) {

        $rootScope.pageTitle = curr.title;
    });

    $rootScope.$on('$stateChangeSuccess', function(e, curr, prev) {
        $rootScope.currentState = $state.current;

    });
})

.config(function($stateProvider, $urlRouterProvider) {
    //fallback language if entry is not found in current language
    /*$translateProvider.fallbackLanguage('es');*/
    //load language entries from files
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js


    $stateProvider

    

    .state('login', {
        url: "/login",
        templateUrl: "app/login/templates/login.html",
        controller: 'LoginController as Login',
        title: 'Login'
    })

    .state('signup', {
        url: "/signup",
        templateUrl: "app/signup/templates/signup.html",
        controller: 'SignUpController as SignUp',
        title: 'SignUp'
    })

     .state('set-location', {
        url: "/set-location",
        templateUrl: "app/set-location/templates/set-location.html",
        controller: 'SetLocationController as SetLocation',
        title: 'SetLocation'
    })

     .state('display-options', {
        url: "/display-options",
        templateUrl: "app/display-options/templates/display-options.html",
        controller: 'DisplayOptionsController as DisplayOptions',
        title: 'display-options'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});