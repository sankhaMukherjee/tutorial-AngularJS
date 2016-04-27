var app = angular.module('graphPlotterDemoApp', []);

app.controller('PlotCtrl1', function ($scope, $http, $interval){
    
    /////////////////////////////////////////////////
    // The data now is going to look more like the  
    //   data for a Plotly graph.
    var machineIDs = ['machineID_1', 'machineID_2', 'machineID_3'];
    $scope.data    = [];

    for (i=0; i < machineIDs.length; i++) {
        $scope.data.push({
            x:[1,2,3,4,5,6,7,8,9,10,11],
            y:[],
            name: machineIDs[i]
        });
    };

    $scope.getData = function(){
        for (var i = 0; i < machineIDs.length; i++) {
                $http.get('http://localhost:8080/dataMachine?machine=' + machineIDs[i]).success(
                (
                        function (i) {
                            return function(data) { 
                                if ($scope.data[ i ]['y'].length > 10)
                                    $scope.data[ i ]['y'].shift();
                                $scope.data[ i ]['y'].push(Number(data));
                            }
                        }

                )(i)
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


app.directive('linePlot', function () {

    // Create a link function
    function linkFunc(scope, element, attrs) {
        scope.$watch('data', function (plots) {
            var layout = {
                'width': attrs.width,
                'height': attrs.height,
                'pad':'0',
                'margin': { 't': 0, 'b':20, 'l':40, 'r':0 },
            };

            Plotly.newPlot(element[0], plots, layout);
        }, true);
    }

    // Return this function for linking ...
    return {
        link: linkFunc
    };
});

