"use strict"

class Student {
  constructor(firstName,lastName,cohort_id,id){
    this.firstName = firstName;
    this.lastName= lastName;
    this.cohort_id = cohort_id;
    this.id=id
  }
  static create(db,obj){
    let query = `INSERT into Students (firstName,lastName,cohort_id) VALUES ('${obj.firstName}','${obj.lastName}','${obj.cohort_id}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Data added');
        }
      })
    })
  }

  static update(db,obj){
    let query = `Update Students set firstName = '${obj.firstName}',lastName = '${obj.lastName}',cohort_id = ${obj.cohort_id} where id = ${obj.id};`
    db.serialize(()=>{
      db.run(query, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(`Student ${obj.id} Updated!`);
        }
      })
    })
  }

  static delete(db,id){
    let query = `Delete from Students where id = '${id}'`
    db.serialize(()=>{
      db.run(query,(err)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(`Student ${id} Deleted!`);
        }
      })
    })
  }

  static findAll(db,obj={limit:-1,offset:0}){
    let query = `Select * from Students LIMIT ${obj.limit} OFFSET ${obj.offset}`
    db.serialize(()=>{
      db.all(query, function(err,rows){
        if(err){
          console.log(err);
        } else {
          console.log(`Table Students list:\n`);
          rows.forEach((row)=>{
            console.log(`\n${row.id} | ${row.firstName} | ${row.lastName} | ${row.cohort_id}`);
          })
        }
      })
    })
  }

  static findById(db,id){
    let query = `Select * from Students where id = ${id}`
    db.serialize(()=>{
      db.all(query, function(err,rows){
        if(err){
          console.log(err);
        } else {
          console.log(`Table Students list where id = ${id}:`);
          rows.forEach((row)=>{
            console.log(`\n${row.id} | ${row.firstName} | ${row.lastName} | ${row.cohort_id}`);
          })
        }
      })
    })
  }

  static where(db,condition){
    let query = `Select * from Students where ${condition}`
    db.serialize(()=>{
      db.all(query, function(err,rows){
        if(err){
          console.log(err);
        } else {
          console.log(`Table Students list where ${condition}`);
          rows.forEach((row)=>{
            console.log(`\n${row.id} | ${row.firstName} | ${row.lastName} | ${row.cohort_id}`);
          })
        }
      })
    })
  }

  static showRelation(db){
    let query = `SELECT Students.id, Students.firstName AS 'Student name', Cohorts.name AS 'Batch' FROM Students INNER JOIN Cohorts ON cohort_id=Cohorts.id`
    db.serialize(()=>{
      db.all(query,(err,rows)=>{
        if(!err){
          console.log(rows);
        }else{
          console.log(err);
        }
      })
    })
  }

  static findOrCreate(db, obj) {
    var INSERT_QUERY  = `INSERT INTO Students (firstname, lastname, cohort_id) VALUES ('${obj.firstName}', '${obj.lastName}', '${obj.cohort_id}')`
    var CHECK_QUERY   = `SELECT * FROM Students WHERE firstName = '${obj.firstName}' AND lastName = '${obj.lastName}'`

    db.all(CHECK_QUERY, (err, data)=>{
      if(data.length) {
        console.log('data already exists');
      } else {
        db.run(INSERT_QUERY, (err)=>{
          if (err) {
            console.log(err);
          } else {
            console.log("Student Added");
          }
        });
      }
    })
  }

}


// export default Student
module.exports = Student;
