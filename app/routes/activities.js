'use strict';

var Activity = require('../models/activity');
var Mongo = require('mongodb');
var Pet = require('../models/pet');
//var _ = require('lodash');

exports.index = function(req, res){
  res.render('activities/index');
};

exports.new = function(req, res){
  res.render('activities/new');
};

exports.show = function(req, res){
  Activity.findById(req.params.id, function(activity){
    res.render('activities/show', {title: activity.name, activity:activity});
  });
};

exports.create = function(req, res){
  req.body.userId = req.session.userId;
  var activity = new Activity(req.body);
  activity.insert(function(){
    Pet.findById(req.body.nodemonId, function(pet){
      pet.levelUp(req.body.category, req.body.duration, function(err){
        res.redirect('/activities/'+activity._id.toString());
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

