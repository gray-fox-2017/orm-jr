"use strict"

let {Student} = require("./models/student.js");
let {Cohort} = require("./models/cohort.js");
const repl = require('repl');
var DBModel = require('./models/db_model.js');
var dbModel = new DBModel('./db/student.db')

let replServer = repl.start();


const printScs = (activity,id) => {
  console.log(`SUCCEED TO ${activity} ${id}`)
}
const printErr = (err,activity) => {
  console.log(`FAILED TO ${activity}`)
  console.log(err);
}
function callback(err = null,datas = null){
  if (err) console.log(err);
  else if(datas !== null)
    datas.forEach((x)=>{
      console.log(`${x.id} | `+(x.hasOwnProperty('cohort_id')? `${x.firstname} ${x.lastname} |${x.cohort_id}`:`${x.name}`));
    });
}
const showHelp = () => {
  console.log('HELP');
  console.log('1. dbModel.setup()');
  console.log('2. ada 2 tabel yg bisa dipilih (Cohort|Student) sbg awalan')
  console.log('a. create, co: Student.create(dbModel.connection, {firstname:"Sean",lastname:"Parkson",cohort_id:1})')
  console.log('b. update, co: Cohort.update(dbModel.connection,{name:"cohort ubah",id:1}) ');
  console.log('c. delete, co: Student.delete(dbModel.connection,2)');
  console.log('d. findById, co: Student.findById(dbModel.connection,1,callback)');
  console.log('e. findAll, co: Student.findAll(dbModel.connection,{limit:3,offset:2},callback)');
  console.log('f. where, co: Cohort.where(dbModel.connection,"id=1",callback)')

}

replServer.context.showHelp = showHelp();
replServer.context.dbModel = dbModel;
replServer.context.Student = Student;
replServer.context.Cohort = Cohort;
replServer.context.callback = callback;
module.exports ={Student,Cohort,callback,printErr,printScs}
