import bottle
app = bottle.Bottle()

@app.route('/')
def fn():
    return 'Hello World!!'

bottle.run(app, host='localhost', port=8080)

