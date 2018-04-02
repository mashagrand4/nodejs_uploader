import * as fs from 'fs';
import { db } from '../db';
import { cookieConfig } from './config';

export default (req, res) => {
  db.collection('users').findOne({ user_cookie: req.cookies[cookieConfig.cookieName] }).then((result) => {
    if (result) {
      db.collection('users').update({ user_cookie: req.cookies[cookieConfig.cookieName] }, { $set: { [cookieConfig.cookieName]: '' } });
    }
  });
  res.clearCookie(cookieConfig.cookieName);
  const html = fs.readFileSync('src/backend/views/login.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};
