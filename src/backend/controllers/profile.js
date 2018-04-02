import * as fs from 'fs';
import {db} from "../db";
import {cookie_config} from "./config";
import {User} from "../models/User";

export let profileAction = (req, res) => {
    db.collection('users').findOne({user_cookie: req.cookies[cookie_config.cookieName]}).then(result => {
        if (result) {
            User.findOne({user_cookie: req.cookies[cookie_config.cookieName]}).populate('images').exec( (err, images) =>{
                if (images) {
                    let imagePaths = [];
                    images.images.forEach( (elem) =>  {
                        imagePaths.push(elem.path);
                    });
                    res.render('profile', {paths: imagePaths});
                } else {
                    res.render('profile', {message: 'NO IMG'});
                }
            });
        }
        else {
            let html = fs.readFileSync('src/backend/views/login.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
    });
};