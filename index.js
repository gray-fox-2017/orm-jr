"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

// var sqlite3 = require('sqlite3').verbose()
var dbModel = new DBModel("./db/student.db")

dbModel.setup()
