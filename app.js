// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var catalog = require('./routes/catalog'); 


var app = express();

//set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://librarytest:librarytest_1@ds117681.mlab.com:17681/local_library_sample';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
// for practical purposes, a connection is a DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware https://expressjs.com/en/api.html
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/catalog', catalog); // Add catalog routes to middleware chain

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error ('Not found');
	err.status = 404;
  	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
