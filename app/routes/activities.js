'use strict';

var Activity = require('../models/activity');
var Pet = require('../models/pet');
var Mongo = require('mongodb');
var User = require('../models/user');
var moment = require('moment');
var Pet = require('../models/pet');
//var _ = require('lodash');

exports.index = function(req, res){
  res.render('activities/index');
};

exports.new = function(req, res){
  if(req.user){
    Pet.findByUserId(req.user._id.toString(), function(pets){
      res.render('activities/new', {pets:pets});
    });
  }else{
    Pet.findByUserId(req.session.userId, function(pets){
      res.render('activities/new', {pets:pets});
    });
  }
};

exports.show = function(req, res){
  Activity.findById(req.params.id, function(activity){
    Pet.findById(activity.nodemonId.toString(), function(pet){
      res.render('activities/show', {title: activity.name, activity:activity, pet:pet, moment:moment});
    });
  });
};

exports.create = function(req, res){
  if(req.user){
    req.body.userId = req.user._id.toString();
  }else{
    req.body.userId = req.session.userId;
  }
  var activity = new Activity(req.body);
  activity.insert(function(){
    var theId;
    if(req.user){
      theId = req.user._id.toString();
    }else{
      theId = req.session.userId;
    }
    User.findById(theId, function(user){
      user.resetLoginTime(req.body.category, function(){
        Pet.findById(req.body.nodemonId, function(pet){
          pet.levelUp(req.body.category, req.body.duration, function(err){
            res.send({userId:theId});
          });
        });
      });
    });
  });
};

exports.destroy = function(req, res){
  Activity.deleteById(req.params.id, function(count){
    if(count === 1){
      res.redirect('/activities');
    }else{
      res.send({error:'Sorry, activity not found'});
    }
  });
};

exports.update = function(req, res){
  var updatedActivity = new Activity(req.body);
  updatedActivity._id = new Mongo.ObjectID(req.params.id);
  updatedActivity.update(function(count){
    if(count === 1){
      res.redirect('/activities/'+updatedActivity._id.toString());
    }else{
      res.send({error:'Sorry, activity failed to update'});
    }
  });
};
