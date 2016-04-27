var app = angular.module('testBidirection', []);

app.controller('tempCntrl', function ($scope, $http, $interval){
    
    ////////////////////////////////////////////////////////
    // Just get the current date-time ...
    /////////////////////////////////////////////////////////
    var getDateTime = function(){
        var currentdate = new Date(); 
        var datetime = "date=" + currentdate.getDate()      + "&"
                + "month="     + (currentdate.getMonth()+1) + "&" 
                + "year="      + currentdate.getFullYear()  + "&"  
                + "hour="      + currentdate.getHours()     + "&"  
                + "minute="    + currentdate.getMinutes()   + "&" 
                + "second="    + currentdate.getSeconds();

        return datetime;
    };

    /////////////////////////////////////////////////
    // Data to display and its update function
    $scope.data = 'Communication to commence';

    $scope.getData = function(){
        $http.get('http://localhost:8080/dataEcho?' + getDateTime()).success(function(data){
            $scope.data = data;
        });
    };

    //////////////////////////////////////////////////
    // Button controller. Use this controller to 
    //      toggle the initiation of getting and 
    //      stopping data retrieval ...
    $scope.buttonText = 'start Comm';
    $scope.toggleComm = function(){
        if ($scope.buttonText == 'start Comm') {
            $scope.buttonText = 'stop Comm';
            stop = $interval($scope.getData, 2*100);
        } else {
            $scope.buttonText = 'start Comm';
            $interval.cancel(stop);
            $scope.data = 'End to communication';
            stop=undefined;
        }
    };

});

