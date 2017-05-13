"use strict"

const DBModel = require("./models/db_model.js");
const Student = require("./models/student.js");
const Cohort = require("./models/cohort.js");

const sqlite3 = require('sqlite3').verbose();
const repl = require('repl');

const help = () => {
  // manual to use the student-cohort database
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

