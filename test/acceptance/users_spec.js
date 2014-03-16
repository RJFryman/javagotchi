/* jshint expr:true */
'use strict';

process.env.DBNAME = 'nodemon-test';
var request = require('supertest');
var fs = require('fs');
var exec = require('child_process').exec;
var app = require('../../app/app');
var expect = require('chai').expect;
var User, inUser;
//var cookie;

describe('user', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    var testdir = __dirname + '/../../app/static/img/users/test*';
    var cmd = 'rm -rf ' + testdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/testfile.jpg';
      var copyfile = __dirname + '/../fixtures/testfile-copy.jpg';
      var copyfile1 = __dirname + '/../fixtures/testfile-copy1.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile1));
      global.nss.db.dropDatabase(function(err, result){
        inUser = new User({name:'Samuel', email:'sami1@nomail.com', password:'1234', nodeBucks:'5', lat:'0', lng:'0', pic: '/data/code/nodemon/test/fixtures/testfile-copy1.jpg'});
        inUser.register(function(){
          done();
        });
      });
    });
  });

  describe('GET /', function(){
    it('should display the home page', function(done){
      request(app)
      .get('/')
      .expect(200, done);
    });
  });

  describe('POST /register', function(){
    it('should allow a user to register', function(done){
      var filename = __dirname + '/../fixtures/testfile-copy.jpg';
      request(app)
      .post('/register')
      .field('name', 'Sam Tes')
      .field('email', 'sam@nomail.com')
      .field('password', '1235')
      .field('nodeBucks', '5')
      .field('lat', '0')
      .field('lng', '0')
      .attach('pic', filename)
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });

    it('should not allow a duplicate email to register', function(done){
      var filename = __dirname + '/../fixtures/testfile-copy.jpg';
      request(app)
      .post('/register')
      .field('name', 'Sam Tes')
      .field('email', 'sami1@nomail.com')
      .field('password', '1235')
      .field('nodeBucks', '5')
      .field('lat', '0')
      .field('lng', '0')
      .attach('pic', filename)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('GET /login', function(){
    it('should display the login page', function(done){
      request(app)
      .get('/login')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });
  });

  describe('POST /login/local', function(){
    it('should login a new user', function(done){
      request(app)
      .post('/login/local')
      .field('email', 'sami1@nomail.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.equal('Moved Temporarily. Redirecting to /');
        done();
      });
    });

    it('should not login a new user', function(done){
      request(app)
      .post('/login/local')
      .field('email', 'wrong@nomail.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });

    it('should not login a new user', function(done){
      request(app)
      .post('/login/local')
      .field('email', 'sami1@nomail.com')
      .field('password', '12234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });
  });

  describe('POST /logout', function(){
    it('should log a user out of the app', function(done){
      request(app)
      .post('/logout')
      .expect(302, done);
    });
  });

  describe('GET /users/:id', function(){
    it('should redirect to the show page', function(done){
      request(app)
      .get('/users/'+ inUser._id)
      .expect(200, done);
    });
  });
});
