"use strict"

const sqlite3 = require('sqlite3').verbose();

class DBModel {
  constructor(){
    this.connection = new sqlite3.Database('./db/student.db')
  }
  setup(){
    this.connection.serialize(() => {
      this.connection.run(`CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(30) UNIQUE, lastname VARCHAR(30),id_cohort INTEGER, FOREIGN KEY (id_cohort) REFERENCES cohorts(id));`, (err,result) => {
        if (err){
          console.log(err);
        } else {
          console.log("Create Table student success");
        }
      });
    });

    this.connection.serialize(() => {
      this.connection.run(`CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name VARCHAR(30) UNIQUE);`, (err,result) => {
        if (err){
          console.log(err);
        } else {
          console.log("Create Table cohort success");
        }
      });
    });
  }
}

export default DBModel
