const mongoose = require('mongoose');
//creating a connection to db created
mongoose.connect('mongodb://localhost:27017/BlogsiteDB', (err) => {
    //checking for error
    if(!err)
        console.log('MongoDB connected successfully.');
    else
        console.log('Error in DB Connection: ' + JSON.stringify(err, undefined, 2)) //to json (all properties) with 2 space for indentation
});

module.exports = mongoose;