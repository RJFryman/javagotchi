'use strict';

var User = require('../models/user');
var Pet = require('../models/pet');
var Activity = require('../models/activity');

exports.fresh = function(req, res){
  res.render('users/fresh', {title: 'Register User'});
};

exports.create = function(req, res){
  var user = new User(req.body);
  user.register(function(){
    if(user._id){
      res.redirect('/');
    }else{
      res.render('users/fresh', {title: 'Register User'});
    }
  });
};

exports.login = function(req, res){
  res.render('users/login', {title: 'Login User'});
};

exports.authenticate = function(req, res){
  User.findByEmailAndPassword(req.body.email, req.body.password, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.render('users/login', {title: 'Login User'});
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.show = function(req, res){
  User.findById(req.params.id, function(showUser){
    Pet.findByUserId(req.params.id, function(pet){
      Activity.findByUserId(req.params.id, function(activity){
        res.render('users/show', {showUser:showUser, activity:activity, pet:pet});
      });
    });
  });
};

