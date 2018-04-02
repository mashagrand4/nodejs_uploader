import express from'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import handlebars from 'handlebars-engine';
import {router} from "./src/backend/router/routes";

const app = express();

app.engine('hbs', handlebars);
app.set('views', __dirname + '/src/backend/views');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/src/frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

let port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);