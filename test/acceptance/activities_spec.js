/* jshint expr:true */

'use strict';

process.env.DBNAME = 'nodemon-test';
var request = require('supertest');
var fs = require('fs');
var exec = require('child_process').exec;
var app = require('../../app/app');
//var expect = require('chai').expect;
var User, Activity;
var u1, u2, u3, a1;

describe('Activities', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Activity = require('../../app/models/activity');
      done();
    });
  });

  beforeEach(function(done){
    var testdir = __dirname + '/../../app/static/img/activities/test*';
    var cmd = 'rm ' + testdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/testfile.jpg';
      var copyfile = __dirname + '/../fixtures/testfile-activitiescopy.jpg';
      var copyfile1 = __dirname + '/../fixtures/testfile-activitiescopy1.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile1));
      global.nss.db.dropDatabase(function(err, result){
        u1 = new User({name:'Adam Thede', email:'adam@nomail.com', password:'1234', nodeBucks:'100'});
        u2 = new User({name:'Robert Fryman', email:'robert@nomail.com', password:'4567', nodeBucks:'50'});
        u3 = new User({name:'Nat Webb', email:'nat@nomail.com', password:'abcd', nodeBucks:'25'});
        u1.register(function(){
          u2.register(function(){
            u3.register(function(){
              a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:'12345678901234567890abcd'});
              a1.insert(function(err){
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('GET /activities', function(){
    it('should render the activities index', function(done){
      request(app)
      .get('/activities')
      .expect(200, done);
    });
  });

  describe('GET /activities/new', function(){
    it('should render the new activity page', function(done){
      request(app)
      .get('/activities/new')
      .expect(200, done);
    });
  });

  describe('GET /activities/:id', function(){
    it('should render the activity show page', function(done){
      request(app)
      .get('/activities/' + a1._id.toString())
      .expect(200, done);
    });
  });

});
