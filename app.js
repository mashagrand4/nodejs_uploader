import 'module-alias/register';
import fp from 'find-free-port';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import handlebars from 'handlebars-engine';
import router from '@/router/routes';
import process from 'process';
import path from 'path';
import passport from 'passport';
import strategy from 'passport-facebook';

const Strategy = strategy.Strategy;

const app = express();

app.engine('hbs', handlebars);
app.set('views', path.resolve(__dirname, 'src', 'backend', 'views'));
app.set('view engine', 'hbs');

passport.use(new Strategy(
  {
    clientID: 439281709870263,
    clientSecret: '62a76886cb21f947516c21cbd635c620',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  ((accessToken, refreshToken, profile, cb) => cb(null, profile)),
));

app.use(express.static(`${__dirname}/`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

fp(process.env.PORT || 3000, (err, freePort) => {
  app.listen(freePort);
  console.log(`You can use http://localhost:${freePort}`);
});
