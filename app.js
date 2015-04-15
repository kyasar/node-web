var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

// Session
var session = require('client-sessions');

/* Router Objects */
var index = require('./routes/index');
var about = require('./routes/about');
var subscribe = require('./routes/subscribe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use() -> settings for Express
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 10 * 1000,
  activeDuration: 20 * 1000,
}));

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

// if this request comes, go to this Router Object
// Middleware methods - order is important
app.use('/', index);
app.use('/index', index);
app.use('/index.html', index);
app.use('/about', about);
app.use('/subscribe', subscribe);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
