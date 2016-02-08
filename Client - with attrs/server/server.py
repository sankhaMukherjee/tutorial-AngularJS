import bottle
import json
import pandas as pd 

app = bottle.Bottle()

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
