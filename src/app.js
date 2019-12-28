const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

// load configuration data from the .env file
require('dotenv').config({
  path: path.join(__dirname, 'src/.env'),
});

const indexRouter = require('./routes/index');
const recordRouter = require('./routes/record');
const accountRouter = require('./routes/account');
const leaveRouter = require('./routes/leave');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('../web/public'));
app.use('/', indexRouter);
app.use('/record', recordRouter);
app.use('/account', accountRouter);
app.use('/absence', leaveRouter);

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
