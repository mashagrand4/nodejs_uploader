const formidable = require('formidable');
const User = require('../models/User/index');
const Images = require('../models/Images/index');
const cookieName = require('./config').cookieName;

module.exports = (req, res) => {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        let userTable = User.findOne({user_cookie: req.cookies[cookieName]});
        if(files.files.length > 1) {
            for(let i = 0; i < files.files.length; i++){
                console.log(__dirname);
                let newpath = __dirname + '/media/' + files.files[i].name;
                let name = files.files[i].name;
                let old = files.files[i].path;
                fs.rename(old, newpath, (err) => {
                    if (err) throw err;
                    userTable.exec( (err, user) => {
                        let image = new Images({path: name});
                        image.save( (err) => {
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
            fs.rename(old, newpath,  (err) => {
                if (err) throw err;
                userTable.exec( (err, user) => {
                    let image = new Images({path: name});
                    image.save( (err) => {
                        user.images.push(image);
                        user.save();
                    });
                });
            });
        }
    });
    let html = fs.readFileSync('views/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
};