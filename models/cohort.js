"use strict"

class Cohort {
  constructor(datas) {
    this.name = datas.name;
    this.id = datas.id;
  }
  static create(db, Cohort) {
    let query = `
    INSERT OR IGNORE INTO cohorts (name)
    VALUES('${Cohort.name}')`;
    db.serialize( () =>{
      db.run(query,(err)=>{
          console.log(err? '[FAILED] to create': 'CREATED')
      });
    });
  }
  static update(db, Cohort) {
    let query = `UPDATE cohorts SET name = '${Cohort.name}' WHERE id = ${Cohort.id}`;
    db.serialize( () =>{
      db.run(query,(err)=>{
        console.log(err? `[FAILED] to update ${Cohort.id}`: `UPDATED ${Cohort.id}`)
      });
    });
  }
  static deletes(db, id) {
    let query = `DELETE FROM cohorts where id =${id}`;
    db.serialize( () => {
      db.run(query,(err) => {
        console.log(err?`[FAILED] to delete ${id}`:`${id} DELETED`);
      })
    })
  }
  static findById(db, id,callback) {
    let query = `SELECT * FROM cohorts WHERE id = ${id} `;
    db.serialize(()=>{
      db.all(query,(err,rows)=>{
        callback(err,rows);
      })
    });
  }
  static findAll(db, request,callback) {

    let query = `SELECT * FROM cohorts`;
    if (request && request.hasOwnProperty('limit')) query+= ` LIMIT ${request.limit}`;
    if (request && request.hasOwnProperty('offset')) query+= ` OFFSET ${request.offset}`;
    db.serialize(()=>{
      db.all(query,(err,rows)=>{ callback(err,rows);  })
    })
  }
  static where(db, where,callback){
    let query = `SELECT * FROM cohorts WHERE ${where}`;
    db.serialize(()=>{
      db.all(query,(err,rows)=>{
        callback(err,rows);
      });
    });
  }
  static findOrCreate(db, Cohort) {
    let query = `
      INSERT INTO cohort (name)
      SELECT '${cohort.name}'
      FROM cohort
      WHERE id NOT IN (
        SELECT id
        FROM students
        WHERE
          name = '${cohort.name}'
      )`;
    db.serialize( () => {
      db.run(query,(err) => {
        console.log(err? '[FAILED] to create or find': 'CREATED or find')
      })
    });
  }

}

module.exports = {Cohort} ;