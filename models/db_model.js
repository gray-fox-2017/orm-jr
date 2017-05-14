"use strict"
const sqlite = require('sqlite3').verbose()

class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file)
  }
  setup(){
    let db = this.connection
    db.serialize(()=>{
      let query = `CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT(50) NOT NULL, lastName TEXT(50),cohort_id INTEGER)`
      db.run(query,(err)=>{
        if(!err){
          console.log('Students table created');
        } else {
          console.log(err);
        }
      })
    })
    db.serialize(()=>{
      let query = `CREATE TABLE IF NOT EXISTS Cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(50) NOT NULL)`
      db.run(query,(err)=>{
        if(!err){
          console.log('Cohorts table created');
        } else {
          console.log(err);
        }
      })
    })
  }
}

// export default DBModel
module.exports = DBModel