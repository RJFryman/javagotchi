/* jshint expr:true */

'use strict';

process.env.DBNAME = 'nodemon-test';
var request = require('supertest');
var fs = require('fs');
var exec = require('child_process').exec;
var app = require('../../app/app');
var expect = require('chai').expect;
var User, Activity, Pet;
var u1, u2, u3, a1, p1, cookie;

describe('Activities', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Pet = require('../../app/models/pet');
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
        u1 = new User({name:'Adam Thede', email:'adam@nomail.com', password:'1234'});
        u2 = new User({name:'Robert Fryman', email:'robert@nomail.com', password:'4567'});
        u3 = new User({name:'Nat Webb', email:'nat@nomail.com', password:'abcd'});
        u1.register('',function(){
          u2.register('',function(){
            u3.register('',function(){
              p1 = new Pet({name: 'Winky', species:'Robot', role:'Wizard'});
              p1.insert(function(){
                a1 = new Activity({name:'Swimming with Sharky', userId:u1._id.toString(), date:'2014-03-14', category:'swimming', description:'great day at the pool with my nodemon', nodemonId:p1._id.toString()});
                a1.insert(function(err){
                  request(app)
                  .post('/login/local')
                  .field('email', 'adam@nomail.com')
                  .field('password', '1234')
                  .end(function(err, res){
                    cookie = res.headers['set-cookie'];
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

//--------------------- AUTHORIZED -----------------------//

  describe('GET /activities', function(){
    it('should render the activities index', function(done){
      request(app)
      .get('/activities')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });

  describe('GET /activities/new', function(){
    it('should render the new activity page', function(done){
      request(app)
      .get('/activities/new')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });

  describe('GET /activities/:id', function(){
    it('should render the activity show page', function(done){
      request(app)
      .get('/activities/' + a1._id.toString())
      .set('cookie', cookie)
      .expect(200, done);
    });
  });

  describe('POST /activities', function(){
    it('should create an activity and redirect to the activities show page, plus level up the pet', function(done){
      request(app)
      .post('/activities')
      .set('cookie', cookie)
      .field('name', 'Skydiving with my wizard friend')
      .field('userId', u1._id.toString())
      .field('date', '2014-03-15')
      .field('category', 'Social')
      .field('duration', '60')
      .field('description', 'Had a freaking blast')
      .field('nodemonId', p1._id.toString())
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('DEL /activities/:id', function(){
    it('should delete an activity', function(done){
      var id = a1._id.toString();
      request(app)
      .del('/activities/' + id)
      .set('cookie', cookie)
      .expect(302, done);
    });
  });

  describe('PUT /activities/:id', function(){
    it('should update an activity', function(done){
      var id = a1._id.toString();
      request(app)
      .put('/activities/' + id)
      .set('cookie', cookie)
      .field('name', 'Falling Out Of An Airplane')
      .field('nodemonId', '12345678901234567890abcd')
      .expect(302, done);
    });
  });

});
