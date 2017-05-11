"use strict"

import Student from "./student.js";

class Cohort {
  constructor(cohort_name,id){
    this.cohort_name = cohort_name;
    this.id = id;
  }
  static create(database, data){
    database.serialize(()=>{
      database.run(`INSERT INTO cohorts(cohort_name) VALUES('${data.cohort_name}');`,(err,result)=>{
        if(err){
          console.log(err, "Input Data Error :( ");
        } else {
          console.log(`Input data ${data.cohort_name} sukses`);
        }
      })
    })
  }

  static read(database){
    database.serialize(()=>{
      database.all(`SELECT * FROM cohorts;`,function(err,rows) {
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
      database.run(`UPDATE cohorts SET cohort_name = '${data.cohort_name}' WHERE id = '${data.id}';`,function(err,row) {
        if (err){
          console.log(err);
        } else {
          console.log("Update Data Cohort Sukses");
        }
      })
    })
  }

  static delete(database,id){
    database.serialize(()=>{
      database.run(`DELETE FROM cohorts WHERE id = '${id}';`, function(err,row) {
        if(err){
          console.log(err);
        } else {
          console.log(`Delete id cohort : ${id} Sukses`);
        }
      })
    })
  }


  static findById(database,id){
    database.serialize(()=>{
      database.run(`SELECT * FROM cohorts WHERE id = '${id}';`, function(err,row) {
        if(err){
          console.log(err);
        } else {
          console.log("Result findById Cohort: ");
        }
      })
    })
  }

  static findAll(database,callback){
    database.serialize(()=>{
      database.all('SELECT * FROM cohorts;',callback)
    })
  }

  static where(database,sub_query,callback){
    database.serialize(()=>{
      database.all(`SELECT * FROM cohorts WHERE ${sub_query}`,callback)
    })
  }

}

export default Cohort
