# Rapid prototyping of systems for visual display - (III)

In the [Part I][Part I], we covered the creation of a framework and the creation of the server. In [Part II][Part II], we talked about creating a simple plot using plotly.js. In this part, we are going to use algularJS to connect the server and the client, so that the data sent by the server can be . Specifically, this is part III of the IV part series shown below ...

  - Part 0 - The Framework
  - Part I - The Server
  - Part II - The Client - A Simple Plot using Plotly
  - Part III - Communication between the server and the client.
  - Part IV - Creating a New Display using the Framework

## Communication between the server and the client

This section is a little involved and is important to know a little bit of the inner workings of angularJS. Again, I will not be able to cover everything there is in angularJS. Just the portion that is necessary for the communication between angularJS and the server. I shall split this into two subsections, simply because angularJS has two major components - the <font color='indianred'>directive</font> and the <font color='indianred'>controller</font>. The thing that you need to know is that 

 - The directive deals with the display
 - The controller deals with data

We shall first create a controller, and show how we can connect the server to update the data. Next we shall create a directive to plot the data using plotly. Both the directive and the controller is part of an angularJS module. Just so you know, each module can have multiple directives and multiple controllers.

This part of the project is inspired by another tutorial which may be found [here][tutorial-aJS-directives]. 

The angular module is just created using the command 

```python
var app = angular.module('graphPlotterDemoApp', []);
```
The name of the module `'graphPlotterDemoApp'` can be anything. This is attached to the following 

### The Controller

Now we can attach a particular controller to the `app`. All that this is going to contain is the data that we want to plot. So, copy the folder which we had created into a new location and call it `Client - with attrs`. It should have the folder structure as shown below:

```bash
.
├── Readme.md
├── client
│   ├── angular.min.js
│   ├── app.js
│   ├── jquery.min.js
│   ├── plotly.min.js
│   └── temp.html
└── server
    ├── data.csv
    └── server.py
```

At the moment, don't worry about the server part. Just concentrate on the client. Now open the `app.js` file, delete whatever was there previously, and add the following code. 

```javascript
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
```

So whats going on? We have an angular module called `'graphPlotterDemoApp'`, and two controllers `PlotCtrl1` and `PlotCtrl2`. Each of the controllers have the some data within their `$scope`. Understanding scope is central to understanding angularJS, so we have created two separate controllers, and they are going to have (as we shall see later), two separate scopes.

Generally, the scopes are hierarchical in nature, and is customary to associate the `<body>` of the HTML with the module (in this case `graphPlotterModule`) and specific `<div>`'s within the body with specific controllers. Now open `temp.html` and create the following markup within it ...

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <title>Plotly Graph Plotter Directive for AngularJS - Demo</title>
    <script src="jquery.min.js"></script>
    <script src="angular.min.js"></script>
    <script src="plotly.min.js"></script>
    <script src="app.js"></script>
</head>
<body ng-app="graphPlotterDemoApp">
 
<div  ng-controller="PlotCtrl1">
    {{data}}
</div>
 
<div  ng-controller="PlotCtrl2">
    {{data}}
</div>
 
</body>
</html>
```

Now, open this file with as web browser. This is what you will see:

![Imgur](http://i.imgur.com/7Z8zqxk.png?1)

As you can tell, the `{{data}}` tags have been replaced with data within their own respective scopes. Hence it is possible to have more than one div with its own independent data associated with it. We shall now create plotly plots with this data within the controllers. 

### The directive

The directive is what you need for creating two-way binding between the data in controllers and the display. To this end, angularJS already provides some standard directives. To see this, change the HTML code to the following

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <title>Plotly Graph Plotter Directive for AngularJS - Demo</title>
    <script src="jquery.min.js"></script>
    <script src="angular.min.js"></script>
    <script src="plotly.min.js"></script>
    <script src="app.js"></script>
</head>
<body ng-app="graphPlotterDemoApp">
 
before div = PlotCtrl1
<div  ng-controller="PlotCtrl1">
    {{data}}
    <table>
    <thead><tr><td>x</td><td>y</td></tr></thead>
    <tbody ng-repeat='x1 in data[0].x'>
        <tr>
            <td><input type='number' ng-model='data[0].x[$index]'></td>
            <td><input type='number' ng-model='data[0].y[$index]'></td>
        </tr>    
    </tbody>
    </table>
</div>
 
before div = PlotCtrl1
<div  ng-controller="PlotCtrl2">
    {{data}}
</div>
 
</body>
</html>
```

You should see something like the following 

![Imgur](http://i.imgur.com/sofKyMX.png)

We have just added a table with inputs, and we have bound the values of the inputs to the data using the `ng-model` <font color='indianred'>directive</font>. Change the values within the inputs and you should see corresponding changes in the data shown ...

However, to actually show the plot, we need a custom directive. That is because, angularJS does not provide a standard directive for plotly.js, because it is not a standard html5 UI. So, we shall just create our own. Change the `app.js` file so that it now looks like the following: 

```javascript
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
        }, true);
    }
 
    // Return this function for linking ...
    return {
        link: linkFunc
    };
});
```

We have added a directive here. It looks like a handful, so lets go through it slowly:

<p>
<font color='indianred'>Line 15:</font> We are adding a custom directive called `linePlot` which will later be transformed into `line-plot` within the HTML. (Read more about this in the angularJS documentation)
</p>

<p>
<font color='indianred'>Line 18:</font> We create a function called `linkFunction` (you can call it whatever you want). It gets three inputs: 
</p>

 - `scope`: refers to the controller scope to which it is bound. Remember, that controllers are typically bound to `<div>` elements? The `scope` refers to the data within this element. All data within this controller is immediately available to this `linkFunction`
 - `element`: This is the `jquery` object pointing to the HTML element to which this is associated. 
 - `attrs`: This is a dictionary of attributes associated with the current element. 

Don't worry if they dont make sense immediately. They will make sense once we change the HTML 
 
<p>
<font color='indianred'>Line 19:</font> We create a `$watch`er that looks for changes in the `data` within the scope. Whenever there is a change in the data, it runs the annonymous function in its second argument. It passes on the changed data to the function (and here we refer to that data as `plots`). 
</p>

<p>
<font color='indianred'>Lines 20-28:</font> The rest of the anonymous function just plots the data provided to it, as we had done in the previous article.
</p>

<p>
<font color='indianred'>Line 28:</font> The `true` needs a special mention. It says that every time the data changes, run this function. 
</p>


At this point, we should add plot the data within the html. 

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <title>Plotly Graph Plotter Directive for AngularJS - Demo</title>
    <script src="jquery.min.js"></script>
    <script src="angular.min.js"></script>
    <script src="plotly.min.js"></script>
    <script src="app.js"></script>
</head>
<body ng-app="graphPlotterDemoApp">
 
before div = PlotCtrl1
<div  ng-controller="PlotCtrl1">
    {{data}}
    <table>
    <thead><tr><td>x</td><td>y</td></tr></thead>
    <tbody ng-repeat='x1 in data[0].x'>
        <tr>
            <td><input type='number' ng-model='data[0].x[$index]'></td>
            <td><input type='number' ng-model='data[0].y[$index]'></td>
        </tr>    
    </tbody>
    </table>

    <line-plot width=300, height=200>
</div>
 
before div = PlotCtrl1
<div  ng-controller="PlotCtrl2">
    <line-plot width=300, height=200>
    {{data}}
</div>
 
</body>
</html>
```

You will notice that we have only added two lines. One for each graph. Notice how each graph shows the data corresponding to the data of its parent. The  <font color='indianred'> attributes </font> `height` and `width` control are passed to the directive and are used for rescaling the plot.

Your html now should now look like this ...

![Imgur](http://i.imgur.com/8zAdXLg.png?1)

Go ahead and play with the numbers within the boxes and see how the graph changes, as you change the numbers. 

Now finally we have the pieces we need to rig up a system that can get data from the server and instantly update the chart. This next section is what we have been waiting for all this while ...

### Communicating with the server ...

Now remember that the `controller` is supposed to deal with data? Yes we shall ask the controller to fetch the data for us. In this case, we shall just change controller `PlotCtrl2`. Change that controller such that that code now looks like the following 

```javascript
app.controller('PlotCtrl2', function ($http, $scope) {
    $scope.data = [{
        x: [1, 2, 3, 4],
        y: [100, 125, 313, 517]}];

    $scope.refresh = function(){
        $http.get('http://localhost:8080/data').success(function(data){
            $scope.data = data;
            $scope.data = [$scope.data];
        });
    };

    $scope.refresh();

});
```

We have only added a few new lines. This adds a new function called `$scope.refresh` which happens to send out an `$http.get()` request to our server. When the server responds with data, this function assigns the obtained data to the `$scope.data` variable. We also call this function explicitly once this happens in Line 13. 

Now I hope you still remember how to run the server. Open a terminal, go to the server folder and type the following to get your server up and running. You should see something like this on the terminal ...

```bash
Sankha-desktop:server user$ python server.py
Bottle server starting up (using WSGIRefServer())...
Listening on http://127.0.0.1:8080/
Hit Ctrl-C to quit.
```

Open a browser, and make sure that when you type `http://127.0.0.1:8080/data` on the terminal, you see a ton of data. Now you are sure that the server is working. 

You should also make a small change to the HTML. Remove the `{{data}}` tag in the `div` that contains `PlotCtrl2`, or else your browser will be floded with data. You will see something like this ...

![Imgur](http://i.imgur.com/VkFupg7.png)


There you have it! You have obtained data from the server and directly plotted it using plotly. There is one more thing that you need to do. You need the program to be able to auto-reload the data every few seconds. This will be the topic of the next article. 

--

[tutorial-aJS-directives]: http://thebedroomprogrammer.blogspot.sg/2015/09/implementing-custom-directives-in.html
[angularJS]: https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.2/angular.min.js "Angular JS Link"
[bottle]: http://bottlepy.org/docs/dev/index.html
[bottleFile]:https://github.com/bottlepy/bottle/raw/master/bottle.py
[jquery]:https://jquery.com
[pandas]: http://pandas.pydata.org/index.html
[plotly]:https://plot.ly/javascript/getting-started/

[Part I]:http://codepen.io/omolluska/post/angular-plotly-i
[Part II]:http://codepen.io/omolluska/post/angular-plotly-ii

