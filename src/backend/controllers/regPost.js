var db = require('../db/index');
const cookieName = require('./config').cookieName;

module.exports = function(req, res) {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2,randomNumber.length);
        res.cookie(cookieName, randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    }
    else {
        console.log('cookie exists', cookie);
    }
    var myData = new User({
        _id : new mongoose.Types.ObjectId(),
        'userName': req.body['name'],
        'pass': req.body['password'],
        'user_cookie': randomNumber
    });
    myData.save(function (err, result) {
        if (err) throw err;
        if (result) {
            var html = fs.readFileSync('views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
    });
};