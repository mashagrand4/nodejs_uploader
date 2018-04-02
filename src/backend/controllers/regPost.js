import mongoose from 'mongoose';
import * as fs from 'fs';
import { cookieConfig } from './config';
import { User } from '../models/User';

export default (req, res) => {
  let randomNumber;
  const cookie = req.cookies[cookieConfig.cookieName];
  if (cookie === undefined) {
    randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie(cookieConfig.cookieName, randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    console.log('cookie exists', cookie);
  }
  const myData = new User({
    _id: new mongoose.Types.ObjectId(),
    userName: req.body.name,
    pass: req.body.password,
    user_cookie: randomNumber,
  });
  myData.save((err, result) => {
    if (err) throw err;
    if (result) {
      const html = fs.readFileSync('src/backend/views/index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });
};
