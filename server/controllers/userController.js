const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;  //import to check if id is available in table

var { User } = require('./../models/user.js');

router.post('/login', async (req, res) => {
    const { emailId, password } = req.body
    console.log(req.body)
    try {
      const result = await User.findOne({emailId, password})
      if(!result){
        res.json({
          success: false,
          message: "Incorrect Details"
        })
      } else {
        res.json({
          success: true,
          id: result._id
        })
        console.log("Logging "+ emailId +" in")
      }
    } catch(err) {
      console.log(err);
    }
})
router.get('/:id', async(req, res) => {
    if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    User.findById(req.params.id, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving user: " + JSON.stringify(err, undefined, 2)); }
    });
})
router.post('/register', async (req, res) => {
  const {fullName, emailId, password, websiteName, contact} = req.body
  const existingUser = await User.findOne({'emailId': emailId})
  if(existingUser){
    res.json({
      success: false,
      message: "Email already in use"
    })
    return 
  }

  const existingSite = await User.findOne({'websiteName': websiteName})
  if(existingSite){
    res.json({
      success: false,
      message: "Website name already in use"
    })
    return 
  }
  
  const user = new User({
    emailId, 
    password,
    fullName, 
    websiteName,
    contact
  })
  console.log("User object:")
  console.log(user)
  try {
    const result = await user.save()
    console.log("Result after saving:")
    console.log(result)
    res.json({
      success: true,
      message: "Welcome!",
      user_id: result._id
    })
  } catch(err) {
      res.status(400).send("unable to save to database");
  }
})

router.post('/findWebsite', async(req, res) => {
  User.findOne( { websiteName: req.body.websiteName }, (err, docs) => {
      if(!err) { res.send(docs); }
      else { console.log("Error retrieving user: " + JSON.stringify(err, undefined, 2)); }
  });
})

router.put('/:id', async (req, res) => {
  if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
      return res.status(400).send(`No record with given id: ${ req.params.id }`)
      
  const existingSite = await User.findOne({'websiteName': req.body.websiteName})
  if(existingSite){
    res.json({
      success: false,
      message: "Website name already in use"
    })
    return 
  }
  
  var user = {
      password: req.body.password,
      fullName: req.body.fullName,
      websiteName: req.body.websiteName,
      contact: req.body.contact
  };

  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, docs) => {   //new says if we want updated or old value of user
      if(!err) { res.json({success: true, message: "Updated successfully.", user_id: docs.id}); }
      else { 
        res.json({success: true, message: "Error updating."});
        console.log("Error updating user: " + JSON.stringify(err, undefined, 2)); 
      }
  });
});

/*
// localhost:3000/users/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving users: " + JSON.stringify(err, undefined, 2)); }
    });
});    //get all users from User table

// localhost:3000/users/
router.post('/', (req, res) => {
    var user = new User({
        emailId: req.body.emailId,
        password: req.body.password,
        fullName: req.body.fullName,
        websiteName: req.body.websiteName,
        blocked: req.body.blocked
    });
    user.save((err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error adding user: " + JSON.stringify(err, undefined, 2)); }
    });
});     //add new user using post

// localhost:3000/users/{id}
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    User.findById(req.params.id, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving user: " + JSON.stringify(err, undefined, 2)); }
    });
});    //get particular user from User table

// localhost:3000/users/{id}
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    
    var user = {
        emailId: req.body.emailId,
        password: req.body.password,
        fullName: req.body.fullName,
        websiteName: req.body.websiteName,
        blocked: req.body.blocked
    };

    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, docs) => {   //new says if we want updated or old value of user
        if(!err) { res.send(docs); }
        else { console.log("Error updating user: " + JSON.stringify(err, undefined, 2)); }
    });
});    //update particular user in User table

// localhost:3000/users/{id}
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    User.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error deleting user: " + JSON.stringify(err, undefined, 2)); }
    });
});    //delete particular user from User table
*/
module.exports = router;