var formidable = require('formidable');

var User = require('../models/User/index');
var Images = require('../models/Images/index');
const cookieName = require('./config').cookieName;

module.exports = function(req, res) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        var userTable = User.findOne({user_cookie: req.cookies[cookieName]});
        if(files.files.length > 1) {
            for(var i = 0; i < files.files.length; i++){
                console.log(__dirname);
                let newpath = __dirname + '/media/' + files.files[i].name;
                let name = files.files[i].name;
                let old = files.files[i].path;
                fs.rename(old, newpath, function (err) {
                    if (err) throw err;
                    userTable.exec(function (err, user)  {
                        var image = new Images({path: name});
                        image.save(function (err) {
                            user.images.push(image);
                            user.save(function (err) {});
                        });
                    });
                });
            }
        }
        else {
            let newpath = __dirname + '/media/' + files.files.name;
            let name = files.files.name;
            let old = files.files.path;
            fs.rename(old, newpath, function (err) {
                if (err) throw err;
                userTable.exec(function (err, user)  {
                    var image = new Images({path: name});
                    image.save(function (err) {
                        user.images.push(image);
                        user.save(function (err) {});
                    });
                });
            });
        }
    });
    var html = fs.readFileSync('views/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
};