const fs = require('fs');
const db = require('../db/index');
const cookieName = require('./config').cookieName;
const User = require('../models/User/index');

module.exports = (req, res) => {
    db.collection('users').findOne({user_cookie: req.cookies[cookieName]}).then(result => {
        if (result) {
            User.findOne({user_cookie: req.cookies[cookieName]}).populate('images').exec( (err, images) =>{
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