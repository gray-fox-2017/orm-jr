"use strict"

class Student {
  constructor(datas) {
    this.firstname = datas.firstname;
    this.lastname = datas.lastname;
    this.cohort_id = datas.cohort_id;
    this.id = datas.id;
    // if(datas.hasOwnProperty('id')) this.id = datas.id;
    // else this.id = null;
  }
  static create(db, Student) {
    let query = `
    INSERT OR IGNORE INTO students (firstname,lastname,cohort_id)
    VALUES('${Student.firstname}','${Student.lastname}',${Student.cohort_id})`;
      db.serialize( () =>{
        db.run(query,(err)=>{
          console.log(err? '[FAILED] to create': 'CREATED')
        });
      });
  }
  static update(db, Student) {
    let query = `UPDATE students SET firstname = '${Student.firstname}', lastname = '${Student.lastname}', cohort_id = ${Student.cohort_id} WHERE id = ${Student.id}`;
      db.serialize( () =>{
        db.run(query,(err)=>{
          console.log(err? `[FAILED] to update ${Student.id}`: `UPDATED ${Student.id}`)
        });
      });
  }
  static deletes(db, id) {
    let query = `DELETE FROM students where id =${id}`;
    db.serialize( () => {
      db.run(query,(err) => {
        console.log(err?`[FAILED] to delete ${id}`:`${id} DELETED`);
      })
    });

  }
  static findById(db, id,callback) {
    let query = `SELECT * FROM students WHERE id = ${id} `;
    db.serialize(()=>{
      db.all(query,(err,rows)=>{
        callback(err,rows);
      })
    })
  }
  static findAll(db,request,callback) {
    let query = `SELECT * FROM students`;
    if (request && request.hasOwnProperty('limit')) query+= ` LIMIT ${request.limit}`;
    if (request &&  request.hasOwnProperty('offset')) query+= ` OFFSET ${request.offset}`;
    db.serialize(()=>{
      db.all(query,(err,rows)=>{
        callback(err,rows);
      })
    })
  }
  static where(db,where,callback){
    let query = `SELECT * FROM students WHERE ${where}`;
    db.serialize(()=>{
      db.all(query,(err,rows)=>{
        callback(err,rows);
      });
    });
  }
  static findOrCreate(db, Student) {
    let query = `
      INSERT INTO students (firstname,lastname,cohort_id)
      SELECT '${student.firstname}','${student.lastname}',${student.cohort_id}
      FROM students
      WHERE id NOT IN (
        SELECT id
        FROM students
        WHERE
          cohort_id = ${student.cohort_id} AND
          firstname = '${student.firstname}' AND
          lastname = '${student.lastname}'
      )`;
    // return new Promise((resolve,reject) => {
      db.serialize( () =>{
        db.run(query,(err)=>{
          console.log(err? '[FAILED] to create or find': 'CREATED or find')
          // return (err? reject(err):resolve());
        });
      });
    // });
  }

}

module.exports = {Student} ;