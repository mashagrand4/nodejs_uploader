var express = require('express');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
// var hbs = require('handlebars');
var handlebars = require('handlebars-engine');

// Handlebars.registerHelper('for', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; i++)
//         accum += block.fn(i);
//     return accum;
// });

var app = express();

var Schema   =  mongoose.Schema;

var nameSchema = Schema({
    _id: Schema.Types.ObjectId,
    userName: String,
    pass: String,
    user_cookie : String,
    images : [{ type: Schema.Types.ObjectId, ref: 'Images' }]
});

var imagesSchema = Schema({
    userForImg : { type: Schema.Types.ObjectId, ref: 'User' },
    path    : String,
});

var Images = mongoose.model("Images", imagesSchema);

var User = mongoose.model("User", nameSchema);

mongoose.connect("mongodb://mary:mary666@ds253468.mlab.com:53468/mydb");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});


app.engine('hbs', handlebars);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'media')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var cookieName = 'user_cookie';

app.get('/', function(req, res){
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
});

app.get('/reg', function(req, res){
    db.collection('users').findOne({user_cookie: req.cookies[cookieName]}).then(result => {
        if(result){
            var html = fs.readFileSync('views/index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        else{
            html = fs.readFileSync('views/reg.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
    });
});

app.get('/log', function(req, res){
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
});

app.get('/logout', function(req, res){
    db.collection('users').findOne({user_cookie: req.cookies[cookieName]}).then(result => {
        if(result) {
            db.collection('users').update({user_cookie: req.cookies[cookieName]}, {$set: {[cookieName] : ''}});
        }
    });
    res.clearCookie(cookieName);
    var html = fs.readFileSync('views/login.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.get('/upload', function(req, res){
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
});

app.get('/profile', function(req, res){
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
});

app.post('/upload', function(req, res) {
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
});

app.post('/reg', function(req, res) {
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
});

app.post('/log', function(req, res) {
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
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);
