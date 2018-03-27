var express = require('express');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var handlebars = require('handlebars-engine');

var app = express();

var router = require('./src/routs/routers')(express, app);

app.engine('hbs', handlebars);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'media')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);