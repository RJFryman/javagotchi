'use strict';

var Agenda = require('agenda');

exports.start = function(){
  var agenda = new Agenda();
  agenda.database('localhost:27017/nodemon-test', 'agendaJobs').processEvery('1 second');
  agenda.every('5 seconds', 'get restless');
  agenda.start();
};

exports.restless = function(petId){
  var agenda = new Agenda();
  agenda.database('localhost:27017/nodemon-test', 'agendaJobs').processEvery('1 second');

  agenda.define('get restless', function(job){
    console.log(petId.toString() + ' is restless! Time for a walk!');
  });

  agenda.every('5 seconds', 'get restless');

  agenda.start();
};
