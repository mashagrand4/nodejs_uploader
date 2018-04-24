import passport from 'passport';
import twitterStrategy from 'passport-twitter';
import init from '../init';
import config from '../authConfig';
import db from '../../../db/index';

const Strategytw = twitterStrategy.Strategy;

passport.use(new Strategytw(
  {
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL,
  },
  ((accessToken, refreshToken, profile, done) => {
    const searchQuery = {
      name: profile.displayName,
    };

    const updates = {
      name: profile.displayName,
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
));

init();

export default passport;
