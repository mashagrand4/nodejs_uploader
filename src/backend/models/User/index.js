const mongoose = require("mongoose");
const schema =  require('./schema');

let User = mongoose.model("User", schema);

module.exports = User;