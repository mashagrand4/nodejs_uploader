const mongoose = require("mongoose");
const Schema   =  mongoose.Schema;

module.exports =  Schema({
    userForImg : { type: Schema.Types.ObjectId, ref: 'User' },
    path : String
});