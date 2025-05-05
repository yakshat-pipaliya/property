var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { swaggerUi, specs } = require('./Swagger');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user')
var propertyRouter = require('./routes/property')
var property_analystRouter = require('./routes/property-analyst')
var adminRouter = require('./routes/admin')

var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MD_URL)
  .then(() => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log("connection failed:", error);
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/property', express.static('/var/www/html/property'));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/',userRouter)
app.use('/property',propertyRouter)
app.use('/analyst',property_analystRouter)
app.use('/admin',adminRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

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
