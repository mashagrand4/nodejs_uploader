const mongoose = require('mongoose');
const config = require('./config');

module.exports = mongoose.connect(`mongodb://mary:mary666@ds253468.mlab.com:53468/mydb`);