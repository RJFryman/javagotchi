'use strict';

process.env.DBNAME = 'nodemon-alpha';
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app/app');
var User, Pet;
var u1, p1;

describe('Pet', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Pet = require('../../app/models/pet');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({name: 'Samuel', email:'sami1@nomail.com', password:'1234', nodeBucks:'5',lat:'0', lng:'0'});
      u1.register(function(){
        p1 = new Pet({name:'Spyro', species:'Dragon', class:'Wizard', userId:u1._id.toString()});
        p1.insert(function(){
          done();
        });
      });
    });
  });

  describe('GET /pets', function(){
    it('should render the pet index page', function(done){
      request(app)
      .get('/pets')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Pets');
        done();
      });
    });
  });

  describe('GET /pets/new', function(){
    it('should render the new pet page', function(done){
      request(app)
      .get('/pets/new')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('New Pet');
        done();
      });
    });
  });

  describe('POST /pets/new', function(){
    it('should create a new pet', function(done){
      request(app)
      .post('/pets/new')
      .field('name', 'Ripster')
      .field('species', 'Shark')
      .field('class', 'Pirate')
      .field('userId', u1._id.toString())
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.include('Moved Temporarily. Redirecting to /pets');
        done();
      });
    });
  });

  describe('GET /pets/:id', function(){
    it('should show the individual pet page', function(done){
      var id = p1._id.toString();
      request(app)
      .get('/pets/'+id)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Spyro');
        done();
      });
    });
  });

  describe('DEL /pets/:id', function(){
    it('should delete the pet', function(done){
      var id = p1._id.toString();
      request(app)
      .del('/pets/'+id)
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.not.include('Spyro');
        done();
      });
    });
  });

  

});

