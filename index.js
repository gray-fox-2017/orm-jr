"use strict"
const dbModel = new DBModel();
console.log(dbModel);
dbModel.setup();
const repl = require('repl');

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
//firstname, lastname, cohort_id
// Student.create(dbModel.connection, new Student("Windiana", "Krismanuyar", 1));
// Student.create(dbModel.connection, new Student("WindianI", "Krismanu", 1));
// Student.create(dbModel.connection, new Student("Windana", "Krisnuyar", 1));
// Student.create(dbModel.connection, new Student("Indiana", "Rismanuyar", 1));
// Student.create(dbModel.connection, new Student("Diana", "Krismanuyar", 1));
//firstname, lastname, cohort_id, id
// Student.update(dbModel.connection, new Student("Windi","Krism",1,1));
// Student.findById(dbModel.connection,1);

Student.findAll(dbModel.connection, function (err,data) {
  if(!err){
    for(var i = 0; i < data.length;i++){
      console.log(data[i]);
    }
  } else {
    console.log(err, "Error");
  }
}, {limit : 3, offset : 1 } )
//
// Student.where(dbModel.connection, "firstname = 'Windi'",function(err,data) {
//     if(!err){
//       for(var i = 0; i < data.length; i++){
//         console.log("Result Where : ");
//         console.log(data[i]);
//       }
//     } else {
//       console.log(err, "Error");
//     }
// });
// Student.delete(dbModel.connection, 1);

//name
// Cohort.create(dbModel.connection, new Cohort("Happy Fox"));
// //name,id
// Cohort.update(dbModel.connection, new Cohort("Island Fox", 1));
// // Cohort.delete(dbModel.connection, 1);
// Cohort.findById(dbModel.connection,1);
//
// Cohort.findAll(dbModel.connection, function (err,data) {
//   if(!err){
//     for(var i = 0; i < data.length;i++){
//       console.log(data[i]);
//     }
//   } else {
//     console.log(err, "Error");
//   }
// })
//
// Cohort.where(dbModel.connection, "cohort_name = 'Island Fox'",function(err,data) {
//     if(!err){
//       for(var i = 0; i < data.length; i++){
//         console.log(data[i]);
//       }
//     } else {
//       console.log(err, "Error");
//     }
// });
