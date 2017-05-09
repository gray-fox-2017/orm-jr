"use strict"

var sqlite3 = require('sqlite3').verbose();
//var index = require('./index.js');
//var repl = require('repl');

//var replServer = repl.start();

class DBModel {
  constructor(filedb) {
    this.connection = new sqlite3.Database(filedb);
  }

  setup(){
    let db = this.connection;
    // var db = new DBModel('./db/student.db')
    // console.log(db.connection);

    var CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name text not null,id_cohorts integer)';
    var CREATE_TABLE2 = 'CREATE TABLE IF NOT EXISTS cohorts (id integer primary key AUTOINCREMENT, name TEXT NOT NULL)';


      db.serialize(function(){
        db.run(CREATE_TABLE,function(err){
          if(err){
            console.log(err);
          }
          else {
            console.log('CREATE TABLE students')
          }
        })
      })

      db.serialize(function(){
        db.run(CREATE_TABLE2,function(err){
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
