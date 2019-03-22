var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var connection = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'1234',
  database:'nodeserver'
});

connection.connect();
var sql = 'SELECT * FROM website';
connection.query(sql, function (err,result){
  if(err){
    console.log('[SELECT ERROR]:', err.message);
  }
  console.log(result)
});
app.get('/',function(req,res){
  res.send('Hello, nodeserver')
});

connection.end();

module.exports = app;
