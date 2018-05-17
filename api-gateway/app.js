var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//api-catalog req
var apiCatalog = require('./routes/api-catalog');

//added mongoose
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//database connection
mongoose.connect('mongodb://admin:admin@ds225840.mlab.com:25840/api-gateway', {
  promiseLibrary: require('bluebird')
  }).then(()=>console.log('connection successful'))
  .catch((err)=>console.error(err));

var indexRouter = require('./routes/index');

//var users = require('./routes/users');
//commented out users var

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//altered users references
app.use('/', indexRouter);

//Register the API Catalog’s routes
app.use('/api', apiCatalog);

//app.use('/users', users);
//commented out above app.use

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
