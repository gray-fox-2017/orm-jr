"use strict"

class Student {
  constructor(){

  }

  static create(connection,student){
    let query = `INSERT into students (firstname,lastname,id) values ('${student.firstname}','${student.lastname}','${student.student_id}')`
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
    let query = ``
  }
}

export default Student
