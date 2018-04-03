import * as fs from 'fs';
import db from '../db';
import cookieConfig from './config';

export default (req, res) => {
  db.collection('users').findOne({ user_cookie: req.cookies[cookieConfig.cookieName] }).then((result) => {
    if (result) {
      const html = fs.readFileSync('dist/assets/index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      const html = fs.readFileSync('dist/assets/login.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });
};
