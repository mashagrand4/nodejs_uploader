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
