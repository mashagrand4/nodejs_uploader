const fs = require('fs');
const formidable = require('formidable');
const User = require('../models/User');
const Images = require('../models/Images/index');
const cookieName = require('./config').cookieName;

module.exports = (req, res) => {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        console.log(files);
        let userTable = User.findOne({user_cookie: req.cookies[cookieName]});
        if(files.sampleFile.length > 1) {
            for(let i = 0; i < files.sampleFile.length; i++){
                let newpath = __dirname + '../../../../' + files.sampleFile[i].name;
                let name = files.sampleFile[i].name;
                let old = files.sampleFile[i].path;
                fs.rename(old, newpath, (err) => {
                    if (err) throw err;
                    userTable.exec( (err, user) =>  {
                        let image = new Images({path: name});
                        image.save( (err) =>{
                            user.images.push(image);
                            user.save( (err) => {});
                        });
                    });
                });
            }
        }
        else {
            let newpath = __dirname + '../../../../' + files.files.name;
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
    let html = fs.readFileSync('src/backend/views/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
};