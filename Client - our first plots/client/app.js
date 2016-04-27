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