"use strict"

const DBModel = require("../models/db_model.js");
const Student = require("../models/student.js");
const Cohort = require("../models/cohort.js");

var dbModel = new DBModel("./db/test.db");
var db = dbModel.connection;

describe('CREATE Student', function() {
  it('test create student: success', function() {
console.log(`Inserting new student...`);
    Student.create(db, new Student('Altinouva', 'Meliala', 7))
  })
})

describe('UPDATE Student', function() {
  it('test update student: success', function() {
console.log(`UPDATE DATA`);
    Student.update(db, new Student('Algebra', 'Meliala', 1))
  })
})
