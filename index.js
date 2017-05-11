"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl')
const sqlite = require('sqlite3').verbose()
let dbModel = new DBModel('./db/student.db')

var replServer = repl.start({prompt : '>>'})


replServer.context.Student = Student
replServer.context.Cohort = Cohort
replServer.context.DBModel = DBModel
replServer.context.Student = Student
//dbModel.setup()

Student.help()
//Cohort.help()
