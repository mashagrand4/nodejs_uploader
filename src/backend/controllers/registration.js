const fs = require('fs')
const db = require('../db/index');
const cookieName = require('./config').cookieName;

module.exports = (req, res) => {
    db.collection('users').findOne({user_cookie: req.cookies[cookieName]}).then(function (result) {
        if(result) {
            let html = fs.readFileSync('src/backend/views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        else{
            let html = fs.readFileSync('src/backend/views/reg.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
    });
};