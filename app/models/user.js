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
  this.nodeBucks = user.nodeBucks ? user.nodeBucks * 1 : 100;
  this.lastLogin = user.lastLogin? user.lastLogin : new Date();
  this.facebookId = user.facebookId;
  this.loginDiff = user.loginDiff? user.loginDifference : 0;
  this.loginDiffHung = user.loginDiffHung? user.loginDiffHung : 0;
  this.loginDiffRest = user.loginDiffRest? user.loginDiffRest : 0;
  this.petStatus = user.petStatus? user.petStatus : 'Happy';
  this.moodIcon = user.moodIcon? user.moodIcon : '/img/peticons/happy.jpg';
  this.hungerIcon = user.hungerIcon? user.hungerIcon : '/img/peticons/full.png';
}

User.prototype.register = function(picpath, fn){
  var self = this;

  hashPassword(self.password, function(hashedPwd){
    self.password = hashedPwd;
    if(path.extname(picpath)){
      console.log(picpath);
      addPic(picpath, function(newpath){
        self.pic = newpath;
      });
    }
    insert(self, function(err){
      if(self._id){
        email.sendWelcome({to:self.email, name:self.name}, function(err, body){
          fn(err, body);
        });
      }else{
        fn();
      }
    });
  });
};

User.prototype.addAddress = function(lat, lng, fn){
  this.coordinate = [(lat * 1), (lng * 1)];
  fn();
};

function addPic(oldpath, fn){
  var filename = path.basename(oldpath);
  var abspath = __dirname + '/../static';
  var relpath = '/img/users/' + filename;
  console.log(oldpath);
  fs.renameSync(oldpath, abspath+relpath);

  fn(relpath);
}

User.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  users.findOne({_id:_id}, function(err, record){
    fn(_.extend(record, User.prototype));
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

User.prototype.update = function(fn){
  users.update({_id:this._id}, this, function(err, count){
    fn(err);
  });
};

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

User.prototype.getLoginDiff = function(fn){
  var newLogin = new Date();
  var difference = (newLogin.getTime() - this.lastLogin.getTime())/60000;
  this.loginDiff += difference;
  this.loginDiffHung += difference;
  this.loginDiffRest += difference;
  this.lastLogin = newLogin;
  update(this, function(){
    fn(difference);
  });
};

User.prototype.updateIcons = function(fn){
  if((this.loginDiffHung > 2 && this.loginDiffHung < 4) &&(this.loginDiffRest > 2 && this.loginDiffRest < 4)){
    this.hungerIcon = '/img/peticons/hungry.jpg';
    this.moodIcon = '/img/peticons/restless.jpg';
    this.petStatus = 'Mildly Agitated';
  }else if(this.loginDiffHung > 4 && this.loginDiffRest > 4){
    this.hungerIcon = '/img/peticons/starved.jpg';
    this.moodIcon = '/img/peticons/dead.png';
    this.petStatus = 'Dead';
  }else{
    this.hungerIcon = '/img/peticons/full.png';
    this.moodIcon = '/img/peticons/happy.jpg';
    this.petStatus = 'Happy';
  }
  update(this, function(){
    fn();
  });
};

User.prototype.resetLoginTime = function(activityName, fn){
  if(activityName === 'Cardio Exercise' || 'Weight Exercise'){
    this.loginDiffRest = 0;
    this.moodIcon = '/img/peticons/strong.jpg';
    this.petStatus = 'Feeling Strong';
  }else if(activityName === 'Social'){
    this.loginDiffHung = 0;
    this.hungerIcon = '/img/peticons/full.jpg';
    tihs.petStatus = 'Feeling Social and Full';
  }
  update(this, function(){
    fn();
  });
};
