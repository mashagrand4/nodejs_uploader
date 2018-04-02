import * as fs from 'fs';
import {db} from "../db";
import {cookie_config} from "./config";

export let uploadAction = (req, res) => {
    db.collection('users').findOne({user_cookie: req.cookies[cookie_config.cookieName]}).then(result => {
        if(result){
            let html = fs.readFileSync('src/backend/views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        else{
            let html = fs.readFileSync('src/backend/views/login.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
    });
};
