const mongoose = require("mongoose");
const schema =  require('../schema');

var User = mongoose.model("User", schema);