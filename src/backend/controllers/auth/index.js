import passport from 'passport';
import twitterStrategy from '@/controllers/auth/twitter/strategy';
import facebookStrategy from '@/controllers/auth/facebook/strategy';
import googleStrategy from '@/controllers/auth/google/strategy';

passport.use('twitter', twitterStrategy);
passport.use('facebook', facebookStrategy);
passport.use('google', googleStrategy);

export default passport;
