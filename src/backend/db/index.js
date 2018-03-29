const mongoose = require('mongoose');
const userData = require('./config');

mongoose.connect(`mongodb://${userData.username}:${userData.password}@ds253468.mlab.com:53468/mydb`);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});

module.exports = db;