import DBModel from "../models/db_model.js";
import Student from "../models/student.js";
import Cohort from "../models/cohort.js"

var dbModel = new DBModel("./db/test.db")

Student.create(dbModel.connection, new Student('Windiana', 'Krismanuyar',1))

Student.update(dbModel.connection, new Student('Windi','Krism',1,1))

Student.delete(dbModel.connection,1)

Student.findById(dbModel.connection,1)

Student.read(dbModel.connection)

Student.where(dbModel.connection,'firstname = "Windi"',function(err,data){if(!err){for(var i =0; i < data.length; i++){console.log(data[i])}}else{console.log(`Error`)}})

Student.findAll(dbModel.connection,{limit:2,offset:1},function(err,data){if(!err){for(var i =0;i< data.length;i++){console.log(data[i])}}else{console.log(`Error`)}})

Student.findOrCreate(dbModel.connection, new Student('Windiana','Krismanuyar',1))

Cohort.create(dbModel.connection, new Student('kongkow'))

Cohort.update(dbModel.connection, new Student('kongkow','ampas',2,2))

Cohort.delete(dbModel.connection,1)

Cohort.findById(dbModel.connection,2)

Cohort.read(dbModel.connection)

Cohort.where(dbModel.connection,'name = "ampas"',function(err,data){if(!err){for(var i =0; i < data.length; i++){console.log(data[i])}}else{console.log(`Error`)}})

Cohort.findAll(dbModel.connection,{limit:2,offset:1},function(err,data){if(!err){for(var i =0;i< data.length;i++){console.log(data[i])}}else{console.log(`Error`)}})
