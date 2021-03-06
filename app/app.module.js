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

    .state('splashScreen', {
        url: "/splashScreen",
        templateUrl: "app/splashScreen/templates/splashScreen.html",
        controller: 'SplashScreenController as SplashScreen',
        title: 'SplashScreen'
    })

    .state('login', {
        url: "/login",
        templateUrl: "app/login/templates/login.html",
        controller: 'LoginController as Login',
        title: 'Login'
    })

    .state('sidebar', {
        url: "",
        templateUrl: "app/shared/templates/sidebar.html",
        controller: 'SidebarController as Sidebar',
        title: 'Sidebar',
        abstract:true
    })

    .state('header', {
        url: "",
        templateUrl: "app/shared/templates/header.html",
        controller: 'HeaderController as Header',
        title: 'header',
        abstract:true
    })

    

    .state('signup', {
        url: "/signup",
        templateUrl: "app/signup/templates/signup.html",
        controller: 'SignUpController as SignUp',
        title: 'Sign Up'
    })

     .state('set-location', {
        parent:"header",
        url: "/set-location",
        templateUrl: "app/set-location/templates/set-location.html",
        controller: 'SetLocationController as SetLocation',
        title: 'Set Location'
    })

     .state('sidebar.dashboard', {
        url: "/dashboard",
        templateUrl: "app/dashboard/templates/dashboard.html",
        controller: 'DashboardController as Dashboard',
        title: 'Dashboard'
    })


     .state('confirm-booking', {
        parent:"header",
        url: "/confirm-booking",
        templateUrl: "app/confirm-booking/templates/confirm-booking.html",
        controller: 'ConfirmBookingController as ConfirmBooking',
        title: 'Confirm-Booking'
    })

     .state('feedback', {
        parent:"sidebar",
        url: "/feedback",
        templateUrl: "app/feedback/templates/feedback.html",
        controller: 'FeedbackController as Feedback',
        title: 'Feedback'
    })

     .state('about', {
        parent:"sidebar",
        url: "/about",
        templateUrl: "app/about/templates/about.html",
        controller: 'AboutController as About',
        title: 'About'
    })

     .state('settings', {
        parent:"sidebar",
        url: "/settings",
        templateUrl: "app/settings/templates/settings.html",
        controller: 'SettingsController as Settings',
        title: 'Settings'
    })

      .state('help', {
        parent:"sidebar",
        url: "/help",
        templateUrl: "app/help/templates/help.html",
        controller: 'HelpController as Help',
        title: 'Help'
    })

      .state('bookPackage', {
        parent:"sidebar",
        url: "/bookPackage",
        templateUrl: "app/bookPackage/templates/bookPackage.html",
        controller: 'BookPackageController as BookPackage',
        title: 'Book A Package'
    })

      .state('phoneNumber', {
        url: "/phoneNumber",
        templateUrl: "app/phoneNumber/templates/phoneNumber.html",
        controller: 'PhoneNumberController as PhoneNumber',
        title: 'Phone Number'
    })

      .state('liveUpdate', {
        parent:"sidebar",
        url: "/liveUpdate",
        templateUrl: "app/liveUpdate/templates/liveUpdate.html",
        controller: 'LiveUpdateController as LiveUpdate',
        title: 'Live Update'
    })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/splashScreen');

});