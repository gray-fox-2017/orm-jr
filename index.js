"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require("repl");
const replServer = repl.start({prompt: "> "});
const dbModel = new DBModel('./db/student.db')

const argv = process.argv

if(argv[2] === 'playtime'){
replServer.context.Student = Student
replServer.context.Cohort = Cohort
replServer.context.dbModel = DBModel
dbModel.setup()
Student.help()
}

