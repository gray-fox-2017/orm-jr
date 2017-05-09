"use strict"

var sqlite3 = require('sqlite3').verbose();

class DBModel {
  constructor(filename){
    this.connection = new sqlite3.Database(filename);
  }
  setup(){
    let db = this.connection;
    db.serialize(function(){
      let query = `CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(30) UNIQUE, last_name VARCHAR(30), id_cohort INTEGER);`
      db.run(query, function(err){
        if (!err) {
          console.log('Create table students success.');
        }
        else console.log(err);;
        let query2 = `CREATE TABLE IF NOT EXISTS cohort(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) UNIQUE);`
        db.run(query2, function(err){
          if(!err) {
            console.log('Create table cohort success.');
          }
          else console.log(err);
        })
      })
    })

  }
}

module.exports = DBModel;
