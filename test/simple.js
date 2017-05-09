const DBModel = require('../models/db_model.js')
const Student = require('../models/student.js')
const Cohort = require('../models/cohort.js')

var dbModel = new DBModel("../db/test.db")


describe('FINDALL STUDENT', function() {
  it('should invoke callback done', function(done) {
    Student.findAll(dbModel.connection, {limit:2, offset:0}, done);
  })
})
describe('CREATE STUDENT', function() {
  it('function run well', function() {
    Student.create(dbModel.connection, new Student({first_name:'Windianadd', last_name:'Krismanuya', id_cohort:1}));
  })
})
describe('UPDATE STUDENT', function() {
  it('function run well', function() {
    Student.update(dbModel.connection, new Student({first_name:'Windi', last_name:'Krism', id_cohort:1, id:1}));
  })
})
describe('DELETE STUDENT', function() {
  it('function run well', function() {
    Student.delete(dbModel.connection, 1);
  })
})
describe('FINDBYID STUDENT', function() {
  it('function run well', function() {
    Student.findById(dbModel.connection, 3);
  })
})
describe('WHERE STUDENT', function() {
  it('function run well', function(done) {
    Student.where(dbModel.connection, {first_name: 'windi'}, done);
  })
})
describe('FINDORCREATE STUDENT', function() {
  it('function run well', function() {
    Student.findOrCreate(dbModel.connection, new Student({first_name: 'Windianass', last_name: 'Krismanuyasd', id_cohort:2}));
  })
})

describe('FINDALL COHORT', function() {
  it('should invoke callback done', function(done) {
    Cohort.findAll(dbModel.connection, done);
  })
})
describe('CREATE COHORT', function() {
  it('function run well', function() {
    Cohort.create(dbModel.connection, new Cohort({name:'whatsapp group'}));
  })
})
describe('UPDATE COHORT', function() {
  it('function run well', function() {
    Cohort.update(dbModel.connection, new Cohort({name:'whatsapp group', id:1}));
  })
})
describe('DELETE COHORT', function() {
  it('function run well', function() {
    Cohort.delete(dbModel.connection, 1);
  })
})
describe('FINDBYID COHORT', function() {
  it('function run well', function() {
    Cohort.findById(dbModel.connection, 3);
  })
})
describe('WHERE COHORT', function() {
  it('function run well', function(done) {
    Cohort.where(dbModel.connection, {name: 'whatsapp group'}, done);
  })
})
