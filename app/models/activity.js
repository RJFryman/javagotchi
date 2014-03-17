'use strict';

module.exports = Activity;
var _ = require('lodash');
//var users = global.nss.db.collection('users');
var activities = global.nss.db.collection('activities');
var Mongo = require('mongodb');

function Activity(activity){
  this.name = activity.name;
  this.completed = activity.completed ? activity.completed : false;
  this.userId = new Mongo.ObjectID(activity.userId);
  this.date = new Date(activity.date);
  this.dateCreated = activity.dateCreated ? activity.dateCreated : new Date();
  this.category = activity.category;
  this.description = activity.description;
  this.nodemonId = Mongo.ObjectID(activity.nodemonId);
}

Activity.prototype.insert = function(fn){
  activities.insert(this, function(err, record){
    fn(err);
  });
};

Activity.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  activities.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

Activity.prototype.update = function(fn){
  activities.update({_id:this._id}, this, function(err, count){
    fn(count);
  });
};

//------------------- FIND METHODS -------------------//

Activity.findAll = function(fn){
  activities.find().toArray(function(err, records){
    fn(records);
  });
};

Activity.findByUserId = function(id, fn){
  var userId = Mongo.ObjectID(id);
  activities.find({userId:userId}).toArray(function(err, records){
    fn(records);
  });
};

Activity.findByCategory = function(category, fn){
  activities.find({category:category}).toArray(function(err, records){
    fn(records);
  });
};

Activity.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  activities.findOne({_id:_id}, function(err, record){
    fn(_.extend(record, Activity.prototype));
  });
};

Activity.find = function(query, fn){
  var limit = query.limit*1 || 5;
  var skip = query.page ? (query.page - 1) * limit : 0;
  var filter = {};
  var sort = [];

  if(query.filterName === 'userId'){
    query.filterValue = Mongo.ObjectID(query.filterValue);
  }else if(query.filterName === 'description'){
    query.filterValue = new RegExp(query.filterValue);
  }else if(query.filterName === 'name'){
    query.filterValue = new RegExp(query.filterValue);
  }else if(query.filterName === 'nodemonId'){
    query.filterValue = Mongo.ObjectID(query.filterValue);
  }

  filter[query.filterName] = query.filterValue;

  if(query.sort){
    var direction = query.direction ? query.direction * 1 : 1;
    sort.push([query.sort, direction]);
  }

  activities.find(filter, {sort:sort, skip:skip, limit:limit}).toArray(function(err, records){
    fn(records);
  });
};
