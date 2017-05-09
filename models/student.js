"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/student.db')

class Student {
  constructor(firstname,lastname,cohort_id,id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
    this.id = id || null
  }

  static create(connection,student){
    let query = `INSERT into students (firstname,lastname,cohort_id) values ('${student.firstname}','${student.lastname}','${student.cohort_id}')`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log(`${student.firstname} ${student.lastname} Added!`);
      }
    })
  }
  
  static update(connection,student){
    let query = `Update students set firstname = '${student.firstname}', lastname = '${student.lastname}', cohort_id = '${student.cohort_id}' where id = '${student.id}'`
    db.run(query,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(`Update Success!`);
      }
    })
  }
  
  static findAll(connection,student = {},callback){
    let query = `Select * from students limit ${student.limit} offset ${student.offset}`
    db.all(query,function(err,rows){
      if(!err){
        return callback(null,rows)
      }
      else{
        return callback(err,null)
      }      
    })
  }
  
  static read(connection){
    let query = `SELECT students.id, students.firstname, students.lastname, students.cohort_id, cohorts.name as cohort from students inner join cohorts on students.cohort_id = cohorts.id`
    db.all(query,function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        console.log(rows);
      }
    })
  }
  
  
  
// SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
// FROM Orders
// INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID; 
  
  static delete(connection,id){
    let query = `Delete from students where id = '${id}'`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(`Delete Success`);
      }
    })
  }
  
  static where(connection,firstname,callback){
    let query = `Select * from students where ${firstname}`
    db.all(query,function(err,rows){
      if(!err){
        return callback(null,rows)
      }
      else{
        return callback(err,null)
      }
    })
  }
  
  static findById(connection,id){
    let query = `Select * from students where id = '${id}'`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
        console.log(`${data.firstname} | ${data.lastname} | ${data.cohort_id}`);
        })
      }
    })
  }
  
  static findOrCreate(connection, student) {
    var INSERT_QUERY  = `INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${student.firstname}', '${student.lastname}', '${student.cohort_id}')`
    var CHECK_QUERY   = `SELECT * FROM students WHERE firstname = '${student.firstname}' AND lastname = '${student.lastname}'`

    db.all(CHECK_QUERY, function(err, data) {
      if(data.length) {
        console.log('data already exists');
      } else {
        db.serialize(function() {
          db.run(INSERT_QUERY, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Student Added");
            }
          });
        });
      }
    })
  }
  
  static help(){
    console.log(`================ Student Database Command List ================ \n`);
    console.log(`- Student.create(dbModel.connection,new Student(<firstname>,<lastname>,<cohort_id>))\n`);
    console.log(`- Student.update(dbModel.connection,new Student(<firstname>,<lastname>,<cohort_id>,<id>))\n`);
    console.log(`- Student.findOrCreate(dbModel.connection,new Student(<firstname>,<lastname>,<cohort_id>))\n`);  
    console.log(`- Student.delete(dbModel.connection,<id>)\n`);
    console.log(`- Student.findById(dbModel.connection,<id>)\n`);
    console.log(`- Student.findAll(dbModel.connection,*callback*\n`);
    console.log(`- Student.where(dbModel.connection,*callback*)\n`);  
  }
}

export default Student
