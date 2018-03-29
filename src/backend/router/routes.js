const express = require('express');
const router = express.Router();

const loginAction = require('../controllers/login');
const registrationAction = require('../controllers/registration');
const logoutAction = require('../controllers/logout');
const uploadAction = require('../controllers/upload');
const profileAction = require('../controllers/profile');
const uploadPostAction = require('../controllers/uploadPost');
const regPostAction = require('../controllers/regPost');
const logPostAction = require('../controllers/logPost');

router.get('/', loginAction);
router.get('/reg', registrationAction);
router.get('/log', loginAction);
router.get('/logout', logoutAction);
router.get('/upload', uploadAction);
router.get('/profile', profileAction);
router.post('/upload', uploadPostAction);
router.post('/reg', regPostAction);
router.post('/log', logPostAction);

module.exports = router;