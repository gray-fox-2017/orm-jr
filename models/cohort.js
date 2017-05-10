"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id){
    this.name = name;
    this.id = id;
  }

  static create(db,cohort){
    let add = `INSERT INTO cohorts(name) VALUES('${cohort.name}')`;
    db.serialize(function(){
      db.run(add, function(err){
        if (err) {
          console.log(err);
        }else {
          console.log(add);
        }
      })
    });
  }


  static update(db,cohort){
    let update = `UPDATE cohorts SET name = '${cohort.name}'
                  WHERE cohort.id = ${cohort.id}`;
    db.serialize(function(){
      db.run(update, function(err){
        if (err) {
          console.log(err);
        }else {
          console.log(update);
        }
      })
    });
  }

static delete(db, id){
  let deleteData = `DELETE FROM cohorts WHERE id = '${id}'`;
  db.serialize(function(){
    db.run(deleteData,function(err){
      if (err) {
        console.log(err);
      }else {
        console.log(deleteData);
      }
    });
  });
}

static findByID(db, id){
  let show = `SELECT * FROM cohorts WHERE id = '${id}'`;
  db.serialize(function(){
    db.each(show, function(err,rows){
      if (err) {
        console.log(err);
      }else {
        console.log(rows);
      }
    })
  });
}

static findAll(db, callback){
  let show = `SELECT cohorts.*, students.*
              FROM cohorts LEFT JOIN students ON cohorts.id = students.cohort_id`;
  db.serialize(function(){
    db.all(show, function(err,rows){
      if (err) {
        callback(null,err);
      }else {
        callback(rows); // kaya function(data,err)
      }
    });
  });
}

static where(db,value,callback){
  let show = `SELECT * FROM cohorts WHERE '${value}'`;
  db.serialize(function(){
    db.all(show, function(err,rows){
      if (err) {
        callback(null,err);
      }else {
        callback(rows);
      }
    });
  });
}

static help(){
  let help = `create(db,cohort)\n update(db,cohort)\n delete(db, id)\n findByID(db, id)\n findAll(db, callback)\n where(db,value,callback)`;
  console.log(help);
}

}
export default Cohort
