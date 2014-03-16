'use strict';

var Pet = require('../models/pet');
var User = require('../models/user');

exports.index = function(req, res){
  Pet.findAll(function(pets){
    res.render('pets/index', {title:'Pets', pets:pets});
  });
};

exports.new = function(req, res){
  res.render('pets/new', {title:'New Pet'});
};

exports.create = function(req, res){
  req.body.userId = req.user ? req.user._id : req.session.userId;
  var pet = new Pet(req.body);
  pet.insert(function(){
    var id = pet._id.toString();
    res.redirect('/pets/' + id);
  });
};

exports.show = function(req, res){
  Pet.findById(req.params.id, function(pet){
    User.findById(pet.userId.toString(), function(owner){
      res.render('pets/show', {pet:pet, owner:owner});
    });
  });
};

exports.kill = function(req, res){
  Pet.deleteById(req.params.id, function(){
    res.redirect('/');
  });
};
