(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('FeedbackController', Feedback);

    Feedback.$inject = ['$state', '$filter', '$http', 'config', '$location','CommonService','FeedbackDataService'];

    function Feedback($state, $filter, $http, config, $location,CommonService,FeedbackDataService) {
        var feedbackVm = this;
        // Variable declarations
        feedbackVm.feedbackDetails = {};
        feedbackVm.feedbackDetails.feedback="";

        // Function declarations
        feedbackVm.enterFeedback = enterFeedback;

        activate();

        function activate() {
            feedbackVm.feedbackDetails.cust_id = CommonService.getUserDetails().id;
        }

        function enterFeedback(){
            console.log(feedbackVm.feedbackDetails.feedback);
            var feedbackDetails = JSON.stringify(feedbackVm.feedbackDetails);
            console.log(feedbackDetails);
            FeedbackDataService.enterFeedback(feedbackDetails).then(function(response){
                    if(response.result)
                        alert("Feedback placed successfully");
                    else
                        alert(response.description);
                });
        }


    }

})();