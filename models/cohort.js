"use strict"

const sqlite = require('sqlite3').verbose();

class Cohort {
  constructor (name, id=1) {
    this.name = name;
    this.id = id;
  }

  static create(db, cohort) {
    let query = `INSERT INTO cohorts (name) VALUES ('${cohort.name}');`;
    db.serialize(() => {
      db.run(query, (err) => {
        (!err) ? console.log(`Cohort data is inserted.`) : console.log(err)
      });
    });
  }

  static update(db, cohort) {
    let query = `UPDATE cohorts SET name = '${cohort.name}' WHERE id = ${cohort.id}`;
    db.serialize(() => {
      db.run(query, (err) => {
        (!err) ? console.log(`Cohort data is updated.`) : console.log(err)
      });
    });
  }

  static delete(db, id) {
    let query = `DELETE FROM cohorts WHERE id = ${id};`
    db.serialize(() => {
      db.run(query, (err) => {
        (!err) ? console.log(`Cohort data is deleted.`) : console.log(err)
      });
    });
  }

  static findById(db, id) {
    let query = `SELECT * FROM cohorts WHERE id = ${id};`
    db.serialize(() => {
      db.all(query, (err,rows) => {
        (!err) ? console.log(rows) : console.log(err)
      });
    });
  }

  static findAll(db, callback) {
    let query = `SELECT * FROM cohorts;`
    db.serialize(() => {
      db.all(query, (err,rows) => {
        callback(rows,err);
      });
    });
  }

  static where(db, searchValue, callback) {
    let query = `SELECT * FROM cohorts WHERE ${searchValue};`
    db.serialize(() => {
      db.all(query, (err,rows) => {
        callback(rows,err);
      });
    });
  }
}

module.exports = Cohort;
//export default cohort
