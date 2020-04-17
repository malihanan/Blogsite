const mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var UserDetail = new Schema({
    fullName: {type: String},
    emailId: {type: String},
    comment: {type: String},
    date: {type: Date}
});

var UserInput = mongoose.model('UserInput', UserDetail);

module.exports = { UserInput };