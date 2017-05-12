class Student {

  constructor(first_name, last_name,id_cohort,id) {
    this.id = id || 0;
    this.first_name = first_name || 'unknown';
    this.last_name = last_name || 'unknow';
    this.id_cohort = id_cohort || 0;
  }

  static create(conn, student,callback) {
    conn.serialize(() => {
      let query = `INSERT INTO students (first_name,last_name,id_cohort) values ('${student.first_name}','${student.last_name}',${student.id_cohort})`;

      conn.run(query, err => {
        if (err)
          //console.log(err);
          callback(err,null)
        //else console.log(`${student.first_name} ${student.last_name} has been Created`);
        else callback(null)
      });
    });
  }

  static update(conn, student,callback) {
    conn.serialize(() => {
      let query = `UPDATE students SET first_name='${student.first_name}',last_name='${student.last_name}',id_cohort=${student.id_cohort} WHERE id=${student.id}`;

      conn.run(query, err => {
        if (err)
          //console.log(err);
          callback(err,null)
        //else console.log(`${student.first_name} ${student.last_name} has been Created`);
        else callback(null)
      });
    });
  }

  static delete(conn, id,callback) {
    conn.serialize(() => {
      let query = `DELETE FROM students WHERE id=${id}`

      conn.run(query, err => {
        if (err)
          //console.log(err);
          callback(err,null)
        //else console.log(`${id} has been Deleted`);
        else callback(null)
      });
    });
  }

  static findById(conn, id,callback) {
    conn.serialize(() => {
      let query = `SELECT * FROM students WHERE id=${id};`

      conn.each(query, (err, row) => {
        if (err)
          //console.log(err);
          callback(err,null)
        //else console.log(row);
        else callback(null,row)
      });
    });
  }

  static findAll(conn, callback, options={}) {
    let query='';
    conn.serialize(() => {
      if(options.hasOwnProperty('limit') && options.hasOwnProperty('offset') )
        query = `SELECT * FROM students LIMIT ${options.limit} OFFSET ${options.offset}`
      else query = 'select students.id,students.first_name,students.last_name,cohorts.name as chort_name from students left join cohorts on students.id_cohort = cohorts.id'

      conn.all(query, (err, rows) => {
        if (err)
          callback(err, null);
        else callback(null, rows);
      });
    });
  }

  static where(conn, input, callback) {
  //  let regex = /.*(\w).*=.*(\w).*/g;
    //let inputs = regex.exec(input);
    let inputs = input.split('=');
    let column = inputs[0].trim()
    let value = inputs[1].trim()

    conn.serialize(() => {
      let query = `SELECT * FROM students WHERE ${column.trim()}=${value.trim()};`
      conn.all(query, (err, rows) => {
        if (err)
          callback(err, null);
        else callback(null, rows);
      });
    });
  }

  static findOrCreate(conn, student) {
      conn.serialize(() => {
        let query = `SELECT * FROM students WHERE first_name='${student.first_name}' AND last_name= '${student.last_name}'`

        conn.all(query, (err, rows) => {
          if (err)
            console.log(err);
          else{
            if(rows.length===0){
              conn.serialize(() => {
                let query = `INSERT INTO students (first_name,last_name,id_cohort) values ('${student.first_name}','${student.last_name}',${student.id_cohort})`;
                conn.run(query, err => {
                  if (err)
                    console.log(err);
                  else console.log(`${student.first_name} ${student.last_name} has been Created`);
                });
              });
            }
            else console.log('Data Exists');
          }
        });
      });
  }


}

module.exports = Student;
