const mongoose = require('mongoose');

var Blog = mongoose.model('Blog', {
    user_id: {type: String},
    title: {type: String},
    content: {type: String},
    tags: {type: Array},
    likes: {type: Array},
    comments: {type: Object},
    date: {type: Date}
});

module.exports = { Blog };