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
      u1 = new User({name: 'Samuel', email:'sami1@nomail.com', password:'1234', nodeBucks:'5',lat:'0', lng:'0'});
      u1.register(function(){
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new pet', function(){
      var p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
      expect(p1).to.be.instanceof(Pet);
      expect(p1.name).to.equal('Spyro');
      expect(p1.species).to.equal('Dragon');
      expect(p1.class).to.equal('Wizard');
      expect(p1.userId.toString()).to.deep.equal(u1._id.toString());
      
    });
  });

  describe('insert', function(){
    it('should insert a new pet into the db', function(done){
      var p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
      p1.insert(function(){
        expect(p1).to.be.instanceof(Pet);
        expect(p1.name).to.equal('Spyro');
        expect(p1.species).to.equal('Dragon');
        expect(p1.class).to.equal('Wizard');
        expect(p1.userId.toString()).to.deep.equal(u1._id.toString());
        expect(p1._id).to.be.instanceof(Mongo.ObjectID);
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




});
