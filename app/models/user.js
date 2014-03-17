'use strict';

module.exports = User;
var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var email = require('../lib/email');
var path = require('path');
var fs = require('fs');
var Mongo = require('mongodb');
var _ = require('lodash');

/* ---------------------------------- *
 * User
 * _id
 * email
 * password
 * role
 *
 * #register
 * .findByEmailAndPassword
 * ---------------------------------- */

function User(user){
  this.name = user.name;
  this.email = user.email || '';
  this.password = user.password;
  this.pic = user.pic ? user.pic : null;
  this.nodeBucks = user.nodeBucks ? user.nodeBucks * 1 : 100;
  this.lastLogin = user.lastLogin? user.lastLogin : new Date();
  this.coordinate = [(user.lat * 1), (user.lng * 1)];
  this.facebookId = user.facebookId;
  this.loginDifference = user.loginDifference? user.loginDifference : null;
}

User.prototype.register = function(fn){
  var self = this;

  hashPassword(self.password, function(hashedPwd){
    self.password = hashedPwd;
    if(self.pic){
      addPic(self.pic, function(path){
        self.pic = path;
      });
    }
    insert(self, function(err){
      if(self._id){
        email.sendWelcome({to:self.email}, function(err, body){
          fn(err, body);
        });
      }else{
        fn();
      }
    });
  });
};

function addPic(oldpath, fn){
  var filename = path.basename(oldpath);
  var abspath = __dirname + '/../static';
  var relpath = '/img/users/' + filename;

  fs.renameSync(oldpath, abspath+relpath);

  fn(relpath);
}

User.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  users.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

User.findByFacebookId = function(facebookId, fn){
  users.findOne({facebookId:facebookId}, function(err, user){
    fn(_.extend(user, User.prototype));
  });
};

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, user){
    if(user){
      bcrypt.compare(password, user.password, function(err, result){
        if(result){
          fn(_.extend(user, User.prototype));
        }else{
          fn();
        }
      });
    }else{
      fn();
    }
  });
};

function insert(user, fn){
  users.findOne({email:user.email}, function(err, userFound){
    if(!userFound){
      users.findOne({name:user.name}, function(err, userFound){
        if(!userFound){
          users.insert(user, function(err, record){
            fn(err);
          });
        }else{
          fn();
        }
      });
    }else{
      fn();
    }
  });
}

function update(user, fn){
  users.update({_id:user._id}, user, function(err, count){
    fn(err);
  });
}

function hashPassword(password, fn){
  bcrypt.hash(password, 8, function(err, hash){
    fn(hash);
  });
}

User.prototype.setHome = function(lat, lng, fn){
  this.home = [parseFloat(lat), parseFloat(lng)];
  update(this, function(err){
    fn(err);
  });
};

User.findAll = function(fn){
  users.find().toArray(function(err, records){
    fn(records);
  });
};

User.findByName = function(name, fn){
  users.findOne({name:name}, function(err, record){
    fn(record);
  });
};

User.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  users.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

User.prototype.loginTime = function(fn){
  var newLogin = new Date();
  var difference = (newLogin.getTime() - this.lastLogin.getTime())/60000;
  this.loginDifference = difference;
  this.lastLogin = newLogin;
  update(this, function(){
    fn(difference);
  });
};
