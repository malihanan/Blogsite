//package import
const express = require('express');
//const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

//local import
const { mongoose } = require('./db.js');  //used object destruction hence use mongoose instead of mongoose.mongoose
var userController = require('./controllers/userController.js');
var blogController = require('./controllers/blogController.js');
var userInputController = require('./controllers/userInputController.js');

var app = express();    //to work with express package
app.use(bodyParser.json()); //to send json data to node.js project
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({origin: ['http://localhost:4200']}));

app.listen(3000, () => console.log('Server started at port: 3000'));    //to start the express server

app.post("/sendmail", (req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            type: "login",
            user: "blogsitea42@gmail.com",
            pass: "blog#admin999"
        }
    })

    let mailOptions = {
        from: '"BlogSite Admin <blogsitea42@gmail.com>"',
        to: req.body.emailId,
        subject: "Registration on BlogSite",
        text: "Hey, You have successfully registered to BlogSite. Welcome!!!"
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info.response)
            window.alert("Email sent.")
        }
    })
});

app.use('/blogs', blogController);
app.use('/userInputs', userInputController);
app.use('/users', userController);   //setting the url