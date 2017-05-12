const DBModel = require('../models/db_model.js');
const Student = require('../models/student.js');
const Cohort = require('../models/cohort.js');


var db = new DBModel("./db/student.db")

describe('CREATE STUDENT', function() {
  it('should invoke callback done', function(done) {
    Student.create(db.connection,{first_name: 'John Doe', last_name: 'Foo Bar',id_cohort: 1},done)
  })
})

describe('UPDATE STUDENT', function() {
  it('should invoke callback done', function(done) {
    Student.update(db.connection,{first_name: 'John Doe', last_name: 'Foo Bar',id_cohort: 1,id:5},done)
  })
})


describe('DELETES', function() {
  it('should invoke callback done', function(done) {
    Student.delete(db.connection,8,done);
  })
})

describe('FINDBYID STUDENT', function() {
  it('should invoke callback done', function(done) {
    Student.findById(db.connection,5,done);
  })
})

describe('FINDALL STUDENT', function() {
  it('should invoke callback done', function(done) {
    Student.findAll(db.connection,done);
  })
})

describe('WHERE STUDENT', function() {
  it('should invoke callback done', function(done) {
    Student.where(db.connection,'id = 5',done);
  })
})


///cohort

describe('CREATE COHORT', function() {
  it('should invoke callback done', function(done) {
    Cohort.create(db.connection,{name: 'SHOOT'},done)
  })
})

describe('FINDALL COHORT', function() {
  it('should invoke callback done', function(done) {
    Cohort.findAll(db.connection,done);
  })
})

describe('UPDATE COHORT', function() {
  it('should invoke callback done', function(done) {
    Cohort.update(db.connection,{id:9,name:'1997'},done)
  })
})

describe('DELETES COHORT', function() {
  it('should invoke callback done', function(done) {
    Cohort.delete(db.connection,9,done);
  })
})
