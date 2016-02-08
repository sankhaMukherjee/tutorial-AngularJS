var app = angular.module('graphPlotterDemoApp', []);
 
app.controller('PlotCtrl1', function ($scope) {
    $scope.data = [{
        x: [1, 2, 3, 4],
        y: [10, 15, 12, 17]}];
});
 
app.controller('PlotCtrl2', function ($scope) {
    $scope.data = [{
        x: [1, 2, 3, 4],
        y: [100, 125, 313, 517]}];
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
        });
    }
 
    // Return this function for linking ...
    return {
        link: linkFunc
    };
});
