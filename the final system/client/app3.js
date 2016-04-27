var app = angular.module('testBidirection', []);

app.controller('tempCntrl', function ($scope, $http, $interval){
    
    /////////////////////////////////////////////////
    // Data to display and its update function
    $scope.data = {
        'machineID_1':'0',
        'machineID_2':'0',
        'machineID_3':'0',
    };

    var machineIDs = ['machineID_1', 'machineID_2', 'machineID_3'];
    $scope.machineID = 'machineID_1';

    $scope.getData = function(){
        for (var i = 0; i < 3; i++) {
                var machineID = machineIDs[i];
                $http.get('http://localhost:8080/dataMachine?machine=' + machineID).success(
                (
                        function (machineID) {
                            return function(data) { 
                                $scope.data[ machineID ] = Number(data);
                                   }
                        }

                )(machineID)
                );
        };
    };
    

    //////////////////////////////////////////////////
    // Button controller. Use this controller to    //
    //      toggle the initiation of getting and    //
    //      stopping data retrieval ...             //
    //////////////////////////////////////////////////
    $scope.buttonText = 'start Comm';
    $scope.toggleComm = function(){
        if ($scope.buttonText == 'start Comm') {
            $scope.buttonText = 'stop Comm';
            stop = $interval($scope.getData, 2*100);
        } else {
            $scope.buttonText = 'start Comm';
            $interval.cancel(stop);
            stop=undefined;
        }
    };

});

