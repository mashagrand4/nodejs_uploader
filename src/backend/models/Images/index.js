const mongoose = require("mongoose");
const schema =  require('./schema');

let Images = mongoose.model("Images", schema);

module.exports = Images;