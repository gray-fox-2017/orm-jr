const sqlite = require('sqlite3').verbose();

class DBModel {

  constructor(file) {
    this.connection = new sqlite.Database(file);
  }

  setup() {

    let query = [];
    query[0] = 'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100) not null,last_name VARCHAR(100),id_cohort INTEGER,FOREIGN KEY(id_cohort) REFERENCES cohorts(id));';
    query[1] = 'CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) not null);';

    for (let i = 0; i < query.length; i++) {
      this.connection.serialize(() => {
        this.connection.run(query[i], err => {
          if (err)
            console.log(err)
          else console.log('Tables Created');
        });
      });
    }
  }

}

module.exports = DBModel;
