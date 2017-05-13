"use strict"

class Student {
  constructor(first_name, last_name, cohort_id, id){
    this.first_name = first_name || null;
    this.last_name = last_name || null;
    this.id = id || null;
    this.cohort_id = cohort_id || null;
  }

  static create(db, objInput) {
    let query = `INSERT INTO students (first_name, last_name, id) VALUES ('${objInput.first_name}', '${objInput.last_name}', '${objInput.id}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err) {
          console.log(
                      `Input data student success
                       first_name : ${objInput.first_name}
                       last_name : ${objInput.last_name}
                       id : ${objInput.id}`);
        } else {
          console.log(`Input yang anda masukan salah`);
        }
      })
    })
  }

  static update(db, objInput){
    let query = `UPDATE students SET first_name = '${objInput.first_name}', last_name = '${objInput.last_name}', cohort_id= '${objInput.cohort_id}', id = '${objInput.id}' WHERE id = '${objInput.id}'`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err) {
          console.log(
           `Data Id : ${objInput.id} update to
            first_name : ${objInput.first_name}
            last_name : ${objInput.last_name}
            id : ${objInput.id}
            id_cohort : ${objInput.cohort_id}`);
        } else {
          console.log(`Format update data salah!!!!`);
        }
      })
    })
  }

  static delete(db, id){
    let query = `DELETE FROM students WHERE id = ${id}`;
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
    let query = `SELECT* FROM students WHERE id = ${id}`;
    // db.serialize(()=>{
      db.each(query, (err, row)=>{
        if(!err) {
          console.log(row);
          let student = new Student(row.first_name, row.last_name, row.cohort_id, row.id);
          return student;
        } else {
          console.log(`Format findById data salah!!!!`);
        }
      })
    // })
  }

  // static findAll(db, callback) {
  //   let query = `SELECT * FROM students`;
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
    let query = `SELECT * FROM students WHERE ${keyValue[0]} = ${keyValue[1]}`;
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
    let query = `SELECT * FROM students limit ${boundry.limit} offset ${boundry.offset}`
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
    var query = `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${objInput.first_name}', '${objInput.last_name}', '${objInput.cohort_id}')`
    var query_check = `SELECT * FROM students WHERE (first_name = '${objInput.first_name}' AND last_name = '${objInput.last_name}') AND cohort_id =${objInput.cohort_id}`
    console.log(`${objInput.first_name}`);
    db.all(query_check, (err, rows)=>{
      if (rows.length !== 0){
        console.log(`Data is Exist!!` + JSON.stringify(rows) );
      } else {
        db.serialize(()=>{
          db.run(query, (err)=>{
            if(!err) {
              console.log(`Data with first_name = ${objInput.first_name}, last_name = ${objInput.last_name} Added!!`);
            } else {
              console.log(err);
            }
          })
        })
      }
    })
  }
}



export default Student
