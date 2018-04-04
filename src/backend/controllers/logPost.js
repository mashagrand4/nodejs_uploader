import * as fs from 'fs';
import db from '../db';
import cookieConfig from './config';

export default (req, res) => {
  db.collection('users').findOne({ userName: req.body.name }, (err, rez) => {
    if (rez) {
      let randomNumber = Math.random().toString();
      randomNumber = randomNumber.substring(2, randomNumber.length);
      res.cookie(cookieConfig.cookieName, randomNumber, { maxAge: 900000, httpOnly: true });
      db.collection('users').update({ userName: req.body.name }, { $set: { [cookieConfig.cookieName]: randomNumber } });
      const html = fs.readFileSync('dist/index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      const html = fs.readFileSync('dist/login.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });
};
