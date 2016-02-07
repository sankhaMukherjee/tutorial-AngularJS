# Rapid prototyping of systems for visual display

Oftentimes, it is necessary to monitor certain processes on a regular basis. The ideas are the same.

 - pull data from one or several sources. 
 - do some computation in the data
 - display the data in a meaningful manner
 - repeat every second/minute/hour or whatevery interval of time is a meaningful estimate. 

Of course, there are always someone you can pay to do the task. However, did you know that you (yes *you*!) can rig up a rudimentary monitoring system within a few hours? In the time it will take you to speak with the IT guy and explain to him/her what it is that you exactly want, you can have a system up and running. If you have a barebones framework already written, that comes down to a few minutes. 

In this tutorial, we shall be using some fine libraries to accomplish just that. By *fine* I mean free. And easy. 

At this point I expect you to have a passing familiarity with both Python and javascript. If you aren't a master at either, worry not. Neither am I. So if I can figure this out, so can you. I have segmented the 

  - Part 0 - The Framework
  - Part I - The Server

## Part 0 - Creating a framework

Yes I know, the Romans didn't invent zero. Deal with it. Now lets get on with creating a framework.

### The folder structure

This is only a recommendation. There is no particular need to separate folders in this manner. The only reason for doing this is to understand that the `server` and the `client` are distinct and have no inherent commonality between them. So the folder structure helps forms a mental disconnect between the server and the client.

We shall call the current folder the `framework` folder (for reasons that shall become obvious to us in a little bit), and create two folders in it called the `server` and `client`.  

### The framework

At this time, we shall create a <font color='indianred'>framework</font>. Real frameworks are much more complicated. However, for *our* purposes, this will comprise of a folder with a bunch of folders, subfolders, and files arranged in a convenient manner. At any time, when we wish to replicate and create a similar task, we can just copy the entire folder to another location, rename it, and off we go creating our new application. So create a folder structure that looks like the following ...

```bash
.
└── framework
    ├── Readme.md
    ├── client
    │   ├── angular.min.js
    │   ├── jquery-2.1.4.min.js
    │   └── plotly-latest.min.js
    └── server
        ├── bottle.py
        └── data.csv
```


So `Readme.md` is this file that you are reading. The rest of the files may be downloaded from their respective websites:

 - `angular.min.js` from [here][angularJS]
 - `jquery-2.1.4.min.js` from [here][jquery] (you can get whatever is the latest version)
 - `plotly-latest.min.js` from [here][plotly]
 - `bottle.py` from [here][bottle] (if you want, you can install `bottle`, in which case you don't need this file).

At this point, I assume that you have Python 2.7 installed on your system, along with the [Pandas][pandas] library. 

In this tutorial, we shall go through several technologies. This tutorial is by no means a comprehensive overview of *any* of the technologies described. I hope that, by going through these tutorials, you get familiarized with a number of freely available technologies and realize that developing visualization technologies are not magical. Furthermore, I hope that these tutorials will allow you to push you to extend your understanding of Web Technolonoes.

## Part I - The Server

There is some communication between the `server` and the `client`. The communication is <font color='indianred'>asynchronous</font> which simply means that there is no shared clock between the server and the client. The `client` can request information *at any time* and the 


### The server

The server is pretty simple. We will use the [bottle Web Framework][bottle] to create a simple server. If you dont have the patience to install the bottle Framework, just download the [`bottle.py`][bottleFile] file and put it in your folder. 

The reason most people shy away from programming even rudimentary communication protocols is because traditionally they have been programmed with C or some similar variant. Those days are long gone. You can literally create a server in 3 lines of code. Yes. Really just 3 lines of code. 

So, lets get started ...

Go to the folder named server and create a Python file called `server.py`. The folder structure should now look like this:

```bash
.
└── framework
    ├── Readme.md
    ├── client
    │   ├── angular.min.js
    │   ├── jquery-2.1.4.min.js
    │   └── plotly-latest.min.js
    └── server
        ├── data.csv
        └── server.py
```

And within the file `server.py`, paste the following code. 

```python
import bottle
app = bottle.Bottle()
bottle.run(app, host='localhost', port=8080)
```

I promised you 3 lines. There they are. You can shorten it to 2 by not including the second line, but that second line allows us significant advantages *which will not be apparent you you at this moment*. But don't be lazy. Put that one line in anyway. 

This is not supposed to be a bottle tutorial. You can go through many tutorials on YouTube to learn bottle. I shall only cover the absolute basics that is necessary for this tutorial. Remember though that I assume you have a passing familiarity with Python programming. What is the program doing?

 - The first line just imports the library. 
 - The second like creates a `Bottle` instance and we call it `app`. You can think of `Bottle` as the equivalent of a Class. And `app` is an instance if that class. 
- The third line executes the `run` method of the `Bottle` class. This creates a <font color='indianred'>listener</font>. This function waits for other programs to send it requests at the <font color='indianred'>IP address</font> `127.0.0.1` (or `localhost`)

Now open your terminal go to the server folder, and run the following command:

```bash
Sankha-desktop:server user$ python server.py
Bottle server starting up (using WSGIRefServer())...
Listening on http://localhost:8080/
Hit Ctrl-C to quit.
```
The server at this moment is <font color='indianred'> listening </font> for requests. We have not specified how it is going to <font color='indianred'> process </font> any requests sent to it. But we can test whether the server is listening to anything. Open your favorite web browser, and go to the address `http://localhost:8080/`. You should see something like this below:




```python
import bottle
import json
import pandas as pd 

app = bottle.Bottle()

@app.route('/')
def fn(): return 'Hello World!!'

@app.route('/data')
def fn1():
    temp = pd.read_csv('data.csv')
    data = {}
    for c in temp.columns: data[c] = list(temp[c])

    return json.dumps(data)

bottle.run(app)
```

There is only a single function of interest: `fn1()`, which is routed to `http://127.0.0.1:8080/data`. Here, `127.0.0.1` is the your `localhost` and `8080` is the port at which the connection is to be established. These are the default values. This reads the CSV file `data.scv` and returns a JSON string corresponding to that. Now if you point your browser to `http://127.0.0.1:8080/data`, you will see the JSON string which has been transferred over. 

It will look like the following ...

```html
{"y": [4.43 ... 797e-08], "x": [1.0, ... 100.0], "z": [841.0, ... 4900.0]}
```

Here, I have removed a lot of data and inserted `...` in their place.

And, thats it!

### The client

Now lets get on with our client. This is the interesting part. We shall create a client using `angular.js` and will later display it with `plotly.js`. 

### References:

#### Python libraries:

1. The [Bottle Web Framework][bottle].
3. The [Pandas][pandas] library.

#### Javascript libraries

1. A copy of the [angular**JS**] [angularJS] file may be downloaded from here.
2. A copy of plotly.js may be downloaded from here

#### Other misc. references


3. [The Bedroom Programmer][tutorial-aJS-directives]'s tutorial on AngularJS and custom directives proved to be invaluable ....


[tutorial-aJS-directives]: http://thebedroomprogrammer.blogspot.sg/2015/09/implementing-custom-directives-in.html
[angularJS]: https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.2/angular.min.js "Angular JS Link"
[bottle]: http://bottlepy.org/docs/dev/index.html
[bottleFile]:https://github.com/bottlepy/bottle/raw/master/bottle.py
[jquery]:https://jquery.com
[pandas]: http://pandas.pydata.org/index.html
[plotly]:https://plot.ly/javascript/getting-started/
