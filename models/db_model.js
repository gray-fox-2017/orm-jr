"use strict"
const sqlite = require('sqlite3').verbose();



class DBModel {
  constructor(filename){
    this.connection = new sqlite.Database(filename);
  }

  setup(){
    let db = this.connection;
    console.log(db);
    let query_students = `CREATE TABLE IF NOT EXISTS students (first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_id INTEGER, FOREIGN KEY(cohort_id) references cohorts(id))`;

    db.serialize(()=>{
      db.run(query_students, (err)=>{
        if (!err) {
          console.log(`Create table students success!!!`);
        } else {
          console.log(`something wrong with your input`);
        }
      })
    })

    let query_cohorts = `CREATE TABLE IF NOT EXISTS cohorts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) NOT NULL)`;
    db.serialize(()=>{
      db.run(query_cohorts, (err)=>{
        if (!err) {
          console.log(`Create table cohorts success!!!`);
        } else {
          console.log(`something wrong with your input`);
        }
      })
    })
  }
}



export default DBModel
