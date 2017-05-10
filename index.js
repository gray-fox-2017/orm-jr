"use strict"

let argv = process.argv
if(argv[2] == 'playtime'){
  console.log('-----Welcome-------');
  var repl = require('repl');
  var replServer = repl.start();
  replServer.context.dbModel = dbModel;
  replServer.context.Student = Student;
  replServer.context.Cohort = Cohort;
  replServer.context.help = help;
} else {
  help();
}

function help(){
  console.log(`type: node index.js playtime to run process!`);
  console.log(`\n \n----------------Help List----------------`);
  console.log(`see SAMPLE TESTCASE on testcase.txt file\n \n`);
  console.log(`type: help()                                       to see this help`);
  console.log(`type: dbModel.setup()                              to create Students and Cohort table if not exists`);
  console.log(`\n \n----------------Student help list----------------`);
  console.log(`type: Student.create(db, new object Student)       to add new data student`);
  console.log(`type: Student.update(db, new object Student)       to update data student`);
  console.log(`type: Student.delete(db, id student)               to update data student`);
  console.log(`type: Student.findById(db, id student)             to find data student by id`);
  console.log(`type: Student.findAll(db, limitation, callback)    to show all data student`);
  console.log(`type: Student.where(db, condition, callback)       to show all data student`);
  console.log(`type: Student.findOrCreate(db, new Student)        to show all data student`);
  console.log(`\n \n----------------Cohort help list----------------`);
  console.log(`type: Cohort.create(db, new object Cohort)        to add new data student`);
  console.log(`type: Cohort.update(db, new object Cohort)        to update data student`);
  console.log(`type: Cohort.delete(db, id cohort)                to update data cohort`);
  console.log(`type: Cohort.findById(db, id cohort)              to find data cohort by id`);
  console.log(`type: Cohort.findAll(db, callback)                to show all data cohort`);
  console.log(`type: Cohort.where(db, condition, callback)       to show all data cohort`);
  console.log(`type: Cohort.findOrCreate(db, new Cohort)         to show all data cohort`);
}

var Student = require('./models/student.js');
var Cohort = require('./models/cohort.js');
var DBModel = require('./models/db_model.js');


var dbModel = new DBModel('./db/student.db');
