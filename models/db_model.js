const sqlite3 = require('sqlite3').verbose();


class DBModel {
  constructor(file) {
    this.connection = new sqlite3.Database(file)
  }
  setup(){
    let db = this.connection;
    let query = `CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(30), lastname VARCHAR(30), cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohort(id))`
    db.serialize(function () {
      db.run(query, function (err) {
        if (!err) console.log('Buat table student berhasil')
        else console.log(err);
      });
    });

    let queryCohort = `CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30))`
    db.serialize(function () {
      db.run(queryCohort, function (err) {
        if (!err) console.log('Buat table cohort berhasil')
        else console.log(err);
      });
    });
  }
}
var dbModel = new DBModel('./db/student.db');

console.log(dbModel.connection)
module.exports = DBModel;
