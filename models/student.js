"use strict"

class Student {
  constructor(fname, lname, cohort_id, updateBy_id) {
    this.first_name = fname;
    this.last_name = lname;
    this.cohort_id = cohort_id;
    this.updateBy_id = updateBy_id;
  }

  static add(database, studentObj) {
    let db = database;
    let addStudent = (database, studentObj) => {
      return new Promise((resolve, reject) => {
        let query = `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${studentObj.first_name}', '${studentObj.last_name}', ${studentObj.cohort_id});`;
        db.serialize(function () {
          db.run(query, function (err) {
            if (!err) {
              return resolve("Successfull added data")
            } else {
              return reject(err)
            }
          });
        });
      });
    }

    addStudent(database, studentObj)
    .then(() => {console.log("Success created");})
    .catch((err) => {console.log(err);})

  }

  static update(database, studentObj) {
    let db = database;
    let updateStudent = (database, studentObj) => {
      return new Promise((resolve, reject) => {
        let query = `UPDATE students SET first_name = '${studentObj.first_name}', last_name = '${studentObj.last_name}', cohort_id = ${studentObj.cohort_id} WHERE id = ${studentObj.updateBy_id};`;
        db.serialize(function () {
          db.run(query, function (err) {
            if (!err) {
              return resolve("Data Updated !")
            } else {
              return reject(err)
            }
          });
        });
      });
    }

    updateStudent(database, studentObj)
    .then(() => {console.log("Success updated");})
    .catch((err) => {console.log(err);})
  }

  static remove(database, studentID) {
    let db = database;
    let deleteStudent = (database, studentID) => {
      return new Promise((resolve, reject) => {
        let query = `DELETE FROM students WHERE id = ${studentID};`;
        db.serialize(function () {
          db.run(query, function (err) {
            if (!err) {
              return resolve("Delete Successfull")
            } else {
              return reject(err)
            }
          });
        });
      });
    }

    deleteStudent(database, studentID)
    .then(() => {console.log("Delete Successfull");})
    .catch((err) => {console.log(err);})
  }

  static findById(database, studentID) {
    let db = database;
    let findStudent = (database, studentID) => {
      return new Promise((resolve, reject) => {
        let query = `SELECT * FROM students WHERE id = ${studentID};`;
        db.serialize(function () {
          db.all(query, function (err, rows) {
            if (!err) {
              // console.log(rows);
              return resolve(rows)
            } else {
              return reject(err)
            }
          });
        });
      });
    }

    findStudent(database, studentID)
    .then((rows) => {console.log(rows);})
    .catch((err) => {console.log(err);})
  }

  static findAll(database) {
    let db = database;
    let findStudents = (database) => {
      return new Promise((resolve, reject) => {
        let query = `SELECT * FROM students LEFT JOIN cohorts ON students.cohort_id = cohort.id;`;
        db.serialize(function () {
          db.all(query, function (err, rows) {
            if (!err) {
              return resolve(rows)
            } else {
              return reject(err)
            }
          });
        });
      });
    }

    findStudents(database)
    .then((rows) => {console.log(rows);})
    .catch((err) => {console.log(err);})
  }

  static where(database, search) {
    let db = database;
    let whereStudents = (database) => {
      return new Promise((resolve, reject) => {
        let query = `SELECT * FROM students LEFT JOIN cohorts ON students.cohort_id = cohort.id WHERE ${search};`;
        db.serialize(function () {
          db.all(query, function (err, rows) {
            if (!err) {
              return resolve(rows)
            } else {
              return reject(err)
            }
          });
        });
      });
    }

    whereStudents(database)
    .then((rows) => {console.log(rows);})
    .catch((err) => {console.log(err);})
  }



}

export default Student
