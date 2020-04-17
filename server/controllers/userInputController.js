const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;  //import to check if id is available in table

var { UserInput } = require('./../models/userInput.js');

router.get('', (req, res) => {
    UserInput.find({}, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving blogs: " + JSON.stringify(err, undefined, 2)); }
    }).sort({"date": -1});
});
/*
router.get('/:id', (req, res) => {
    Blog.find({'user_id': req.params.id}, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving blogs: " + JSON.stringify(err, undefined, 2)); }
    }).sort({"date": -1});
});    //get all blogs from Blog table
*/
router.post('', (req, res) => {
    var userInput = new UserInput({
        fullName: req.body.fullName,
        emailId: req.body.emailId,
        comment: req.body.comment,
        date: new Date()
    });
    userInput.save((err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error adding comment: " + JSON.stringify(err, undefined, 2)); }
    });
});     

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))    
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    userInput.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error deleting comment: " + JSON.stringify(err, undefined, 2)); }
    });
});   

module.exports = router;