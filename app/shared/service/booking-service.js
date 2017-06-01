(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     *  Booking service.
     */
    .factory('BookingService', BookingService)
 
    function BookingService(){
        var count;
        return{
            Message : "Hello",
            setCount: function(bookingCount){
                 count = bookingCount;
             },
             getCount: function(){
                return count;
             }
             };
        

    }

})();