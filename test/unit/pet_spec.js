/* jshint expr:true */
'use strict';

var Mongo = require('mongodb');
process.env.DBNAME = 'nodemon-alpha';
var expect = require('chai').expect;
var User;
var Pet;
var u1;

describe('Pet', function(){
  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      Pet = require('../../app/models/pet');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({name: 'Samuel', email:'sami1@nomail.com', password:'1234'});
      u1.register('', function(){
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new pet', function(){
      var p1 = new Pet({name:'Spyro', species:'Dragon', role:'Wizard', userId:u1._id.toString()});
      expect(p1).to.be.instanceof(Pet);
      expect(p1.name).to.equal('Spyro');
      expect(p1.species).to.equal('Dragon');
      expect(p1.role).to.equal('Wizard');
      expect(p1.userId.toString()).to.deep.equal(u1._id.toString());
    });
  });

  describe('insert', function(){
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', role:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1).to.be.instanceof(Pet);
        expect(p1.name).to.equal('Spyro');
        expect(p1.species).to.equal('Dragon');
        expect(p1.role).to.equal('Wizard');
        expect(p1.userId.toString()).to.deep.equal(u1._id.toString());
        expect(p1.strength).to.equal(8);
        expect(p1.dexterity).to.equal(7);
        expect(p1.constitution).to.equal(11);
        expect(p1.intelligence).to.equal(10);
        expect(p1.wisdom).to.equal(14);
        expect(p1.image).to.equal('/img/pets/wizardDragon.jpg');
        expect(p1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', role:'Pirate', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Dragon');
        expect(p1.role).to.equal('Pirate');
        expect(p1.strength).to.equal(12);
        expect(p1.dexterity).to.equal(9);
        expect(p1.constitution).to.equal(10);
        expect(p1.intelligence).to.equal(7);
        expect(p1.wisdom).to.equal(12);
        expect(p1.image).to.equal('/img/pets/pirateDragon.jpg');
        done();
      });
    });
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', role:'Ninja', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Dragon');
        expect(p1.role).to.equal('Ninja');
        expect(p1.strength).to.equal(9);
        expect(p1.dexterity).to.equal(10);
        expect(p1.constitution).to.equal(9);
        expect(p1.intelligence).to.equal(9);
        expect(p1.wisdom).to.equal(13);
        expect(p1.image).to.equal('/img/pets/ninjaDragon.jpg');
        done();
      });
    });
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', role:'Vampire', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Dragon');
        expect(p1.role).to.equal('Vampire');
        expect(p1.strength).to.equal(10);
        expect(p1.dexterity).to.equal(6);
        expect(p1.constitution).to.equal(12);
        expect(p1.intelligence).to.equal(11);
        expect(p1.wisdom).to.equal(11);
        expect(p1.image).to.equal('/img/pets/vampireDragon.png');
        done();
      });
    });
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', role:'Paladin', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Dragon');
        expect(p1.role).to.equal('Paladin');
        expect(p1.strength).to.equal(11);
        expect(p1.dexterity).to.equal(8);
        expect(p1.constitution).to.equal(13);
        expect(p1.intelligence).to.equal(8);
        expect(p1.wisdom).to.equal(10);
        expect(p1.image).to.equal('/img/pets/paladinDragon.png');
        done();
      });
    });
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Shark', role:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Shark');
        expect(p1.role).to.equal('Wizard');
        expect(p1.strength).to.equal(10);
        expect(p1.dexterity).to.equal(10);
        expect(p1.constitution).to.equal(10);
        expect(p1.intelligence).to.equal(9);
        expect(p1.wisdom).to.equal(11);
        expect(p1.image).to.equal('/img/pets/wizardShark.jpg');
        done();
      });
    });
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Shark', role:'Pirate', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Shark');
        expect(p1.role).to.equal('Pirate');
        expect(p1.strength).to.equal(14);
        expect(p1.dexterity).to.equal(12);
        expect(p1.constitution).to.equal(9);
        expect(p1.intelligence).to.equal(6);
        expect(p1.wisdom).to.equal(9);
        expect(p1.image).to.equal('/img/pets/pirateShark.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Shark', role:'Ninja', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Shark');
        expect(p1.role).to.equal('Ninja');
        expect(p1.strength).to.equal(11);
        expect(p1.dexterity).to.equal(13);
        expect(p1.constitution).to.equal(8);
        expect(p1.intelligence).to.equal(8);
        expect(p1.wisdom).to.equal(10);
        expect(p1.image).to.equal('/img/pets/ninjaShark.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Shark', role:'Vampire', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Shark');
        expect(p1.role).to.equal('Vampire');
        expect(p1.strength).to.equal(12);
        expect(p1.dexterity).to.equal(9);
        expect(p1.constitution).to.equal(11);
        expect(p1.intelligence).to.equal(10);
        expect(p1.wisdom).to.equal(8);
        expect(p1.image).to.equal('/img/pets/vampireShark.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Shark', role:'Paladin', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Shark');
        expect(p1.role).to.equal('Paladin');
        expect(p1.strength).to.equal(13);
        expect(p1.dexterity).to.equal(11);
        expect(p1.constitution).to.equal(12);
        expect(p1.intelligence).to.equal(7);
        expect(p1.wisdom).to.equal(7);
        expect(p1.image).to.equal('/img/pets/paladinShark.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Robot', role:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Robot');
        expect(p1.role).to.equal('Wizard');
        expect(p1.strength).to.equal(9);
        expect(p1.dexterity).to.equal(8);
        expect(p1.constitution).to.equal(12);
        expect(p1.intelligence).to.equal(11);
        expect(p1.wisdom).to.equal(10);
        expect(p1.image).to.equal('/img/pets/wizardRobot.png');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Robot', role:'Pirate', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Robot');
        expect(p1.role).to.equal('Pirate');
        expect(p1.strength).to.equal(13);
        expect(p1.dexterity).to.equal(10);
        expect(p1.constitution).to.equal(11);
        expect(p1.intelligence).to.equal(8);
        expect(p1.wisdom).to.equal(8);
        expect(p1.image).to.equal('/img/pets/pirateRobot.png');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Robot', role:'Ninja', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Robot');
        expect(p1.role).to.equal('Ninja');
        expect(p1.strength).to.equal(10);
        expect(p1.dexterity).to.equal(11);
        expect(p1.constitution).to.equal(10);
        expect(p1.intelligence).to.equal(10);
        expect(p1.wisdom).to.equal(9);
        expect(p1.image).to.equal('/img/pets/ninjaRobot.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Robot', role:'Vampire', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Robot');
        expect(p1.role).to.equal('Vampire');
        expect(p1.strength).to.equal(11);
        expect(p1.dexterity).to.equal(7);
        expect(p1.constitution).to.equal(13);
        expect(p1.intelligence).to.equal(10);
        expect(p1.wisdom).to.equal(9);
        expect(p1.image).to.equal('/img/pets/vampireRobot.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Robot', role:'Paladin', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Robot');
        expect(p1.role).to.equal('Paladin');
        expect(p1.strength).to.equal(12);
        expect(p1.dexterity).to.equal(9);
        expect(p1.constitution).to.equal(14);
        expect(p1.intelligence).to.equal(9);
        expect(p1.wisdom).to.equal(6);
        expect(p1.image).to.equal('/img/pets/paladinRobot.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Lion', role:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Lion');
        expect(p1.role).to.equal('Wizard');
        expect(p1.strength).to.equal(7);
        expect(p1.dexterity).to.equal(11);
        expect(p1.constitution).to.equal(8);
        expect(p1.intelligence).to.equal(12);
        expect(p1.wisdom).to.equal(12);
        expect(p1.image).to.equal('/img/pets/wizardLion.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Lion', role:'Pirate', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Lion');
        expect(p1.role).to.equal('Pirate');
        expect(p1.strength).to.equal(11);
        expect(p1.dexterity).to.equal(13);
        expect(p1.constitution).to.equal(7);
        expect(p1.intelligence).to.equal(9);
        expect(p1.wisdom).to.equal(10);
        expect(p1.image).to.equal('/img/pets/pirateLion.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Lion', role:'Ninja', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Lion');
        expect(p1.role).to.equal('Ninja');
        expect(p1.strength).to.equal(8);
        expect(p1.dexterity).to.equal(14);
        expect(p1.constitution).to.equal(6);
        expect(p1.intelligence).to.equal(11);
        expect(p1.wisdom).to.equal(11);
        expect(p1.image).to.equal('/img/pets/ninjaLion.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Lion', role:'Vampire', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Lion');
        expect(p1.role).to.equal('Vampire');
        expect(p1.strength).to.equal(9);
        expect(p1.dexterity).to.equal(10);
        expect(p1.constitution).to.equal(9);
        expect(p1.intelligence).to.equal(13);
        expect(p1.wisdom).to.equal(9);
        expect(p1.image).to.equal('/img/pets/vampireLion.png');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Lion', role:'Paladin', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Lion');
        expect(p1.role).to.equal('Paladin');
        expect(p1.strength).to.equal(10);
        expect(p1.dexterity).to.equal(12);
        expect(p1.constitution).to.equal(10);
        expect(p1.intelligence).to.equal(9);
        expect(p1.wisdom).to.equal(9);
        expect(p1.image).to.equal('/img/pets/paladinLion.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Alien', role:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Alien');
        expect(p1.role).to.equal('Wizard');
        expect(p1.strength).to.equal(6);
        expect(p1.dexterity).to.equal(9);
        expect(p1.constitution).to.equal(9);
        expect(p1.intelligence).to.equal(13);
        expect(p1.wisdom).to.equal(13);
        expect(p1.image).to.equal('/img/pets/wizardAlien.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Alien', role:'Pirate', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Alien');
        expect(p1.role).to.equal('Pirate');
        expect(p1.strength).to.equal(10);
        expect(p1.dexterity).to.equal(11);
        expect(p1.constitution).to.equal(8);
        expect(p1.intelligence).to.equal(10);
        expect(p1.wisdom).to.equal(11);
        expect(p1.image).to.equal('/img/pets/pirateAlien.gif');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Alien', role:'Ninja', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Alien');
        expect(p1.role).to.equal('Ninja');
        expect(p1.strength).to.equal(7);
        expect(p1.dexterity).to.equal(12);
        expect(p1.constitution).to.equal(7);
        expect(p1.intelligence).to.equal(12);
        expect(p1.wisdom).to.equal(12);
        expect(p1.image).to.equal('/img/pets/ninjaAlien.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Alien', role:'Vampire', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Alien');
        expect(p1.role).to.equal('Vampire');
        expect(p1.strength).to.equal(8);
        expect(p1.dexterity).to.equal(8);
        expect(p1.constitution).to.equal(10);
        expect(p1.intelligence).to.equal(14);
        expect(p1.wisdom).to.equal(10);
        expect(p1.image).to.equal('/img/pets/vampireAlien.jpg');
        done();
      });
    });

    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Alien', role:'Paladin', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1.species).to.equal('Alien');
        expect(p1.role).to.equal('Paladin');
        expect(p1.strength).to.equal(9);
        expect(p1.dexterity).to.equal(10);
        expect(p1.constitution).to.equal(11);
        expect(p1.intelligence).to.equal(11);
        expect(p1.wisdom).to.equal(9);
        expect(p1.image).to.equal('/img/pets/paladinAlien.png');
        done();
      });
    });
  });

  describe('findAll', function(){
    it('should find all the pets in the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        var p2 = new Pet({name:'Ripster', species:'Shark', class:'Pirate', userId:u1._id.toString()});
        p2.insert(function(){
          Pet.findAll(function(pets){
            expect(pets).to.have.length(2);
            done();
          });
        });
      });
    });
  });

  describe('findById', function(){
    it('should find pet by its id', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        var p2 = new Pet({name:'Ripster', species:'Shark', class:'Pirate', userId:u1._id.toString()});
        p2.insert(function(){
          Pet.findById(p2._id.toString(), function(pet){
            expect(pet.name).to.equal('Ripster');
            expect(pet.species).to.equal('Shark');
            done();
          });
        });
      });
    });
  });

  describe('findByUserId', function(){
    it('should find pet by its userid', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        var p2 = new Pet({name:'Ripster', species:'Shark', class:'Pirate', userId:u1._id.toString()});
        p2.insert(function(){
          Pet.findByUserId(p2.userId.toString(), function(pets){
            expect(pets).to.have.length(2);
            done();
          });
        });
      });
    });
  });

  describe('updateStatus', function(){
    it('should update the status of the pet', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        var p2 = new Pet({name:'Ripster', species:'Shark', class:'Pirate', userId:u1._id.toString()});
        p2.insert(function(){
          Pet.findById(p2._id.toString(), function(foundPet){
            foundPet.updateStatus('hungry', function(err){
              expect(err).to.be.null;
              Pet.findById(p2._id.toString(), function(pet){
                expect(pet.status).to.equal('hungry');
                expect(pet.name).to.equal('Ripster');
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('deleteById', function(){
    it('should delete a pet', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        Pet.deleteById(p1._id.toString(), function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });




});
