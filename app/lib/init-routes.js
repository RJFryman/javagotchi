'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var users = require('../routes/users');
  var activities = require('../routes/activities');
  var pets = require('../routes/pets');

  app.get('/', d, home.index);
  app.get('/register', d, users.fresh);
  app.post('/register', d, users.create);
  app.get('/login', d, users.login);
  app.post('/login', d, users.authenticate);
  app.get('/users/:id', d, users.show);
  app.post('/logout', d, users.logout);
  app.get('/activities', d, activities.index);
  app.get('/activities/new', d, activities.new);
  app.get('/activities/:id', d, activities.show);
  app.get('/pets', d, pets.index);
  app.get('/pets/new', d, pets.new);
  console.log('Routes Loaded');
  fn();
}

