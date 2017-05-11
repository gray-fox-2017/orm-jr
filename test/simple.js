import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")


db.setup()

Student.create(db.connection, new Student("Erwin", "Ramadhan", 2));
console.log("Inserting new student...");

db.connection.all(`SELECT * FROM students WHERE id = 1;`, function(err,rows) {
   if (!err && rows.length > 0) {
     console.log('test create student : success');
   } else {
     console.log('test create student : fail');
   }
});

Student.update(db.connection, new Student("Joko", "Susilo", 2, 1));
console.log("Updating data student....");

db.connection.all('SELECT * FROM students WHERE first_name = "Erwin" AND id = 1', function (err, rows){
  if(!err && rows.length > 0){
    console.log('test update student : success');
  } else {
    console.log('test update student : fail');
  }
});