const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;  //import to check if id is available in table

var { Blog } = require('./../models/blog.js');

// localhost:3000/blogs/
router.get('', (req, res) => {
    Blog.find({}, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving blogs: " + JSON.stringify(err, undefined, 2)); }
    }).sort({"date": -1});
});

router.get('/:id', (req, res) => {
    Blog.find({'user_id': req.params.id}, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving blogs: " + JSON.stringify(err, undefined, 2)); }
    }).sort({"date": -1});
});    //get all blogs from Blog table

// localhost:3000/blogs/
router.post('/:id', (req, res) => {
    var blog = new Blog({
        user_id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        date: new Date()
    });
    blog.save((err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error adding blog: " + JSON.stringify(err, undefined, 2)); }
    });
});     //add new blog using post

// localhost:3000/blogs/{id}
router.get('/blog/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    Blog.findById(req.params.id, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error retrieving blog: " + JSON.stringify(err, undefined, 2)); }
    });
});    //get particular blog from Blog table

// localhost:3000/blogs/{id}
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    
    var blog = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    };

    Blog.findByIdAndUpdate(req.params.id, { $set: blog }, { new: true }, (err, docs) => {   //new says if we want updated or old value of blog
        if(!err) { res.send(docs); }
        else { console.log("Error updating blog: " + JSON.stringify(err, undefined, 2)); }
    });
});    //update particular blog in Blog table

// localhost:3000/blogs/{id}
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.id }`)
    Blog.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log("Error deleting blog: " + JSON.stringify(err, undefined, 2)); }
    });
});    //delete particular blog from Blog table

router.put('/addLike/:blog_id', (req, res) => {
    if(!ObjectId.isValid(req.params.blog_id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.blog_id }`)

    Blog.findByIdAndUpdate(req.params.blog_id, { $push: { likes: req.body.user_id} }, { new: true }, (err, docs) => {   //new says if we want updated or old value of blog
        if(!err) { res.send(docs); }
        else { console.log("Error updating blog: " + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/addComment/:blog_id', (req, res) => {
    if(!ObjectId.isValid(req.params.blog_id))    //checkif correct id is passed
        return res.status(400).send(`No record with given id: ${ req.params.blog_id }`)

    let comment = {
        user_id: req.body.user_id, 
        content: req.body.content, 
        date: new Date()
    }
    Blog.findByIdAndUpdate(req.params.blog_id, { $push: { comments: comment } }, { new: true }, (err, docs) => {   //new says if we want updated or old value of blog
        if(!err) { res.send(docs); }
        else { console.log("Error updating blog: " + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;