"use strict"

import Student from "./student.js";

class Cohort {
  constructor(id, name){
    this.id = id || null;
    this.name = name || null;
  }
  static create(db, objInput) {
    let query = `INSERT INTO cohorts (name) VALUES ('${objInput.name}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err) {
          console.log(
                      `Input data student success
                       name : ${objInput.name}`);
        } else {
          console.log(`Input yang anda masukan salah`);
        }
      })
    })
  }

  static update(db, objInput){
    let query = `UPDATE cohorts SET name = '${objInput.name}' WHERE id = '${objInput.id}'`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err) {
          console.log(
           `Data Id : ${objInput.id} update to
            name : ${objInput.name}`);
        } else {
          console.log(`Format update data salah!!!!`);
        }
      })
    })
  }

  static delete(db, id){
    let query = `DELETE FROM cohorts WHERE id = ${id}`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err) {
          console.log(`Data id : ${id} deleted`);
        } else {
          console.log(`Format delete data salah!!!!`);
        }
      })
    })
  }

  static findById(db, id){
    let query = `SELECT* FROM cohorts WHERE id = ${id}`;
    // db.serialize(()=>{
      db.each(query, (err, row)=>{
        if(!err) {
          console.log(row);
          let student = new Cohort(row.name, row.id);
          return student;
        } else {
          console.log(`Format findById data salah!!!!`);
        }
      })
    // })
  }

  // static findAll(db, callback) {
  //   let query = `SELECT * FROM cohorts`;
  //   db.serialize(()=>{
  //     db.all(query, (err, rows)=>{
  //       if(!err) {
  //         return callback(null, rows);
  //       } else {
  //         return callback(err)
  //       }
  //     })
  //   })
  // }

  static where(db, option, callback){
    let regex = /\s?=\s/
    let keyValue = option.split(regex);
    console.log(keyValue[0]);
    console.log(keyValue[1]);
    let query = `SELECT * FROM cohorts WHERE ${keyValue[0]} = ${keyValue[1]}`;
    console.log(query);
    db.serialize(()=>{
      db.all(query, (err, rows)=>{
        if(!err) {
          return callback(null, rows);
        } else {
          return callback(err)
        }
      })
    })
  }

  static findAll(db, boundry = {}, callback){
    let query = `SELECT * FROM cohorts limit ${boundry.limit} offset ${boundry.offset}`
    db.serialize(()=>{
      db.all(query, (err, rows)=>{
        if(!err){
          return callback(null, rows);
        } else {
          return callback(err)
        }
      })
    })
  }

  static findorCreate(db, objInput) {
    var query = `INSERT INTO cohorts (name) VALUES ('${objInput.name}')`
    var query_check = `SELECT * FROM cohorts WHERE name = '${objInput.name}'`
    console.log(`${objInput.name}`);
    db.all(query_check, (err, rows)=>{
      if (rows.length !== 0){
        console.log(`Data is Exist!!` + JSON.stringify(rows) );
      } else {
        db.serialize(()=>{
          db.run(query, (err)=>{
            if(!err) {
              console.log(`Data with name = ${objInput.name} Added!!`);
            } else {
              console.log(err);
            }
          })
        })
      }
    })
  }
}

export default Cohort
