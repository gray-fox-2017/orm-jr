"use strict"

const DBModel = require("./models/db_model.js");
const Student = require("./models/student.js");
const Cohort = require("./models/cohort.js");

const sqlite3 = require('sqlite3').verbose();
const repl = require('repl');

// manual to use the student-cohort database
const help = () => {
  console.log(`DOCUMENTATION \n
  The following functions can be used to modify Students and Cohorts table. \n
  If you'd like to modify Students table, please type Student.[function], otherwise, type Cohort.[function], e.g. Student.create or Cohort.delete.\n
  create(database, student/cohort object) -> to add a record to the database. \n
  update(database, student/cohort object) -> to update a record in the database. \n
  delete(database, id) -> to delete a record based on its ID. \n
  findById(database, id) -> to show data of a record based on its ID. \n
  findAll(database, callback) -> to show all records in the database. \n
  where(database, searchValue, callback) -> to show a record based on an attribute. \n`)
}

// take 'playtime' as the second argument vector to start REPL
let indexPlaytime = process.argv[2];
if (indexPlaytime === 'playtime') {
  let replServer = repl.start({
    prompt: `~ `,
    input: process.stdin,
    output: process.stdout
  });

  // setup the database
  var dbModel = new DBModel('db/student.db');
  replServer.context.dbModel = dbModel;
  replServer.context.help = help;
  replServer.context.Student = Student;
  replServer.context.Cohort = Cohort;
}

