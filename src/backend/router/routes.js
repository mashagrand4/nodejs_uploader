import passport from 'passport';
import express from 'express';
import loginAction from '@/controllers/login';
import logoutAction from '@/controllers/logout';
import logPostAction from '@/controllers/logPost';
import profileAction from '@/controllers/profile';
import registrationAction from '@/controllers/registration';
import regPostAction from '@/controllers/regPost';
import uploadAction from '@/controllers/upload';
import uploadPostAction from '@/controllers/uploadPost';

const router = express.Router();

router.get('/', loginAction);
router.get('/reg', registrationAction);
router.get('/log', loginAction);
router.get('/logout', logoutAction);
router.get('/upload', uploadAction);
router.get('/profile', profileAction);
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/log',
}));
router.post('/upload', uploadPostAction);
router.post('/reg', regPostAction);
router.post('/log', logPostAction);


export default router;
