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
  var pets = require('../routes/pets');

  app.get('/', d, home.index);
  app.get('/register', d, users.fresh);
  app.post('/register', d, users.create);
  app.get('/login', d, users.login);
  app.post('/login', d, users.authenticate);
  app.get('/pets', d, pets.index);
  app.get('/pets/new', d, pets.new);
  app.post('/pets/new', d, pets.create);
  app.get('/pets/:id', d, pets.show);
  app.del('/pets/:id', d, pets.kill);
  console.log('Routes Loaded');
  fn();
}

