const db = require('../db/index');
const cookieName = require('./config').cookieName;

module.exports = function(req, res){
    db.collection('users').findOne({user_cookie: req.cookies[cookieName]}).then(result => {
        if(result) {
            db.collection('users').update({user_cookie: req.cookies[cookieName]}, {$set: {[cookieName] : ''}});
        }
    });
    res.clearCookie(cookieName);
    let html = fs.readFileSync('views/login.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
};