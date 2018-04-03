import * as fs from 'fs';
import db from '../db';
import cookieConfig from './config';
import User from '../models/User';

export default (req, res) => {
  db.collection('users').findOne({ user_cookie: req.cookies[cookieConfig.cookieName] }).then((result) => {
    if (result) {
      User.findOne({ user_cookie: req.cookies[cookieConfig.cookieName] }).populate('images').exec((err, images) => {
        if (images) {
          const imagePaths = [];
          images.images.forEach((elem) => {
            imagePaths.push(elem.path);
          });
          res.render('profile', { paths: imagePaths });
        } else {
          res.render('profile', { message: 'NO IMG' });
        }
      });
    } else {
      const html = fs.readFileSync('src/backend/views/login.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });
};
