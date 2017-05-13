const sqlite = require('sqlite3').verbose();
let DBModel = require("../models/db_model.js");
let db = new DBModel("../db/test.db");
const {Student,Cohort,printData,printErr,printScs} = require("../index.js");

describe('CREATE Student', function() {
  it('should run as expected (no callback)', function() {
    Student.create(db.connection, {firstname: 'John', lastname: 'Doe', cohort_id: 1});
  });
});
describe('CREATE Cohort', function() {
  it('should run as expected (no callback)', function() {
    Cohort.create(db.connection, {name: 'Foo Bar'});
  });
});
describe('Update Student', function() {
  it('should run as expected (no callback)', function() {
    Student.update(db.connection, {firstname: 'John', lastname: 'Doe', cohort_id: 1,id:5});
  });
});
describe('Update Cohort', function() {
  it('should run as expected (no callback)', function() {
    Cohort.update(db.connection, {name: 'Foo Bar',id:5});
  });
});
describe('Delete Student', function() {
  it('should run as expected (no callback)', function() {
    Student.deletes(db.connection,8);
  });
});
describe('Delete Cohort', function() {
  it('should run as expected (no callback)', function() {
    Cohort.deletes(db.connection, 3);
  });
});

describe('Where Student', function() {
  it('should run as expected and invokes callback', function(done) {
    Student.where(db.connection, "firstname = 'John'", done);
  });
});

describe('Where Cohort', function() {
  it('should run as expected and invokes callback', function(done) {
    Cohort.where(db.connection, "name = 'Foo Bar'", done);
  });
});

describe('FindAll Student', function() {
  it('should run as expected and invokes callback', function(done) {
    Student.findAll(db.connection, {limit:4}, done);
  });
});

describe('FindAll Cohort', function() {
  it('should run as expected and invokes callback', function(done) {
    Cohort.findAll(db.connection,{limit:4,offset:2}, done);
  });
});

describe('FindByID Student', function() {
  it('should run as expected and invokes callback', function(done) {
    Student.findAll(db.connection, 9, done);
  });
});

describe('FindByID Cohort', function() {
  it('should run as expected and invokes callback', function(done) {
    Cohort.findAll(db.connection,9, done);
  });
});