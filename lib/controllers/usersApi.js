'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    mailer = require('../mailer/models')

/**
 * Create user
 */
exports.create = function (req, res, next) {
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save(function(err) {
    if (err) return res.json(400, err);
      mailer.sendRegistrationMail(req.body, function (err, succsess ){ 
        console.log(err);
        console.log(succsess);
        });
      return res.json(200);
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};


/**
 *  Get profiles of all users
 */
exports.remove = function (req, res) {
  console.log(req);
  User.findByIdAndRemove(req.params.id, function (err, users) {
    if (err) return next(err);
    res.send(users);
  });
};

/**
 *  Get profiles of all users
 */
exports.all = function (req, res) {
  User.find( function (err, users) {
    if (err) return next(err);
    res.send(users);
  });
};

/**
 *  Reset password
 */
exports.resetPassword = function (req, res) {
  console.log(req);
  var user = req.body
  User.findById(user._id, function (err, user) {
    if(err) return res.send(400);
    user.password = Math.random().toString(36).substr(2, 8);
    user.save(function(err) {
      if(err) return res.send(400);
      mailer.sendResetPasswordMail(user, function (err, succsess ){ 
        if(err) return res.send(400);
        res.send(200);
      });
    });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.update = function(req, res, next) {
  console.log(req);
  var userId = req.user._id;
  User.findByIdAndUpdate(userId, { $set: { name: req.body.name , phone: req.body.phone, admin: req.body.admin  , email: req.body.email}}, function (err, user) {
    console.log(user);
    if (err) return res.send(400);
    res.send(user);
  });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};