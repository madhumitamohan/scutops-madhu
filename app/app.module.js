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

     .state('dashboard', {
        url: "/dashboard",
        templateUrl: "app/dashboard/templates/dashboard.html",
        controller: 'DashboardController as Dashboard',
        title: 'dashboard'
    })


     .state('confirm-booking', {
        url: "/confirm-booking",
        templateUrl: "app/confirm-booking/templates/confirm-booking.html",
        controller: 'ConfirmBookingController as ConfirmBooking',
        title: 'confirm-booking'
    })

     .state('feedback', {
        url: "/feedback",
        templateUrl: "app/feedback/templates/feedback.html",
        controller: 'FeedbackController as Feedback',
        title: 'feedback'
    })

     .state('menu', {
        url: "/menu",
        templateUrl: "app/menu/templates/menu.html",
        controller: 'MenuController as Menu',
        title: 'menu'
    })

     .state('about', {
        url: "/about",
        templateUrl: "app/about/templates/about.html",
        controller: 'AboutController as About',
        title: 'about'
    })

     .state('settings', {
        url: "/settings",
        templateUrl: "app/settings/templates/settings.html",
        controller: 'SettingsController as Settings',
        title: 'settings'
    })

      .state('help', {
        url: "/help",
        templateUrl: "app/help/templates/help.html",
        controller: 'HelpController as Help',
        title: 'help'
    })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});