"use strict"
const sqlite3 = require("sqlite3").verbose();

class DBModel {
  constructor(filename){
      this.connection = new sqlite3.Database(filename)
  }
  
  setup(){
    let db = this.connection

    var student = 'CREATE TABLE IF NOT EXISTS students (id integer primary key autoincrement,firstname TEXT NOT NULL, lastname text not null,cohort_id integer)';
    var cohort = 'CREATE TABLE IF NOT EXISTS cohorts (id integer primary key autoincrement, name TEXT NOT NULL)';

    
      db.serialize(function(){
        db.run(student,function(err){
          if(err){
            console.log(err);
          }
          else {
            console.log('CREATE TABLE students')
          }
        })
      })

      db.serialize(function(){
        db.run(cohort,function(err){
          if(err){
            console.log(err);
          }
          else {
            console.log('CREATE TABLE cohorts')
          }
        })
      })
    }  
}

export default DBModel
