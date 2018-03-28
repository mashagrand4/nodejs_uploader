var db = require('../db/index');
const cookieName = require('./config').cookieName;

module.exports = function(req, res) {
    db.collection('users').findOne({ userName: req.body['name']},(err, rez) =>{
        if(rez){
            var randomNumber = Math.random().toString();
            randomNumber = randomNumber.substring(2,randomNumber.length);
            res.cookie(cookieName, randomNumber, { maxAge: 900000, httpOnly: true });
            db.collection('users').update({userName: req.body['name']}, {$set: {[cookieName] : randomNumber}});
            var html = fs.readFileSync('views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        else {
            html = fs.readFileSync('views/login.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}
});
}
