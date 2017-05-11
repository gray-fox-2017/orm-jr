"use strict"

const sqlite = require('sqlite3').verbose();

class Student {
  constructor (first_name, last_name, cohorts_id, id=1) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.cohorts_id = cohorts_id;
    this.id = id;
  }

  static create(db, student) {
    //let query = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES ('${student.first_name}', '${student.last_name}', ${student.cohorts_id}) WHERE EXISTS (SELECT id FROM cohorts WHERE id = ${student.cohorts_id})`;
    //db.serialize(() => {
    //  db.run((query,err) => {
    //    if (!errInsert) console.log (`Data is inserted`);
    //    else console.log(errInsert);
    //  });
    //});
    let id = false;
    let checkCohortsID = `SELECT id FROM cohorts`;
    let query = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES ('${student.first_name}', '${student.last_name}', ${student.cohorts_id})`;
    db.serialize(() => {
      db.all(checkCohortsID, (err,idRows) => {
        if (!err) {
          for (let i=0; i<idRows.length; i++) {
            if (idRows[i].id === student.cohorts_id) {
              id = true;
              break;
            }
          }
          if (id === true) {
            db.run(query, (errInsert) => {
              if (!errInsert) console.log(`Data is inserted`);
              else console.log(errInsert);
            });
          }
          else {
            console.log(`Data is not inserted since cohort doesn't exist. Please try with different cohorts id`);
          }
        }
      });
    });
  }

  static update(db, student) {
    let query = `UPDATE students SET first_name = '${student.first_name}', last_name = '${student.last_name}', cohorts_id = '${student.cohorts_id}' WHERE id = ${student.id}`;
    db.serialize(() => {
      db.run(query, (err) => {
        (!err) ? console.log(`Student data is updated`) : console.log(err)
      });
    });
  }

  static delete(db, id) {

  }

  static findById(db, id) {

  }

  static findAll(db, callback) {

  }

  static where(db, searchValue, callback) {

  }
}

module.exports = Student;
//export default Student
