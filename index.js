"use strict"

// import DBModel from "./models/db_model.js";
// import Cohort from "./models/cohort.js";
// import Student from "./models/student.js";
const repl = require('repl');
const argv = process.argv;
const DBModel = require("./models/db_model.js");
const Student = require('./models/student.js');
const Cohort = require('./models/cohort.js');
let dbModel = new DBModel('./db/student.db');
if(argv[2]=='playtime'){
  let replServer = repl.start({
    prompt:'ORM Jr>>>> ',
    input:process.stdin,
    output:process.stdout
  })
  replServer.context.dbModel = dbModel
  replServer.context.help = help
  replServer.context.Student = Student
  replServer.context.Cohort = Cohort
}

function help() {
  console.log(`Help:`);
  console.log('dbModel ===> check your connection');
  console.log('dbModel.setup() ===> initialize Stuents & Cohorts table');
  console.log('Student.create(dbModel.connection,object) ===> insert new row to Students table');
  console.log('Student.update(dbModel.connection,object) ===> update data at Students table');
  console.log('Student.findAll(dbModel.connection) ===> show all data on Students table');
  console.log('Student.findAll(dbModel.connection,{limit:x,offset:y}) ===> show x data on Students table with y offset');
  console.log('Student.findById(dbModel.connection,id) ===> show detail of row with id on Students table');
  console.log('Student.delete(dbModel.connection,id) ===> delete record id from Students table');
  console.log('Student.where(dbModel.connection,\"key:\'value\'\") ===> show detail of row on Students table where condition is specified');
}

