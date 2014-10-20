'use strict';

var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    Customer = mongoose.model('Customer');

/**
 * Get awesome comments
 */

exports.add = function(req, res) { 
    var customerId = req.body.customerId;
    var comment = req.body.comment;
    var newComment = new Comment(comment);
    newComment.save(function (err, comment){
        if (err) return res.json(400, err);
        Customer.findByIdAndUpdate( customerId,{$push: {comments: comment._id}},{safe: true, upsert: true}, function(err, customer) {
        });
    return res.send(comment);
    });
};
