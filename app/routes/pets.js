'use strict';

//var Pet = require('../models/pet');

exports.index = function(req, res){
  res.render('pets/index', {title:'Pets'});
};

exports.new = function(req, res){
  res.render('pets/new', {title:'New Pet'});
};
