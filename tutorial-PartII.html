# Rapid prototyping of systems for visual display (III)

In the [previous post][Part I], we covered the creation of a framework and the creation of the server. In this post, we shall talk about creating a simple plot using plotly.js. Specifically, this is part II of the IV part series shown below ...

  - Part 0 - The Framework
  - Part I - The Server
  - Part II - The Client - A Simple Plot using Plotly
  - Part III - Communication between the server and the client.
  - Part IV - Creating a New Display using the Framework

## Part II - The Client - A Simple Plot using Plotly

Note that the entire git repository for this section may be found [here]().

After Plotly open-sourced its web plotting client, creating plots on the web has become a breeze. In this section, we shall see how we can create a simple plot using Plotly.js. I hope that you still have the framework shown in the previous post. Copy that in a new folder. The name of the folder doesn't matter. I've just called it `Client - our first Plots`

Add a couple of empty files in the `client` folder called `temp.html` and `app.js`. We shall be filling in these  soon. Your folder structure should look like this ...

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
    ├── server.py
    └── server1.py
```

Now, within the empty html file, lets write the following code:

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <title>Plotly Graph Plotter Directive for AngularJS - Demo</title>
    <script src="jquery.min.js"></script>
    <script src="plotly.min.js"></script>
</head>
<body>
 
 before plot
<div id='plotHere'></div>
 after plot
</body>
</html>
```

As you can see, beyond the normal HTML documents, we are adding a couple of javascript libraries in the `<head>` section. Nothing out of the ordinary. Now lets create a plot. This is javascript, and is generally placed at the end of the document ...

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <title>Plotly Graph Plotter Directive for AngularJS - Demo</title>
    <script src="jquery.min.js"></script>
    <script src="plotly.min.js"></script>
</head>
<body>
 
 before plot
<div id='plotHere'></div>
 after plot 

<script type="text/javascript">
    var data = [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }];

    var layout = {
                'width': 300,
                'height': 200,
                'pad':'0',
                'margin': { 't': 0, 'b':20, 'l':40, 'r':10 },
            };

    Plotly.plot( $('#plotHere')[0], data, layout);

</script>
</body>
</html>
```

Plotting the data is just a single line. The code is really self-explanatory, except for people who are not familiar with javascript. `$('#plotHere')[0]` refers to the `div` whose ID is `plotHere`. We are asking plotly to plot within that `div` element. 

Of course, we have created extra variables to store the `layout` and `data`, but that is just incidental. Of course, there is no need to keep the script within this file. It is much easier to shift that over to another file. Copy-paste everything within the `<script>` tag into the empty file called `app.js`.

So, `app.js` looks like so:

```javascript
var data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }];

var layout = {
            'width': 300,
            'height': 200,
            'pad':'0',
            'margin': { 't': 0, 'b':20, 'l':40, 'r':10 },
        };

Plotly.plot( $('#plotHere')[0], data, layout);
```

and the remaining HTML looks like the following ...

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <title>Plotly Graph Plotter Directive for AngularJS - Demo</title>
    <script src="jquery.min.js"></script>
    <script src="plotly.min.js"></script>
</head>
<body>
 
 before plot
<div id='plotHere'></div>
 after plot 


<script type="text/javascript" src='app.js'></script>

</body>
</html>
```

The result should look like the following ...

![Imgur](http://i.imgur.com/yiu7MrO.png?1)

Now that we can use a server to source data, and use Plotly to plot some data, in the next section, we shall see how the data can be updated from the server so that the plotly.js can plot the data that we get from the server, and not the one that is hardcoded into the HTML.

[Part I]:http://htmlpreview.github.io/?https://github.com/sankhaMukherjee/tutorial-AngularJS/blob/gh-pages/index.html
