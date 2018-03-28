var db = require('../db/index');
const cookieName = require('./config').cookieName;

module.exports = function(req, res){
    db.collection('users').findOne({user_cookie: req.cookies[cookieName]}).then(result => {
        if(result){
            var html = fs.readFileSync('views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        else{
            html = fs.readFileSync('views/login.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}
});
}
