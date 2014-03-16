'use strict';

var Mongo = require('mongodb');
var pets = global.nss.db.collection('pets');
var _ = require('lodash');

module.exports = Pet;

function Pet(data){
  this.name = data.name;
  this.species = data.species;
  if(data.species==='Shark'){
    this.image = '/img/pets/shark1.jpg';
  }else if(data.species==='Robot'){
    this.image = '/img/pets/robot1.jpg';
  }else if(data.species==='Dragon'){
    this.image = '/img/pets/dragon1.jpg';
  }else{
    this.image = '/img/pets/alien1.jpg';
  }
  this.role = data.role;
  this.status = data.status || 'Happy';
  this.userId = Mongo.ObjectID(data.userId);
}

Pet.prototype.insert = function(fn){
  pets.insert(this, function(err, record){
    fn(err);
  });
};

Pet.prototype.updateStatus = function(status, fn){
  var self = this;
  this.status = status;
  pets.update({_id:self._id}, this, function(err){
    fn(err);
  });
};

Pet.findAll = function(fn){
  pets.find().toArray(function(err, records){
    fn(records);
  });
};

Pet.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  pets.findOne({_id:_id}, function(err, record){
    fn(_.extend(record, Pet.prototype));
  });
};

Pet.findByUserId = function(userId, fn){
  userId = Mongo.ObjectID(userId);
  pets.find({userId:userId}).toArray(function(err, records){
    fn(records);
  });
};

Pet.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  pets.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

