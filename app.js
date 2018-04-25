import 'module-alias/register';
import fp from 'find-free-port';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import handlebars from 'handlebars-engine';
import router from '@/router/routes';
import process from 'process';
import path from 'path';
import passport from '@/controllers/auth';
import session from 'express-session';

const app = express();

app.engine('hbs', handlebars);
app.set('views', path.resolve(__dirname, 'src', 'backend', 'views'));
app.set('view engine', 'hbs');

app.use(express.static(`${__dirname}/`));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'sdfghjkl',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

fp(process.env.PORT || 3000, (err, freePort) => {
  app.listen(freePort);
  console.log(`You can use http://localhost:${freePort}`);
});
