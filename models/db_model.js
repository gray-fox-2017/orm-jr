"use strict"

const sqlite = require('sqlite3').verbose();

// SQL Statement
//var CT_STUDENTS = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(30) UNIQUE, lastname VARCHAR(30), cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohorts(id))`;

var CT_STUDENTS = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100) UNIQUE, last_name VARCHAR(100), cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohorts(id))`
var CT_COHORTS = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) UNIQUE)`;

class DBModel {
  constructor(file) {
    this.connection = new sqlite.Database(file);
  }

  setup() {
    let db = this.connection;
    db.serialize(() => {
      db.run(CT_STUDENTS, err => {
        err ? console.log(err) : console.log(`Table students is created`)
      });
      db.run(CT_COHORTS, err => {
        err ? console.log(err) : console.log(`Table cohorts is created`)
      });
    });
  }
}

module.exports = DBModel;

//class DBModel {
//
//}

//export default DBModel
