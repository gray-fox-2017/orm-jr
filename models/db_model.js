"use strict"
const sqlite = require("sqlite3").verbose();

class DBModel {
  constructor(filename){
    this.connection = new sqlite.Database(filename);
  }
  setup(){
    let db = this.connection;
    let QueryCreateStudent = `CREATE TABLE IF NOT EXISTS Students(id integer primary key AUTOINCREMENT, first_name varchar(40), last_name VARCHAR(40), id_Cohorts integer, FOREIGN KEY(id_Cohorts) REFERENCES Cohorts)`;
    let QueryCreateCohorts = `CREATE TABLE IF NOT EXISTS Cohorts(id integer PRIMARY KEY AUTOINCREMENT, name)`;
    db.serialize(()=>{
      db.run(QueryCreateStudent,(err)=>{
        if(!err){
          console.log("Berhasil Create Table Students");
        }
        else{
          console.log(err);
        }
      })
      db.run(QueryCreateCohorts, (err) => {
        if (!err) {
          console.log("Berhasil Create Table Cohorts");
        }
        else{
          console.log(err);
        }
      });
    });
  }
}

module.exports = DBModel;
