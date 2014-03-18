'use strict';

var d = require('../lib/request-debug');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
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
  var User = require('../models/user');

  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(obj, done){
    done(null, obj);
  });

  passport.use(new FacebookStrategy({clientID: '309439962542948', clientSecret: 'e28ecd5f50aac0d75fdf9578ccf71240', callbackURL: 'http://192.168.11.199:4000/auth/facebook/callback'},
        function(accessToken, refreshToken, profile, done){
          process.nextTick(function(){
            User.findByFacebookId(profile.id, function(user){
              if(user){
                return done(null, user);
              }else{
                var newUser = new User({});
                newUser.facebookId = profile.id;
                newUser.name = profile.displayName;
                newUser.register('', function(user){
                  return done(null, user);
                });
              }
            });
          });
        }));

  var home = require('../routes/home');
  var users = require('../routes/users');
  var activities = require('../routes/activities');
  var pets = require('../routes/pets');

  app.get('/', d, home.index);
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function(req, res){
    res.redirect('/');
  });
  app.get('/register', d, users.fresh);
  app.post('/register', d, users.create);
  app.post('/address/:id', d, users.address);
  app.get('/login', d, users.login);
  app.post('/login', d, passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login'}));
  app.post('/login/local', d, users.authenticate);
  app.get('/logout', d, users.logout);
  app.get('/users/:id', d, users.show);
  app.get('/pets', d, pets.index);
  app.get('/pets/new', d, pets.new);
  app.post('/pets/new', d, pets.create);
  app.get('/pets/:id', d, pets.show);
  app.del('/pets/:id', d, pets.kill);
  app.get('/activities', d, activities.index);
  app.get('/activities/new', d, activities.new);
  app.get('/activities/:id', d, activities.show);
  app.post('/activities', d, activities.create);
  app.del('/activities/:id', d, activities.destroy);
  app.put('/activities/:id', d, activities.update);
  console.log('Routes Loaded');
  fn();
}
