"use strict"

class Student {
  constructor(data){
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.id_cohort = data.id_cohort;
  }

  static create(db, student){
    let query = `insert into students (first_name,last_name, id_cohort) values ('${student.first_name}', '${student.last_name}', ${student.id_cohort})`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) {
          console.log('Data berhasil ditambahkan');
        }
        else console.log(err);
      })
    })
  }

  static findAll(db, option, callback){
    let query = `select * from students left join cohorts on students.id_cohort = cohorts.id limit ${option.limit} offset ${option.offset}`

    db.serialize(function(){
      db.all(query, function(err, rows){
        callback(err, rows);
      })
    })
  }

  static update(db, student){
    let query = `UPDATE students SET first_name = '${student.first_name}', last_name = '${student.last_name}', id_cohort = ${student.id_cohort} where id = ${student.id}`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) {
          console.log('Data berhasil diupdate');
        }
        else console.log(err);
      })
    })
  }

  static delete(db, id_student){
    let query = `DELETE FROM students where id = ${id_student}`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) {
          console.log('Data berhasil diupdate');
        }
        else console.log(err);
      })
    })
  }

  static findById(db, id_student){
    let query = `select * from students left join cohorts on students.id_cohort = cohorts.id where students.id = ${id_student}`

    db.serialize(function(){
      db.all(query, function(err, rows){
        if(!err) console.log(rows);
        else console.log(err);
      })
    })
  }

  static where(db, student, callback){
    let query = `select * from students left join cohorts on students.id_cohort = cohorts.id where `
    if(student.hasOwnProperty('first_name')){
      query += `students.first_name = '${student.first_name}'`
    } else if (student.hasOwnProperty('last_name')){
      query += `students.last_name = '${student.last_name}'`
    } else if (student.hasOwnProperty('id_cohort')){
      query += `students.id_cohort = '${student.id_cohort}'`
    } else (
      console.log('harap masukan query yang benar!')
    )
    db.serialize(function(){
      db.all(query, function(err, rows){
        return callback(err, rows);
      })
    })
  }

  static findOrCreate(db, student){
    let query = `insert into students (first_name,last_name, id_cohort) select '${student.first_name}', '${student.last_name}', ${student.id_cohort} where not exists (select 1 from students where first_name = '${student.first_name}' and students.last_name='${student.last_name}' and students.id_cohort=${student.id_cohort})`

    db.serialize(function(){
      db.run(query, function(err){
        if (!err) {
          console.log('---->>');
        }
        else console.log(err);
      })
    })
  }
}

module.exports = Student;
