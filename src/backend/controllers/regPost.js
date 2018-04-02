import mongoose from 'mongoose';
import * as fs from 'fs';
import {cookie_config} from "./config";
import {User} from "../models/User";

export let regPostAction = (req, res) => {
    let randomNumber;
    let cookie = req.cookies[cookie_config.cookieName];
    if (cookie === undefined) {
        randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2,randomNumber.length);
        res.cookie(cookie_config.cookieName, randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    }
    else {
        console.log('cookie exists', cookie);
    }
    let myData = new User({
        _id : new mongoose.Types.ObjectId(),
        'userName': req.body['name'],
        'pass': req.body['password'],
        'user_cookie': randomNumber
    });
    myData.save((err, result) => {
        if (err) throw err;
        if (result) {
            let html = fs.readFileSync('src/backend/views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
    });
};