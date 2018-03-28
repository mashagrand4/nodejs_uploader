var express = require('express');
var router = express.Router();

const loginAction = require('../controllers/login');
const registrationAction = require('../controllers/registration');
const logoutAction = require('../controllers/logout');
const uploadAction = require('../controllers/upload');
const profileAction = require('../controllers/profile');
const uploadPostAction = require('../controllers/uploadPost');
const regdPostAction = require('../controllers/regPost');
const logPostAction = require('../controllers/logPost');

router.get('/', loginAction);
router.get('/reg', registrationAction);
router.get('/log', loginAction);
router.get('/logout', logoutAction);
router.get('/upload', uploadAction);
router.get('/profile', profileAction);
router.post('/upload', uploadPostAction);
router.post('/reg', regdPostAction);
router.post('/log', logPostAction);

module.exports = router;