var app = angular.module('testBidirection', []);

app.controller('tempCntrl', function ($scope, $http){
    
    var getDateTime = function(){
        ////////////////////////////////////////////////////////
        // This function simply gets the current datetime
        // and formats that into a form that allows the 
        // values to be part of a GET request using 
        // parameter variables ...
        // modified from the following website:
        // http://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
        /////////////////////////////////////////////////////////
        var currentdate = new Date(); 
        var datetime = "date=" + currentdate.getDate()      + "&"
                + "month="     + (currentdate.getMonth()+1) + "&" 
                + "year="      + currentdate.getFullYear()  + "&"  
                + "hour="      + currentdate.getHours()     + "&"  
                + "minute="    + currentdate.getMinutes()   + "&" 
                + "second="    + currentdate.getSeconds();

        return datetime;
    };

    $scope.data = 'some test abcd';

    $scope.getData = function(){
        $http.get('http://localhost:8080/dataEcho?' + getDateTime()).success(function(data){
            $scope.data = data;
        });
    };

    $scope.getData();

});

