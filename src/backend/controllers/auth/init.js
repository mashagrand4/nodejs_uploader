import passport from 'passport';
import db from '../../db';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.collection('users').findById(id, (err, user) => {
      done(err, user);
    });
  });
};
