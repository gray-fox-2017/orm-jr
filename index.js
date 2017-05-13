  "use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
var replServer = repl.start({prompt : ">>"})


function help(){
  console.log(
    `+++++++++ RULES OF OPERATION +++++++++
    - Student
    - Cohort
    WITH CRUD FUNCTION
    1. create
       attributess for Student (dbModel.connection, new Student("first_name", "last_name", id_cohort)
       attributess for Cohort(name)
    2. update
        attributess for Student (dbModel.connection, new Student("first_name", "last_name", id_cohort, id)
        attributess for Cohort(name)
    3. delete(dbModel.connection, id)
    4. findById(dbModel.connection, id)
    5. where
       attributess for Student (dbModel.connection, "first_name = 'Windi'", function(err, data){
         if(!err){
           for(var i=0; i < data.length; i++){
             console.log(data[i]);
           }
         }else{
           console.log("Error");
         }
       });)
       attributess for Cohort (dbModel.connection, "name = 'Windi'", function(err, data){
         if(!err){
           for(var i=0; i < data.length; i++){
             console.log(data[i]);
           }
         }else{
           console.log("Error");
         }
         });
    6. findAll
       attributess for Student((dbModel.connection, {limit: 2, offset: 1}, function(err, data){
         if(!err){
           for(var i=0; i < data.length; i++){
             console.log(data[i]);
           }
         }else{
           console.log("Error");
         }
         });)
    7. findorCreate(dbModel.connection, new Student("first_name", "last_name", 1))`)
}


help();
let dbModel = new DBModel('./db/student.db');

replServer.context.dbModel = dbModel;
replServer.context.dbModel.setup = dbModel.setup;
//repl for Student
replServer.context.Student = Student;
// replServer.context.Student.create = Student.create;
// replServer.context.Student.update = Student.update;
// replServer.context.Student.delete = Student.delete;
// replServer.context.Student.findById = Student.findById;
// // replServer.context.Student.findAll = Student.findAll;
// replServer.context.Student.where = Student.where;
// replServer.context.Student.findAll = Student.findAll;
// replServer.context.Student.findorCreate = Student.findorCreate;
// repl for Cohort
replServer.context.Cohort = Cohort;
// replServer.context.Cohort.create = Cohort.create;
// replServer.context.Cohort.update = Cohort.update;
// replServer.context.Cohort.delete = Cohort.delete;
// replServer.context.Cohort.findById = Cohort.findById;
// // replServer.context.Cohort.findAll = Cohort.findAll;
// replServer.context.Cohort.where = Cohort.where;
// replServer.context.Cohort.findAll = Cohort.findAll;
// replServer.context.Cohort.findorCreate = Cohort.findorCreate;






// Student.create(dbModel.connection, new Student("Windiana", "Krismanuyar", 1))
// Student.update(dbModel.connection, new Student("Windiana", "Krismanuyar", 1, 1))
// Student.delete(dbModel.connection, 3)
// Student.findById(dbModel.connection, 1)
// Student.where(dbModel.connection, "first_name = 'Windi'", function(err, data){
//   if(!err){
//     for(var i=0; i < data.length; i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log("Error");
//   }
//   });

// Student.findAl(dbModel.connection, function(err, data){
//   if(!err){
//     for(var i=0; i < data.length; i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log("Error");
//   }
//   });


// Cohort.findAll(dbModel.connection, {limit: 2, offset: 1}, function(err, data){
//   if(!err){
//     for(var i=0; i < data.length; i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log("Error");
//   }
//   });


// Student.findorCreate(dbModel.connection, new Student("Windiana", "Krismanuyar", 1))
