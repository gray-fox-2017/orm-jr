"use strict"

let sqlite3 = require('sqlite3')
class DBModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename)

  }

  setup() {
    this.createStudent()
    .then(() => {console.log("Success created Student table");})
    .catch((err) => {console.log(err);})

    this.createCohort()
    .then(() => {console.log("Success created Cohort table");})
    .catch((err) => {console.log(err);})
  }

  createStudent() {
    let db = this.connection
    return new Promise((resolve, reject) => {
      let query = `CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), cohort_id INTEGER);`;
      db.serialize(function () {
        db.run(query, function (err) {
          if (!err) {
            return resolve("Successfull added data")
          } else {
            return reject(err)
          }
        });
      });
    });
  }

  createCohort() {
    let db = this.connection
    return new Promise((resolve, reject) => {
      let query = `CREATE TABLE cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name);`;
      db.serialize(function () {
        db.run(query, function (err) {
          if (!err) {
            return resolve("Successfull added data")
          } else {
            return reject(err)
          }
        });
      });
    });
  }

}

export default DBModel
