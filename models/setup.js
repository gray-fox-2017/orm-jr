"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

var file = '../student.db';
const db = new sqlite3.Database(file);

var student = 'CREATE TABLE IF NOT EXISTS students (firstname TEXT NOT NULL, lastname text not null, student_id integer)';
var cohort = 'CREATE TABLE IF NOT EXISTS cohorts (id integer primary key autoincrement, name)';

let createTable = () => {
  db.serialize(function(){
    db.run(student,function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log('CREATE TABLE students')
      }
    })
  })
}

let createTable = () => {
  db.serialize(function(){
    db.run(student,function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log('CREATE TABLE cohort')
      }
    })
  })
}

const replServer = repl.start('> ');
replServer.context.createTable = createTable()
replServer.context.seedData = seedData()