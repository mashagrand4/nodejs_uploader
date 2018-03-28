const mongoose = require("mongoose");
const schema =  require('./schema');

var Images = mongoose.model("Images", schema);

module.exports = Images;