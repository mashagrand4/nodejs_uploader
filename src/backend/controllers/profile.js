var db = require('../db/index');
const cookieName = require('./config').cookieName;

module.exports = function(req, res){
    db.collection('users').findOne({user_cookie: req.cookies[cookieName]}).then(result => {
        if (result) {
            User.findOne({user_cookie: req.cookies[cookieName]}).populate('images').exec(function (err, images) {
                if (images) {
                    var imagePaths = [];
                    images.images.forEach(function (elem) {
                        imagePaths.push(elem.path);
                    });
                    console.log(imagePaths);
                    res.render('profile', {paths: imagePaths});
                } else {
                    res.render('profile', {message: 'NO IMG'});
                }
            });
        }
        else {
            html = fs.readFileSync('views/login.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}
});
}