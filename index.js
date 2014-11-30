var express = require('express');
var ejs = require('ejs');
var logger = require('morgan');
var bodyparser = require('body-parser');
var request = require('request');
var path = require('path');

var app = express();
app.listen(3000, function() {
    console.log('> Server listening at localhost:3000');
});

app.set('views', path.join(__dirname, 'templates'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', function(request, response) {
    response.render('index');
});

app.post('/', function(req, res) {
    var text = encodeURIComponent(req.body.text);
    // var key = '803e8edf-ee14-4d56-b1d4-c3c94dd80a4a';
    var key = '6d5a32e7-6338-448c-a5fe-5e5e6fdbdf86';
    var url = 'http://sandbox.api.simsimi.com/request.p?key=' + key + '&lc=en&text=' + text;
    request(url).pipe(res);
});