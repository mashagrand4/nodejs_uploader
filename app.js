const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var handlebars = require('handlebars-engine');
var router = require('./src/backend/router/routes');

var app = express();

app.engine('hbs', handlebars);
app.set('views', __dirname + 'src/backend/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '../../src/backend/frontend')));
app.use(express.static(path.join(__dirname, 'media')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);