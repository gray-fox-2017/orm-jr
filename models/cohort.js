const Student = require('./student.js');

class Cohort {

  constructor(name,id) {
    this.id = id || 0;
    this.name = name || 'unknown';
  }

  static create(conn, cohort,callback) {
    conn.serialize(() => {
      let query = `INSERT INTO cohorts (name) values ('${cohort.name}')`
      conn.run(query, err => {
        if (err)
          //console.log(err);
          callback(err)
        //else console.log(`${cohort.name} has been Inserted`);
        else callback(null)
      })
    })
  }

  static findAll(conn, callback, options={}) {
    let query='SELECT * FROM cohorts';
    conn.serialize(() => {
      conn.all(query, (err, rows) => {
        if (err)
          callback(err, null);
        else callback(null, rows);
      });
    });
  }

  static update(conn, cohort,callback) {
    conn.serialize(() => {
      let query = `update cohorts set name =${cohort.name} where id=${cohort.id}`;

      conn.run(query, err => {
        if (err)
          //console.log(err);
          callback(err,null)
        //else console.log(`has been Updated`);
        else callback(null)
      });
    });
  }

  static delete(conn, id,callback) {
    conn.serialize(() => {
      let query = `DELETE FROM cohorts WHERE id=${id}`;
      conn.run(query, err => {
        if (err)
          //console.log(err);
          callback(err,null)
        //else console.log(`${id} has been Deleted`);
        callback(null)
      });
    });
  }

}

module.exports = Cohort;
