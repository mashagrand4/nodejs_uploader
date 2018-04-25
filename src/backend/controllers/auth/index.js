import passport from 'passport';
import db from '../../db';
import twitterStrategy from '@/controllers/auth/twitter/strategy';
import facebookStrategy from '@/controllers/auth/facebook/strategy';
import googleStrategy from '@/controllers/auth/google/strategy';
import localStrategy from '@/controllers/auth/local/strategy';

passport.use('twitter', twitterStrategy);
passport.use('facebook', facebookStrategy);
passport.use('google', googleStrategy);
passport.use('local', localStrategy);

passport.serializeUser((user, done) => {
  console.log(user.value.someID);
  done(null, user.value.someID);
});

passport.deserializeUser((id, done) => {
  db.collections('users').findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
