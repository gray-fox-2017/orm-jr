"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

// var sqlite3 = require('sqlite3').verbose()
let dbModel = new DBModel("./db/student.db")

// dbModel.setup()

// Student.add(dbModel.connection, new Student("rojali", "prabowo", 1))
// Student.update(dbModel.connection, new Student("Windi", "krism", 1, 1))
// Student.findById(dbModel.connection, 1)
