const db = require('../db/index');
const cookieName = require('./config').cookieName;
const fs = require('fs');

module.exports = (req, res) => {
    db.collection('users').findOne({ userName: req.body['name']},(err, rez) =>{
        if(rez) {
            let randomNumber = Math.random().toString();
            randomNumber = randomNumber.substring(2,randomNumber.length);
            res.cookie(cookieName, randomNumber, { maxAge: 900000, httpOnly: true });
            db.collection('users').update({userName: req.body['name']}, {$set: {[cookieName] : randomNumber}});
            let html = fs.readFileSync('src/backend/views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        else {
            let html = fs.readFileSync('src/backend/views/login.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
    });
};
