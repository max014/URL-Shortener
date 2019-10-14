const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var urlRouter = require('./routes/url');

var app = express();

// connect to Mongo daemon
mongoose
  .connect(
    `mongodb://192.168.2.51:60000/express_url_shortener`, // connect to mongos router
    { 
      useNewUrlParser: true,
      mongos: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/url', urlRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message,
      status: error.status
    }
  })
});

module.exports = app;
