/* jshint expr:true */

'use strict';

process.env.DBNAME = 'nodemon-test';
var expect = require('chai').expect;
var fs = require('fs');
var exec = require('child_process').exec;
//var Mongo = require('mongodb');
var u1, u2, u3;
var User, Activity;
var u1id, u2id, u3id;

describe('Activity', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      Activity = require('../../app/models/activity');
      done();
    });
  });

  beforeEach(function(done){
    var testdir = __dirname + '/../../app/static/img/activities/test*';
    var cmd = 'rm -rf ' + testdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/testfile.jpg';
      var copyfile = __dirname + '/../fixtures/testfile-activitycopy.jpg';
      var copyfile1 = __dirname + '/../fixtures/testfile-activitycopy1.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile1));
      global.nss.db.dropDatabase(function(err, result){
        u1 = new User({name:'Adam Thede', email:'adam@nomail.com', password:'1234'});
        u2 = new User({name:'Robert Fryman', email:'robert@nomail.com', password:'4567'});
        u3 = new User({name:'Nat Webb', email:'nat@nomail.com', password:'abcd'});
        u1.register('', function(){
          u2.register('', function(){
            u3.register('', function(){
              done();
            });
          });
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new activity in the db', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      expect(a1.name).to.equal('Swimming with Sharky');
      expect(a1.date).to.be.instanceof(Date);
      expect(a1.userId.toString()).to.have.length(24);
      expect(a1.category).to.equal('swimming');
      expect(a1.nodemonId.toString()).to.equal('12345678901234567890abcd');
      done();
    });
  });

  describe('#insert', function(){
    it('should insert an activity into the db', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      a1.insert(function(err){
        expect(a1._id.toString()).to.have.length(24);
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete an activity in the db', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      a1.insert(function(){
        var id = a1._id.toString();
        Activity.deleteById(id, function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

  describe('#update', function(){
    it('should update an activity in the db', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      a1.insert(function(){
        a1.name = 'Swimming in the Deep Blue Sea';
        a1.update(function(count){
          expect(count).to.equal(1);
          expect(a1.name).to.equal('Swimming in the Deep Blue Sea');
          done();
        });
      });
    });
  });

//---------------------------- FIND TESTING -------------------------//

  describe('.findAll', function(){
    it('should find all activities in the db', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      var a2 = new Activity({name:'Walking R2D2', userId:u2._id.toString(), date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
      a1.insert(function(){
        a2.insert(function(){
          Activity.findAll(function(activities){
            expect(activities.length).to.equal(2);
            done();
          });
        });
      });
    });
  });

  describe('.findByUserId', function(){
    it('should find all activites with a certain userId', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      var a2 = new Activity({name:'Walking R2D2', userId:u2._id.toString(), date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
      var a3 = new Activity({name:'Eating dogs at the park', userId:u1._id.toString(), date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            Activity.findByUserId(u1._id.toString(), function(activities){
              expect(activities.length).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find a specific activity via id', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      var a2 = new Activity({name:'Walking R2D2', userId:u2._id.toString(), date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
      var a3 = new Activity({name:'Eating dogs at the park', userId:u1._id.toString(), date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            Activity.findById(a1._id.toString(), function(activity){
              expect(activity.name).to.equal('Swimming with Sharky');
              expect(activity._id.toString()).to.equal(a1._id.toString());
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByCategory', function(){
    it('should find a specific activity via id', function(done){
      var a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
      var a2 = new Activity({name:'Walking R2D2', userId:u2._id.toString(), date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
      var a3 = new Activity({name:'Eating dogs at the park', userId:u1._id.toString(), date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            Activity.findByCategory('walking', function(activities){
              expect(activities.length).to.equal(2);
              expect(activities[0].category).to.equal('walking');
              done();
            });
          });
        });
      });
    });
  });

  describe('.find', function(){
    beforeEach(function(done){
      global.nss.db.dropDatabase(function(err, result){
        u1id = u1._id.toString();
        u2id = u2._id.toString();
        u3id = u3._id.toString();

        var a1 = new Activity({name:'Swimming with Sharky', userId:u1id, date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
        var a2 = new Activity({name:'Walking R2D2', userId:u2id, date:'2014-03-13', category:'walking', description:'great stroll through the dunes on Tatooine', nodemonId:'12345678901234567890abcd'});
        var a3 = new Activity({name:'Eating dogs at the park', userId:u1id, date:'2014-03-13', category:'walking', description:'dogs are funny', nodemonId:'12345678901234567890abcd'});
        var a4 = new Activity({name:'Hiking with Bear', userId:u3id, date:'2014-03-14', category:'hiking', description:'bear loves the forest', nodemonId:'12345678901234567890abcd'});
        var a5 = new Activity({name:'Running with Aliens', userId:u3id, date:'2014-03-14', category:'biking', description:'wicked ride', nodemonId:'12345678901234567890abcd'});
        var a6 = new Activity({name:'Afternoon stroll', userId:u2id, date:'2014-03-13', category:'walking', description:'', nodemonId:'12345678901234567890abcd'});
        var a7 = new Activity({name:'Evening swim', userId:u1id, date:'2014-03-13', category:'swimming', description:'', nodemonId:'12345678901234567890abcd'});
        var a8 = new Activity({name:'Drinking whiskey and beer with wizards', userId:u3id, date:'2014-03-13', category:'socializing', description:'whiskey is oh so tasty', nodemonId:'12345678901234567890abcd'});
        var a9 = new Activity({name:'Laughing about code and jobs', userId:u2id, date:'2014-03-13', category:'socializing', description:'laughing is good', nodemonId:'23456789012345678901cdef'});
        a1.insert(function(){
          a2.insert(function(){
            a3.insert(function(){
              a4.insert(function(){
                a5.insert(function(){
                  a6.insert(function(){
                    a7.insert(function(){
                      a8.insert(function(){
                        a9.insert(function(){
                          done();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    it('should find all activities - page 1, 5 tasks per page', function(done){
      var query = {};
      Activity.find(query, function(activities){
        expect(activities).to.have.length(5);
        done();
      });
    });

    it('should find all activities in category swimming - page 1, 5 tasks per page', function(done){
      var query = {filterName:'category', filterValue:'swimming'};
      Activity.find(query, function(activities){
        expect(activities).to.have.length(2);
        done();
      });
    });

    it('should find all activities belonging to u2, 2 per page', function(done){
      var query = {filterName:'userId', filterValue:u2id, limit:'2'};
      Activity.find(query, function(activities){
        expect(activities).to.have.length(2);
        done();
      });
    });

    it('should find all activities associated with a nodemon', function(done){
      var query = {filterName:'nodemonId', filterValue:'12345678901234567890abcd', limit:'3', page:'2'};
      Activity.find(query, function(activities){
        expect(activities).to.have.length(3);
        done();
      });
    });
  });


});
