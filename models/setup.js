let sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('./db/student.db');

const CREATE_TABLE_COHORT = `
CREATE TABLE IF NOT EXISTS cohorts(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) UNIQUE
)`;
const CREATE_TABLE_STU = `
CREATE TABLE IF NOT EXISTS students(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname VARCHAR(255) UNIQUE,
  lastname VARCHAR(255),
  cohort_id INTEGER,
  FOREIGN KEY(cohort_id) REFERENCES cohorts(id)
)`;

let SEED_COHORT = `
INSERT INTO cohorts(name)
VALUES('2001'),('2002'),('2003'),('2004'),('2005'),('2006'),('2007')
`
let SEED_STU = `
INSERT INTO students(firstname,lastname,cohort_id)
VALUES ('Amir','Zen',1),
('Budi','Yey',2),
('Charlyn','Xu',3),
('Della','Wen',4),
('Ellery','Vinn',1)`


let createTable = () => {
  db.serialize(()=>{
    db.run(CREATE_TABLE_COHORT,(err)=> {
      console.log(err ? err: 'Create cohorts');
    });
    db.run(CREATE_TABLE_STU,(err)=> {
      console.log(err ? err: 'Create students');
    });
  });
}


let seedData = () => {
  db.serialize(()=>{
    db.run(SEED_COHORT,(err)=>{
      console.log(err ? err: 'Seed cohort');
    });
    db.run(SEED_STU,(err)=>{
      console.log(err ? err: 'Seed student');
    })
  });
}

module.exports = {createTable,seedData};