(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     *  Booking service.
     */
    .factory('CommonService', CommonService)
 
    function CommonService(){
        var bookingDetails,currentUserDetails;

        function setUserDetails(userDetails){
            currentUserDetails = userDetails;
        }

        function getUserDetails(){
            return currentUserDetails;
        }

        function setBookingDetails(bookingValue){
            bookingDetails = bookingValue;
        }

        function getBookingDetails(){
            return bookingDetails;
        }

        function setCookie(cname,cvalue){
            var d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }


        function checkCookie() {
            var user = getCookie("id");
            if (user != "") {
                return true;
            } else {
                return false;
            }
        }

        function deleteCookie(cname){
            var d = new Date();
            d.setTime(d.getTime() - (24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=;" + expires + ";path=/";
        }

        var commonService = {
            setUserDetails : setUserDetails,
            getUserDetails : getUserDetails,
            setBookingDetails: setBookingDetails,
            getBookingDetails: getBookingDetails,
            setCookie : setCookie,
            checkCookie : checkCookie,
            deleteCookie : deleteCookie,
            getCookie : getCookie
             };

        return commonService;
      

    }

})();