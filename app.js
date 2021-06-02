require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
require('express-async-errors');

var errorHandler = require('./middlewares/errorHandler');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesApiRouter = require('./routes/api/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// database connection (problematic)
mongoose.connect(
  `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_HOSTS}/${process.env.MONGODB_DATABASE}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/articles', articlesApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
