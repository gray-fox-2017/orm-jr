"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');

const replServer = repl.start({prompt: '> '})
let fileName = "db/student.db";

replServer.context.dbModel = new DBModel(fileName)
replServer.context.Student = Student
replServer.context.Cohort = Cohort


//babel-node index.js playtime ==> jalankan program
//dbModel.setup() ==> create table database
// Student.create(dbModel.connection, new Student('Windiana','Krismanuyar',1))
// Student.update(dbModel.connection, new Student('Windi','Kris',1,1))
// Student.delete(dbModel.connection, 1)
//Student.show(dbModel.connection)
// Student.findById(dbModel.connection, 1)
/* Student.findAll(dbModel.connection, function(err, data){
    if(!err){
      for(var i=0; i<data.length; i++){
        console.log(data[i]);
      }
    } else {
    console.log('error')
      }
  })
  */

  /* Student.where(dbModel.connection, "firstname = 'Windi' ", function(err, data){
      if(!err){
        for(var i=0; i<data.length; i++){
          console.log(data[i]);
        }
      } else {
      console.log('error')
        }
    })
    */

    // Cohort.create(dbModel.connection, new Cohort('gluk'))
    // Cohort.delete(dbModel.connection, 1)
    // Cohort.update(dbModel.connection, new Cohort('glee',1))
    //Cohort.show(dbModel.connection)
    // Cohort.findById(dbModel.connection, 3)
    //Cohort.findOrCreate(dbModel.connection, new Cohort("gloog","3"))

    /* Cohort.findAll(dbModel.connection, function(err, data){
        if(!err){
          for(var i=0; i<data.length; i++){
            console.log(data[i]);
          }
        } else {
        console.log('error')
          }
      })
      */

      /* Student.where(dbModel.connection, "firstname = 'Windi' ", function(err, data){
          if(!err){
            for(var i=0; i<data.length; i++){
              console.log(data[i]);
            }
          } else {
          console.log('error')
            }
        })
        */


        /*
      Student.findAll(dbModel.connection,{limit :2, offset:1} function(err, data){
            if(!err){
              for(var i=0; i<data.length; i++){
                console.log(data[i]);
              }
            } else {
            console.log('error')
              }
          })
          */
// Student.findOrCreate(dbModel.connection, new Student("windiana","krismanuyar","2"))
