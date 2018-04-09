import express from 'express';
import loginAction from '@backend/controllers/login';
import logoutAction from '@backend/controllers/logout';
import logPostAction from '@backend/controllers/logPost';
import profileAction from '@backend/controllers/profile';
import registrationAction from '@backend/controllers/registration';
import regPostAction from '@backend/controllers/regPost';
import uploadAction from '@backend/controllers/upload';
import uploadPostAction from '@backend/controllers/uploadPost';

const router = express.Router();

router.get('/', loginAction);
router.get('/reg', registrationAction);
router.get('/log', loginAction);
router.get('/logout', logoutAction);
router.get('/upload', uploadAction);
router.get('/profile', profileAction);
router.post('/upload', uploadPostAction);
router.post('/reg', regPostAction);
router.post('/log', logPostAction);

export default router;
