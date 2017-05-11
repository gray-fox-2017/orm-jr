"use strict"

class Student {
  constructor(firstname, lastname,id_cohort,id){
    this.firstname = firstname;
    this.lastname = lastname;
    this.id_cohort = id_cohort;
    this.id = id;
  }
  static create(database, data){
    database.serialize(()=>{
      database.run(`INSERT INTO students(firstname,lastname,id_cohort) VALUES('${data.firstname}','${data.lastname}',${data.id_cohort});`,(err,result)=>{
        if(err){
          console.log(err, "Input Data Error :( ");
        } else {
          console.log(`Input data ${data.firstname},${data.lastname},${data.id_cohort} sukses`);
        }
      })
    })
  }

  static read(database){
    database.serialize(()=>{
      database.all(`SELECT * FROM students;`,function(err,rows) {
        if (err){
          console.log(err);
        } else {
          rows.forEach(function(row) {
            console.log(row);
          })
        }
      })
    })
  }

  static update(database,data){
    database.serialize(()=>{
      database.run(`UPDATE students SET firstname = '${data.firstname}',lastname = '${data.lastname}',id_cohort = '${data.id_cohort}' WHERE id = '${data.id}';`,function(err,row) {
        if (err){
          console.log(err);
        } else {
          console.log("Update Data Sukses");
        }
      })
    })
  }

  static delete(database,id){
    database.serialize(()=>{
      database.run(`DELETE FROM students WHERE id = '${id}';`, function(err,row) {
        if(err){
          console.log(err);
        } else {
          console.log(`Delete id : ${id} Sukses`);
        }
      })
    })
  }


  static findById(database,id){
    database.serialize(()=>{
      database.run(`SELECT * FROM students WHERE id = '${id}';`, function(err,row) {
        if(err){
          console.log(err);
        } else {
          console.log("Result findById : ");
        }
      })
    })
  }

  static findAll(database,callback,sub_query){
    database.serialize(()=>{
      database.all(`SELECT * FROM students LIMIT ${sub_query.limit} OFFSET ${sub_query.offset};` ,callback)
    })
  }

  static where(database,sub_query,callback){
    database.serialize(()=>{
      database.all(`SELECT * FROM students WHERE ${sub_query}`,callback)
    })
  }

}

export default Student
