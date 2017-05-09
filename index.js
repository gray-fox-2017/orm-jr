'use strict'

const repl = require('repl');
const DBModel = require("./models/db_model.js");
// const Cohort = require("./models/cohort.js");
const Student = require("./models/student.js");

var input = process.argv;
let replserver;
if (input[2] == 'playtime'){
  replserver = repl.start({
    prompt: '\(\~\'v\'\)\~  ',
    input: process.stdin,
    output: process.stdout
  })
} else {
  console.log('hoi');
}

var dbModel = new DBModel('./db/student.db');
replserver.context.buat = dbModel;

