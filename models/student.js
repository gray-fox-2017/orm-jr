"use strict"

class Student {
  constructor(firstname, lastname, cohort_id, id) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohort_id = cohort_id;
    this.id = id;
  }

  static create(db, obj) {
    db.serialize(() => {
     db.run(`INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${obj.firstname}', '${obj.lastname}', '${obj.cohort_id}');`,
     (err) => err ? console.log(err) : console.log('STUDENT ADDED'));
   });
  }

  static update(db, obj) {
    db.serialize(() => {
      db.run(`UPDATE students SET firstname = '${obj.firstname}', lastname = '${obj.lastname}', cohort_id = '${obj.cohort_id}' WHERE id = ${obj.id};`,
      (err) => err ? console.log(err) : console.log('STUDENT UPDATED'));
    });
  }

  static delete(db, id) {
    db.serialize(() => {
      db.run(`DELETE FROM students WHERE id = ${id};`, (err) =>  err ? console.log(err) : console.log('STUDENT DELETED'));
    });
  }

  static findById(db, id) {
    db.each(`SELECT * FROM students WHERE id = '${id}';`, (err,data) => err ? console.log(err) : console.log(data));
  }

  static findAll(db, callback) {
    db.all('SELECT * FROM students', callback);
  }

  static where(db, condition, callback) {
    db.all(`SELECT * FROM students WHERE ${condition}`, callback);
  }
}

export default Student
