"use strict"

let argv = process.argv
if(argv[2] == 'playtime'){
  console.log('Runing');
} else {
  console.log('-----Help List-------');
}

var Student = require('./models/student.js');
var Cohort = require('./models/cohort.js');
var DBModel = require('./models/db_model.js');
var repl = require('repl');

var replServer = repl.start();

var dbModel = new DBModel('./db/student.db');

replServer.context.dbModel = dbModel;
replServer.context.Student = Student;
replServer.context.Cohort = Cohort;
