"use strict"

import DBModel from "./db_model.js";

class Student {
  constructor(firstname, lastname, cohort_id,id){
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohort_id = cohort_id;
    this.id = id;
  }

  static create(db,student){
    let add = `INSERT INTO students(firstname,lastname,cohort_id)
               VALUES('${student.firstname}','${student.lastname}','${student.cohort_id}')`;
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


  static update(db,student){
    let update = `UPDATE students SET firstname = '${student.firstname}', lastname = '${student.lastname}', cohort_id = '${student.cohort_id}'
                  WHERE students.id = ${student.id}`;
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
  let deleteData = `DELETE FROM students WHERE id = '${id}'`;
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
  let show = `SELECT * FROM students WHERE id = '${id}'`;
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

static findAll(db, option = {limit: 100, offset: 0},callback){
  let show = `SELECT students.*, cohorts.name
              FROM students LEFT JOIN cohorts ON students.cohort_id = cohorts.id
              LIMIT ${option.limit} OFFSET ${option.offset}`;
  db.serialize(function(){
    db.all(show, function(err,rows){
      if (err) {
        callback(err,null);
      }else {
        callback(null,rows);
      }
    });
  });
}

static findOrCreate(db, student){
  let check = `SELECT * FROM students WHERE firstname = '${student.firstname}' AND lastname = '${student.lastname}' AND cohort_id = '${student.cohort_id}'`;
  let add = `INSERT INTO students(firstname,lastname,cohort_id) VALUES('${student.firstname}','${student.lastname}','${student.cohort_id}')`;
  db.serialize(function(){
    db.all(check, function(err,data){
      if(!err && data.length > 0){
        console.log('data already exist!');
      }else {
        db.serialize(function(){
          db.run(add,function(err,data){
            if (err) {
              console.log(err);
            }else {
              console.log(add);
            }
          })
        })
      }
    })
  });
}


static where(db,value,callback){
  let show = `SELECT * FROM students WHERE firstname = '${value}'`;
  db.serialize(function(){
    db.all(show, function(err,rows){
      if (err) {
        callback(err,null);
      }else {
        callback(null,rows);
      }
    });
  });
}

static help(){
  let help = `create(db,student)\n update(db,student)\n delete(db, id)\n findByID(db, id)\n findAll(db, callback)\n where(db,value,callback)`;
  console.log(help);
}

}

export default Student
