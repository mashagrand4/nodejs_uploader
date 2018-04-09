import 'module-alias/register';
import fp from 'find-free-port';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import handlebars from 'handlebars-engine';
import router from '@backend/router/routes';

const app = express();

app.engine('hbs', handlebars);
app.set('views', `${__dirname}@backend/views`);
app.set('view engine', 'hbs');

app.use(express.static(`${__dirname}/`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

fp(3000, (err, freePort) => {
  app.listen(freePort);
  console.log(`You can use http://localhost:${freePort}`);
});
