import * as fs from 'fs';
import {db} from "../db";
import {cookie_config} from "./config";

export let logoutAction = (req, res) => {
    db.collection('users').findOne({user_cookie: req.cookies[cookie_config.cookieName]}).then(result => {
        if(result) {
            db.collection('users').update({user_cookie: req.cookies[cookie_config.cookieName]}, {$set: {[cookie_config.cookieName] : ''}});
        }
    });
    res.clearCookie(cookie_config.cookieName);
    let html = fs.readFileSync('src/backend/views/login.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
};