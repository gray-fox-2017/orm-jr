"use strict"

// import Student from "./student.js";

class Cohort {
  constructor(data){
    this.id = data.id;
    this.name = data.name
  }

  static create(db, cohort){
    let query = `insert into cohorts (name) values ('${cohort.name}')`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) {
          console.log('Data berhasil ditambahkan');
        }
        else console.log(err);
      })
    })
  }

  static findAll(db, callback){
    let query = 'select * from cohorts'

    db.serialize(function(){
      db.all(query, function(err, rows){
        callback(err, rows);
      })
    })
  }

  static update(db, cohort){
    let query = `UPDATE cohorts SET name = '${cohort.name}' where id = ${cohort.id}`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) {
          console.log('Data berhasil diupdate');
        }
        else console.log(err);
      })
    })
  }

  static delete(db, id_cohort){
    let query = `DELETE FROM cohorts where id = ${id_cohort}`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) {
          console.log('Data berhasil diupdate');
        }
        else console.log(err);
      })
    })
  }

  static findById(db, id_cohort){
    let query = `select * from cohorts where id = ${id_cohort}`

    db.serialize(function(){
      db.all(query, function(err, rows){
        if(!err) console.log(rows);
        else console.log(err);
      })
    })
  }

  static where(db, cohort, callback){
    let query = `select * from cohorts where `
    
    if(cohort.hasOwnProperty('name')){
      query += `name = '${cohort.name}'`
    } else (
      console.log('harap masukan query yang benar!')
    )
    db.serialize(function(){
      db.all(query, function(err, rows){
        return callback(err, rows);
      })
    })
  }
}

// export default Cohort
module.exports = Cohort;
