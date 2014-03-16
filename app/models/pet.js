'use strict';

var Mongo = require('mongodb');
var pets = global.nss.db.collection('pets');
var _ = require('lodash');

var strength = 10;
var dexterity = 10;
var constitution = 10;
var intelligence = 10;
var wisdom = 10;

module.exports = Pet;

function Pet(data){
  this.name = data.name;
  this.species = data.species;
  this.role = data.role;
  this.status = data.status || 'Happy';
  this.userId = Mongo.ObjectID(data.userId);
  this.strength = data.strength;
  this.dexterity = data.dexterity;
  this.constituition = data.constitution;
  this.intelligence = data.intelligence;
  this.wisdom = data.wisdom;
}

function assignImage(species, role, fn){
  if(species === 'Alien' && role === 'Ninja'){
    fn('/img/pets/ninjaAlien.jpg');
  }else if(species === 'Dragon' && role === 'Ninja'){
    fn('/img/pets/ninjaDragon.jpg');
  }else if(species === 'Lion' && role === 'Ninja'){
    fn('/img/pets/ninjaLion.jpg');
  }else if(species === 'Robot' && role === 'Ninja'){
    fn('/img/pets/ninjaLion.jpg');
  }else if(species === 'Shark' && role === 'Ninja'){
    fn('/img/pets/ninjaShark.jpg');
  }else if(species === 'Alien' && role === 'Paladin'){
    fn('/img/pets/paladinAlien.png');
  }else if(species === 'Dragon' && role === 'Paladin'){
    fn('/img/pets/paladinDragon.png');
  }else if(species === 'Lion' && role === 'Paladin'){
    fn('/img/pets/paladinLion.jpg');
  }else if(species === 'Robot' && role === 'Paladin'){
    fn('/img/pets/paladinRobot.jpg');
  }else if(species === 'Shark' && role === 'Paladin'){
    fn('/img/pets/paladinShark.jpg');
  }else if(species === 'Alien' && role === 'Pirate'){
    fn('/img/pets/pirateAlien.gif');
  }else if(species === 'Dragon' && role === 'Pirate'){
    fn('/img/pets/pirateDragon.jpg');
  }else if(species === 'Lion' && role === 'Pirate'){
    fn('/img/pets/pirateLion.jpg');
  }else if(species === 'Robot' && role === 'Pirate'){
    fn('/img/pets/pirateRobot.png');
  }else if(species === 'Shark' && role === 'Pirate'){
    fn('/img/pets/pirateShark.jpg');
  }else if(species === 'Alien' && role === 'Vampire'){
    fn('/img/pets/vampireAlien.jpg');
  }else if(species === 'Dragon' && role === 'Vampire'){
    fn('/img/pets/vampireDragon.png');
  }else if(species === 'Lion' && role === 'Vampire'){
    fn('/img/pets/vampireLion.png');
  }else if(species === 'Robot' && role === 'Vampire'){
    fn('/img/pets/vampireRobot.jpg');
  }else if(species === 'Shark' && role === 'Vampire'){
    fn('/img/pets/vampireShark.jpg');
  }else if(species === 'Alien' && role === 'Wizard'){
    fn('/img/pets/wizardAlien.jpg');
  }else if(species === 'Dragon' && role === 'Wizard'){
    fn('/img/pets/wizardDragon.jpg');
  }else if(species === 'Lion' && role === 'Wizard'){
    fn('/img/pets/wizardLion.jpg');
  }else if(species === 'Shark' && role === 'Wizard'){
    fn('/img/pets/wizardShark.jpg');
  }
}

function assignStats(species, role, fn){
  if(species === 'Dragon' && role === 'Wizard'){
    strength = 8;
    dexterity = 7;
    constitution = 11;
    intelligence = 10;
    wisdom = 14;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Dragon' && role === 'Pirate'){
    strength = 12;
    dexterity = 9;
    constitution = 10;
    intelligence = 7;
    wisdom = 12;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Dragon' && role === 'Ninja'){
    strength = 9;
    dexterity = 10;
    constitution = 9;
    intelligence = 9;
    wisdom = 13;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Dragon' && role === 'Vampire'){
    strength = 10;
    dexterity = 6;
    constitution = 12;
    intelligence = 11;
    wisdom = 11;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Dragon' && role === 'Paladin'){
    strength = 11;
    dexterity = 8;
    constitution = 13;
    intelligence = 8;
    wisdom = 10;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Shark' && role === 'Wizard'){
    strength = 10;
    dexterity = 10;
    constitution = 10;
    intelligence = 9;
    wisdom = 11;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Shark' && role === 'Pirate'){
    strength = 14;
    dexterity = 12;
    constitution = 9;
    intelligence = 6;
    wisdom = 9;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Shark' && role === 'Ninja'){
    strength = 11;
    dexterity = 13;
    constitution = 8;
    intelligence = 8;
    wisdom = 10;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Shark' && role === 'Vampire'){
    strength = 12;
    dexterity = 9;
    constitution = 11;
    intelligence = 10;
    wisdom = 8;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Shark' && role === 'Paladin'){
    strength = 13;
    dexterity = 11;
    constitution = 12;
    intelligence = 7;
    wisdom = 7;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Robot' && role === 'Wizard'){
    strength = 9;
    dexterity = 8;
    constitution = 12;
    intelligence = 11;
    wisdom = 10;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Robot' && role === 'Pirate'){
    strength = 13;
    dexterity = 10;
    constitution = 11;
    intelligence = 8;
    wisdom = 8;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Robot' && role === 'Ninja'){
    strength = 10;
    dexterity = 11;
    constitution = 10;
    intelligence = 10;
    wisdom = 9;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Robot' && role === 'Vampire'){
    strength = 11;
    dexterity = 7;
    constitution = 13;
    intelligence = 10;
    wisdom = 9;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Robot' && role === 'Paladin'){
    strength = 12;
    dexterity = 9;
    constitution = 14;
    intelligence = 9;
    wisdom = 6;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Tiger' && role === 'Wizard'){
    strength = 7;
    dexterity = 11;
    constitution = 8;
    intelligence = 12;
    wisdom = 12;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Tiger' && role === 'Pirate'){
    strength = 11;
    dexterity = 13;
    constitution = 7;
    intelligence = 9;
    wisdom = 10;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Tiger' && role === 'Ninja'){
    strength = 8;
    dexterity = 14;
    constitution = 6;
    intelligence = 11;
    wisdom = 11;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Tiger' && role === 'Vampire'){
    strength = 9;
    dexterity = 10;
    constitution = 9;
    intelligence = 13;
    wisdom = 9;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Tiger' && role === 'Paladin'){
    strength = 10;
    dexterity = 12;
    constitution = 10;
    intelligence = 9;
    wisdom = 9;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Alien' && role === 'Wizard'){
    strength = 6;
    dexterity = 9;
    constitution = 9;
    intelligence = 13;
    wisdom = 13;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Alien' && role === 'Pirate'){
    strength = 10;
    dexterity = 11;
    constitution = 8;
    intelligence = 10;
    wisdom = 11;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Alien' && role === 'Ninja'){
    strength = 7;
    dexterity = 12;
    constitution = 7;
    intelligence = 12;
    wisdom = 12;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Alien' && role === 'Vampire'){
    strength = 8;
    dexterity = 8;
    constitution = 10;
    intelligence = 14;
    wisdom = 10;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }else if(species === 'Alien' && role === 'Paladin'){
    strength = 9;
    dexterity = 10;
    constitution = 11;
    intelligence = 11;
    wisdom = 9;
    fn(strength, dexterity, constitution, intelligence, wisdom);
  }
}

Pet.prototype.insert = function(fn){
  var self = this;
  assignStats(this.species, this.role, function(s,d,c,i,w){
    self.strength = s;
    self.dexterity = d;
    self.constitution = c;
    self.intelligence = i;
    self.wisdom = w;
  });
  assignImage(this.species, this.role, function(img){
    self.image = img;
  });
  pets.insert(self, function(err, record){
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

