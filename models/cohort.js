"use strict"

import Student from "./student.js";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/student.db')

class Cohort {
  constructor(id,name){
    this.id = id || null
    this.name = name
  }
  
  static create(connection,name){
    let query = `INSERT into cohorts (name) values ('${name}')`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log(`${name} Added!`);
      }
    })
  }
  
  static update(connection,cohort){
    let query = `Update cohorts set name = '${cohort.name}' where id = '${cohort.id}'`
    db.run(query,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(`Update Success!`);
      }
    })
  }
  
  static read(connection){
    let query = `SELECT students.id, students.firstname, students.lastname, students.cohort_id, cohorts.name as cohort from students left join cohorts on students.cohort_id = cohorts.id`
    db.all(query,function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        console.log(rows);
      }
    })
  }
  
  static delete(connection,id){
    let query = `Delete from cohorts where id = '${id}'`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(`Delete Success`);
      }
    })
  }
  
  static findById(connection,id){
    let query = `Select * from cohorts where id = '${id}'`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
        console.log(`${data.firstname} | ${data.lastname} | ${data.cohort_id}`);
        })
      }
    })
  }
  
  static where(connection,name,callback){
    let query = `Select * from cohorts where ${name}`
    db.all(query,function(err,rows){
      if(!err){
        return callback(null,rows)
      }
      else{
        return callback(err,null)
      }
    })
  }
  
  static findOrCreate(connection, cohort) {
    var INSERT_QUERY  = `INSERT INTO cohorts (name) VALUES ('${cohort.name}')`
    var CHECK_QUERY   = `SELECT * FROM cohorts WHERE name = '${cohort.name}')` 
    db.all(CHECK_QUERY, function(err, data) {
      if(data.length) {
        console.log('data already exists');
      } else {
        db.serialize(function() {
          db.run(INSERT_QUERY, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Cohort Added");
            }
          });
        });
      }
    })
  }
  
  static findAll(connection,cohort = {},callback){
    let query = `Select * from cohorts limit ${cohort.limit} offset ${cohort.offset}`
    db.all(query,function(err,rows){
      if(!err){
        return callback(null,rows)
      }
      else{
        return callback(err,null)
      }      
    })
  }
  
}

export default Cohort
