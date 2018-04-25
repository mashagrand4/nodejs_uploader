import localStrategy from 'passport-local';
import db from '../../../db/index';

const Strategy = localStrategy.Strategy;

const strategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => {
  db.collection('users').findOne({ userName: username }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (!user.verifyPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  });
});

export default strategy;
