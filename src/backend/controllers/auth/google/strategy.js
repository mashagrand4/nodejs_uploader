import googleStrategy from 'passport-google-oauth20';
import config from './config';
import db from '../../../db/index';

const Strategy = googleStrategy.Strategy;

const strategy = new Strategy(
  {
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
  },
  ((accessToken, refreshToken, profile, done) => {
    const searchQuery = {
      userName: profile.displayName,
    };

    const updates = {
      userName: profile.displayName,
      someID: profile.id,
    };

    const options = {
      upsert: true,
    };

    db.collection('users').findOneAndUpdate(searchQuery, updates, options, (err, user) => {
      if (err) {
        return done(err);
      }

      return done(null, user);
    });
  }),
);

export default strategy;
