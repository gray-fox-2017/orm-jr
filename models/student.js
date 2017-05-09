"use strict"

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('./db/student.db')

class Student {
  constructor(first_name, last_name, id_cohorts, id) {

    this.first_name = first_name
    this.last_name = last_name
    this.id_cohorts = id_cohorts
    this.id = id || null

  }

  static create(conn, value) {
    db.serialize(function() {
      let query = `INSERT INTO students (first_name,last_name,id_cohorts) VALUES ('${value.first_name}','${value.last_name}', ${value.id_cohorts})`
      console.log(query);
      db.run(query, function(err) {
        if (!err) console.log("success");
        else console.log(err);
      })
    })
  }

  static update(conn, value) {
    db.serialize(function() {
      let query = `UPDATE students SET first_name = '${value.first_name}', last_name = '${value.last_name}', id_cohorts = ${value.id_cohorts} WHERE id = ${value.id}`
      console.log(query);
      db.run(query, function(err) {
        if (!err) console.log("success");
        else console.log(err);
      })
    })
  }

  static delete(conn, id) {
    db.serialize(function() {
      let query = `DELETE FROM students WHERE id = ${id}`
      console.log(query);
      db.run(query, function(err) {
        if (!err) console.log("success");
        else console.log(err);
      })
    })
  }

  static findById(conn, id) {
    db.serialize(function() {
      let query = `SELECT * FROM students where id = ${id}`
      console.log(query);
      db.all(query, function(err, rows) {
        if (!err) {//return callback(null, rows)
          console.log(rows);
        } else {
          console.log(err);
        }
        //   rows.forEach((data) => {
        //     console.log(`${data.id}, ${data.first_name}, ${data.last_name}, ${data.id_cohorts}`);
        //   })
        // } else console.log("tes : "+err);
      })
    })
  }

  static findAll(conn, value = {}) {
    db.serialize(function() {
      let query = `SELECT * FROM students limit ${value.limit} offset ${value.limit}`
      console.log(query);
      db.all(query, function(err, rows) {
        if (!err) {//return callback(null, rows)
          rows.forEach((data) => {
            console.log(`${data.id}, ${data.first_name}, ${data.last_name}, ${data.id_cohorts}`);
          })
        } else console.log("tes : "+err);
      })
    })
  }

  static where(conn, value) {
    db.serialize(function() {
      let query = `SELECT * FROM students WHERE first_name = '${value.first_name}'`
      console.log(query);
      db.all(query, function(err, rows) {
        if (!err) {//return callback(null, rows)
          rows.forEach((data) => {
            console.log(`${data.id}, ${data.first_name}, ${data.last_name}, ${data.id_cohorts}`);
          })
        } else console.log("tes : "+err);
      })
    })
  }


}


export default Student
