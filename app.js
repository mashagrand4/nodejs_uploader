const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const handlebars = require('handlebars-engine');
const router = require('./src/backend/router/routes');

const app = express();

app.engine('hbs', handlebars);
app.set('views', __dirname + 'src/backend/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '../../src/backend/frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);