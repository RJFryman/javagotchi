/* jshint expr:true */

'use strict';

process.env.DBNAME = 'nodemon-test';
var expect = require('chai').expect;
var User;
var fs = require('fs');
var exec = require('child_process').exec;


describe('User', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    var testdir = __dirname + '/../../app/static/img/users/test*';
    var cmd = 'rm ' + testdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/testfile.jpg';
      var copyfile = __dirname + '/../fixtures/testfile-copy.jpg';
      var copyfile2 = __dirname + '/../fixtures/testfile2-copy.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile2));
      global.nss.db.dropDatabase(function(err, result){
        var u1 = new User({name: 'Samuel', email:'sami1@nomail.com', password:'1234', nodeBucks:'5',lat:'0', lng:'0'});
        u1.register(function(){
          done();
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new User object', function(done){
      var u1 = new User({name: 'Sam', email:'sam@nomail.com', password:'1234', nodeBucks:'5', lat:'0', lng:'0'});
      expect(u1.email).to.equal('sam@nomail.com');
      expect(u1.password).to.equal('1234');
      expect(u1.nodeBucks).to.equal(5);
      expect(u1.name).to.equal('Sam');
      done();
    });
  });

  describe('register', function(){
    it('should register user', function(done){
      var u1 = new User({name: 'Sam', email:'robert.fryman@gmail.com', password:'1234', nodeBucks:'5', lat:'0', log:'0'});
      u1.register(function(err, body){
        expect(u1.email).to.equal('robert.fryman@gmail.com');
        expect(u1.password).to.have.length(60);
        expect(u1.nodeBucks).to.equal(5);
        expect(u1.name).to.equal('Sam');
        expect(u1._id.toString()).to.have.length(24);
        body = JSON.parse(body);
        expect(body.id).to.be.ok;
        done();
      });
    });

    it('should not register a user to the database for duplicate email', function(done){
      var u1 = new User({name: 'Sam', email:'sam@nomail.com', password:'1234', nodeBucks:'5', lat:'0', log:'0'});
      var u2 = new User({name: 'Sam', email:'sami1@nomail.com', password:'1234', nodeBucks:'5', lat:'0', log:'0'});
      u1.register(function(){
        u2.register(function(){
          expect(u1.password).to.have.length(60);
          expect(u1._id.toString()).to.have.length(24);
          expect(u2._id).to.not.be.ok;
          done();
        });
      });
    });
  });

  describe('#setHome', function(){
    it('should set the home coordinates of the user', function(done){
      var u1 = new User({name: 'Sam', email:'sam@nomail.com', password:'1234', nodeBucks:'5', lat:'0', lng:'0'});
      u1.register(function(){
        u1.setHome('0', '0', function(){
          expect(u1.home).to.deep.equal([0, 0]);
          done();
        });
      });
    });
  });

  describe('deleteById', function(){
    it('should delete a user', function(done){
      var u1 = new User({name: 'Sam', email:'sam@nomail.com', password:'1234', nodeBucks:'5', lat:'0', lng:'0'});
      u1.register(function(){
        User.deleteById(u1._id.toString(), function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FIND METHODS >>>>>>>>>>>>>>>>>>>>>>>>>>

  describe('.findById', function(){
    it('should find a user by id', function(done){
      var u1 = new User({name: 'Sam', email:'sam@nomail.com', password:'1234', lat: '0', lng:'0'});
      u1.register(function(){
        User.findById(u1._id.toString(), function(record){
          expect(u1.email).to.equal('sam@nomail.com');
          expect(u1.password).to.not.equal('1234');
          expect(record.name).to.equal('Sam');
          expect(record._id).to.deep.equal(u1._id);
          done();
        });
      });
    });
  });

  describe('.findByFacebookId', function(){
    it('should find a user', function(done){
      var u1 = new User({facebookId:'1234', name: 'Sam', email:'sam@nomail.com', password:'1234', lat: '0', lng:'0'});
      u1.register(function(){
        User.findByFacebookId('1234', function(record){
          expect(record.name).to.equal('Sam');
          done();
        });
      });
    });
  });


  describe('.findByEmailAndPassword', function(){
    it('should find a user', function(done){
      User.findByEmailAndPassword('sami1@nomail.com', '1234', function(user){
        expect(user).to.be.ok;
        done();
      });
    });
    it('should not find user - bad email', function(done){
      User.findByEmailAndPassword('wrong@nomail.com', '1234', function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
    it('should not find user - bad password', function(done){
      User.findByEmailAndPassword('sami1@nomail.com', 'wrong', function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should all users in the db', function(done){
      var u2 = new User({name: 'Sam', email:'adam@nomail.com', password:'1234', nodeBucks:'5', lat:'0', lng:'0'});
      u2.register(function(){
        User.findAll(function(users){
          expect(users.length).to.equal(2);
          done();
        });
      });
    });
  });

  describe('.findByName', function(){
    it('should find users by name in the db', function(done){
      var u2 = new User({name: 'Adam', email:'adam@nomail.com', password:'1234', nodeBucks:'5', lat:'0', lng:'0'});
      u2.register(function(){
        User.findByName('Adam', function(users){
          expect(users.name).to.equal('Adam');
          done();
        });
      });
    });
  });


});
