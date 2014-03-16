'use strict';

module.exports = function(req, res, next){
  var User = require('../models/user');

  console.log('FACEBOOK USER THANG');
  console.log(req.user);

  if(req.user){
    console.log('FINDING FACEBOOK USER');
    res.locals.user = req.user;
    console.log(res.locals.user);
    next();
  }else{
    User.findById(req.session.userId, function(user){
      res.locals.user = user;
      next();
    });
  }

};

