"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id) {
      this.name = name;
      this.id = id;
  }

  static create(db, obj) {
    db.serialize(() => {
     db.run(`INSERT INTO cohorts (name) VALUES ('${name}');`, (err) => err ? console.log(err) : console.log('COHORT ADDED'));
   });
  }
  static update(db, obj) {
    db.serialize(() => {
      db.run(`UPDATE cohorts SET name = '${obj.name}' WHERE id = ${obj.id};`, (err) => err ? console.log(err) : console.log('COHORT UPDATED'));
    });
  }

  static delete(db, id) {
    db.serialize(() => {
      db.run(`DELETE FROM cohorts WHERE id = ${id};`, (err) => err ? console.log(err) : console.log('COHORT DELETED'));
    });
  }

  static findById(db, id) {
    db.each(`SELECT * FROM student WHERE id = '${id}';`, (err,data) => err ? console.log(err) : console.log(data));
  }

  static findAll(db, callback) {
    db.all('SELECT * FROM cohorts', callback);
  }

  static where(db, condition, callback) {
    db.all(`SELECT * FROM cohorts WHERE ${condition}`, callback);
  }

}

export default Cohort
