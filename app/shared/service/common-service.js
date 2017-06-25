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
        var value;
        return{
            setValue: function(bookingValue){
                 value = bookingValue;
             },
             getValue: function(){
                return value;
             }
             };
        

    }

})();