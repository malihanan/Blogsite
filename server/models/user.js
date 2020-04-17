const mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var UserDetail = new Schema({
    emailId: {type: String},
    password: {type: String},
    fullName: {type: String},
    websiteName: {type: String},
    contact: {type: Number},
    blocked: {type: Boolean, default: false}
});

var User = mongoose.model('User', UserDetail);

module.exports = { User };