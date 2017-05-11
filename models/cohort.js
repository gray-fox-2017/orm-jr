"use strict"

import Student from "./student.js";

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('./db/student.db')

class Cohort {
  constructor(name, id) {
    this.name = name
    this.id = id || null
  }

  static create(conn, value) {
    db.serialize(function() {
      let query = `INSERT INTO cohorts (name) VALUES ('${value.name}')`
      console.log(query);
      db.run(query, function(err) {
        if (!err) console.log("success");
        else console.log(err);
      })
    })
  }

  static update(conn, value) {
    db.serialize(function() {
      let query = `UPDATE cohorts SET name = '${value.name}' WHERE id = ${value.id}`
      console.log(query);
      db.run(query, function(err) {
        if (!err) console.log("success");
        else console.log(err);
      })
    })
  }

  static delete(conn, id) {
    db.serialize(function() {
      let query = `DELETE FROM cohorts WHERE id = ${id}`
      console.log(query);
      db.run(query, function(err) {
        if (!err) console.log("success");
        else console.log(err);
      })
    })
  }

  static findById(conn, id) {
    db.serialize(function() {
      let query = `SELECT * FROM cohorts where id = ${id}`
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

  static findAll(conn) {
    db.serialize(function() {
      let query = `SELECT * FROM cohorts`
      console.log(query);
      db.all(query, function(err, rows) {
        if (!err) {//return callback(null, rows)
          rows.forEach((data) => {
            console.log(`${data.id}, ${data.name}`);
          })
        } else console.log("tes : "+err);
      })
    })
  }

  static findAll_limit(conn, value = {}, callback) {
    db.serialize(function() {
      let query = `SELECT * FROM cohorts limit ${value.limit} offset ${value.offset}`
      console.log(query);
      db.all(query, function(err, rows) {
        if(!err) return callback(null,rows)
        else return callback(err,null)
      })
    })
  }

  static where(conn, value) {
    db.serialize(function() {
      let query = `SELECT * FROM cohorts WHERE name = '${value.name}'`
      console.log(query);
      db.all(query, function(err, rows) {
        if (!err) {//return callback(null, rows)
          rows.forEach((data) => {
            console.log(`${data.id}, ${data.name}`);
          })
        } else console.log("tes : "+err);
      })
    })
  }

  static findOrCreate(conn, value){
    let query = `INSERT INTO cohorts (name) select '${value.name}'
    WHERE NOT EXISTS (SELECT 1 FROM cohorts WHERE name = '${value.name}'`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) console.log('success');
        else console.log(err);
      })
    })
  }

  static help() {
    console.log('\n');
    console.log('===========================================================================================');
    console.log('                                       MENU HELP                                           ');
    console.log('===========================================================================================');
    console.log('type :');
    console.log('     create()                                                              : to add student');
    console.log('     update()                                                  : to update value of student');
    console.log('     delete()                                             : to delete data of student by id');
    console.log('     findById()                       : to read first_name and last_name of student by name');
    console.log('     findAll()                                       : to read data by attribute of student');
    console.log('     findAll_limit()                                 : to read data by attribute of student');
    console.log('     where()                            : to read data student those birthday in this month');
    console.log('     findOrCreate()                                      : to create data if data not found');
    console.log('===========================================================================================');
  }



}

export default Cohort
