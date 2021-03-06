var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

var title = 'EJS template with Node.JS';
var data = 'Data from node';

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', home.main_page);
app.post('/afterSignUp', home.afterSignUp);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
