"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id){
    this.id = id;
    this.name = name;
  }
  static create(db, name){
    let ADD_COHORT = `INSERT INTO cohorts (name) VALUES ('${name.name}')`
    db.serialize(function(){
	    db.run(ADD_COHORT, function(err){
	      if (err) {
	        console.log(err);
	      } else {
	        console.log(` Succesfully added data to the cohorts table`);
	        return true
	      }
	    })
    })
  }

  static show(db){
    let SHOW_ALL_COHORT = `SELECT * FROM cohorts`
    db.serialize(function() {
      db.each(SHOW_ALL_COHORT, function(err, row){
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static delete(db, id){
    let DELETE_COHORT = `DELETE FROM cohorts WHERE id = ${id}`
	  db.serialize(function(){
	    db.run(DELETE_COHORT, function(err){
	      if (err) {
	        console.log(err);
	      } else {
	        console.log(`Cohort with id ${id} deleted`);
	      }
	    })
	  })
  }

  static update (db, data) {
    let UPDATE_COHORT = `UPDATE cohorts SET name = '${data.name}'  WHERE id = ${data.id} `
    console.log(UPDATE_COHORT);
    db.serialize(function(){
      db.run(UPDATE_COHORT, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`Cohort update Succesfully`);
        }
      })
    })
  } //Need Revision

  static findById(db, id) {
    var FIND_ID_COHORT = `SELECT * FROM cohorts WHERE id = ${id}`;
    db.each(FIND_ID_COHORT, function(err, row) {
      if(err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }

  static findAll (db, callback) {
    var FIND_ALL_CHORT = "SELECT * FROM cohorts"
    db.all(FIND_ALL_CHORT, function(err, rows) {
      callback(rows, err)
    })
  }

  static where (db, str, callback) {
    var WHERE_COHORT = `SELECT * FROM cohorts WHERE ${str}`
    db.all(WHERE_COHORT, function(err, rows) {
      callback(rows, err)
    })
  }

  static findOrCreate(db, object) {
    var INSERT_COHORT = `INSERT INTO cohorts (name) VALUES ('${object.name}')`
    var CHECK_COHORT = `SELECT * FROM cohorts WHERE name ='${object.name}'`

    db.all(CHECK_COHORT, function(err,data) {
      console.log(data);
      if(data.length) {
        console.log('Data cohort already exist');
      } else {
        db.serialize( function(){
          db.run(INSERT_COHORT, function(err) {
            if(err) {
              console.log(err);
            } else {
              console.log("Cohort Added Succesfully");
            }
          })
        })
      }
    })
  }


}//End of class Cohort

export default Cohort
