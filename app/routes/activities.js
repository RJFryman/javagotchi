'use strict';

var Activity = require('../models/activity');
//var User = require('../models/user');
//var _ = require('lodash');

exports.index = function(req, res){
  res.render('activities/index');
};

exports.new = function(req, res){
  res.render('activities/new');
};

exports.show = function(req, res){
  Activity.findById(req.params.id, function(activity){
    res.render('activities/show', {activity:activity});
  });
};
