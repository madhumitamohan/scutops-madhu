(function() {

    var prefix = "http://localhost/api/";
    var API_URL = {
        serverUrl: prefix,
        login: prefix + "login.php",
        google: prefix + "google.php",
        signup: prefix + "signup.php",
        dashboard:prefix + "dashboard.php",
        createOrder : prefix + "createOrder.php",
        getUserDetails : prefix + "getUserDetails.php",
        makePayment : prefix + "makePayment.php",
        applyPackage : prefix + "applyPackage.php",
        enterFeedback : prefix + "enterFeedback.php"
    };

  /*  function recalculateUrls(prefix) {
        console.log(API_URL);
        console.log(prefix);
        API_URL = {
            serverUrl: prefix,
            login: prefix + "login"
        
        }
        console.log(API_URL);
        config.API_URL = API_URL;
    }*/

    var userDetails = {};

    var config = {
        API_URL: API_URL,
        userDetails: userDetails,
        prefix: prefix,
       // recalculateUrls: recalculateUrls
    };

    angular.module(appName).value('config', config);
    return config;
})()