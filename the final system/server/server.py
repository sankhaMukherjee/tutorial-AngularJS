# http://bottlepy.org/docs/0.11/tutorial.html#tutorial-request

import bottle
from bottle import response
from numpy.random import normal

import json
import pandas as pd 

app = bottle.Bottle()

# the decorator
@app.hook('after_request')
def enable_cors():
    bottle.response.headers['Access-Control-Allow-Origin'] = '*'
    bottle.response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    bottle.response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


@app.route('/')
def fn(): return 'Hello World!!'

@app.route('/data')
def fn1():
    temp = pd.read_csv('data.csv')
    data = dict((c, map(float, list(temp[c]))  ) for c in temp.columns)
    return json.dumps(data)

@app.route('/dataEcho')
def fn1():
    print 'The query string is --> [%s]'%(bottle.request.query_string)
    print 'The decoded key-value pairs are: --> '
    dictVals = dict([ (k.split('=')[0], k.split('=')[1])  for k in bottle.request.query_string.split('&')])
    for k in dictVals:
        print '\t%s --> %s'%(k, dictVals[k]) 
    return '--'.join(([ ','.join([k, dictVals[k]])  for k in dictVals]))

@app.route('/dataMachine')
def simulatedMachineData():
    
    prevVals = {
        'machineID_1': 0,
        'machineID_2': 0,
        'machineID_3': 0,
    }

    devVals = {
        'machineID_1': 5.3,
        'machineID_2': 2.1,
        'machineID_3': 7.1,
    }    

    dictVals = dict([ (k.split('=')[0], k.split('=')[1])  for k in bottle.request.query_string.split('&')])
    machineID = dictVals.get('machine', '')

    if machineID not in devVals.keys(): return '-1'

    prevVals[machineID] += normal(scale=devVals[machineID])

    return str(prevVals[machineID])

bottle.run(app)