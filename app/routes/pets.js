'use strict';

var Pet = require('../models/pet');

exports.index = function(req, res){
  Pet.findAll(function(pets){
    console.log(pets);
    res.render('pets/index', {title:'Pets', pets:pets});
  });
};

exports.new = function(req, res){
  res.render('pets/new', {title:'New Pet'});
};

exports.create = function(req, res){
  var pet = new Pet(req.body);
  pet.insert(function(){
    pet.id = pet._id.toString();
    res.redirect('/pets'+pet.id);
  });
};

exports.show = function(req, res){
  Pet.findById(req.params.id, function(foundPet){
    res.render('pets/show', {title:foundPet.name});
  });
  //res.render('pets/show', {pet:pet});
};

exports.kill = function(req, res){
  Pet.deleteById(req.params.id, function(){
    res.redirect('/');
  });
};
