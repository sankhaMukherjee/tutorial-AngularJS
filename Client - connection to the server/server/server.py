import bottle
import json
import pandas as pd 

app = bottle.Bottle()

@app.hook('after_request')
def enable_cors():
    bottle.response.headers['Access-Control-Allow-Origin'] = '*'
    bottle.response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    bottle.response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
    

@app.route('/')
def fn():
    return 'Hello World!!'

@app.route('/data')
def fn1():
    temp = pd.read_csv('data.csv')
    data = {}
    for c in temp.columns:
        data[c] = list(temp[c])

    return json.dumps(data)


bottle.run(app)
