"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/student.db');

class Student {
  constructor(firstname, lastname, cohort, id) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohort = cohort;
    this.id = id;
  }

  static create(obj) {
    let query = `INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${obj.firstname}', '${obj.lastname}', ${obj.cohort});`
    db.serialize(function () {
      db.run(query, function(err) {
        if (!err) console.log('Murid baru berhasil di insert!');
        else console.log(err);
      })
    })
  }

  static update(obj) {
    let query = `UPDATE student SET firstname = '${obj.firstname}', lastname = '${obj.lastnama}' WHERE id = ${obj.id}`
    db.serialize(function () {
      dr.run(query, function(err) {
        if (!err) console.log('Update berhasil!!');
        else console.log(err);
      })
    })
  }

  static delete(id) {
    let query = `DELETE FROM student WHERE id = ${id}`
    db.serialize(function () {
      db.run(query, function(err) {
        if (!err) console.log('Penghapusan berhasil')
        else console.log(err);
      })
    })
  }

  static findByID(id) {
    let query = `SELECT * FROM student WHERE id = ${id}`
    db.serialize(function () {
      db.all(query, function(err,row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static cariSemua() {
    let query = `SELECT * FROM student`
    return new Promise(function(resolve, reject) {
      db.serialize(() => {
        db.all(query, (err, row) => {
          if (err) reject(err)
          else resolve(row);
        })
      })
    })
  }

  static findAll() {
    Student.cariSemua()
    .then( row => {
      for (let i = 0; i<row.length;i++) {
        console.log(`${i+1}. ${row[i].firstname} ${row[i].lastname}`);
      }
    })
    .catch( err => console.log(err));
  }

  static pilter(str) {
    let query = `SELECT * FROM student WHERE ${str}`
    return new Promise(function(resolve, reject) {
      db.serialize(function() {
        db.all(query, function(err, row) {
          if (err) reject(err)
          else resolve(row);
        })
      })
    })
  }

  static where(str) {
    Student.pilter(str)
    .then( row => {
      for (let i = 0; i < row.length; i++) {
        console.log(`${i+1}. ${row[i].firstname} ${row[i].lastname}`);
      }
    })
    .catch( err => console.log(err));
  }

}

// Student.create(db, new Student('Saiful', 'Juki', 1))
module.exports = Student;
