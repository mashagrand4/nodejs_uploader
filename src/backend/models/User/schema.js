const mongoose = require("mongoose");
const Schema   =  mongoose.Schema;

module.exports =  Schema({
    _id: Schema.Types.ObjectId,
    userName: String,
    pass: String,
    user_cookie : String,
    images : [{ type: Schema.Types.ObjectId, ref: 'Images' }]
});
