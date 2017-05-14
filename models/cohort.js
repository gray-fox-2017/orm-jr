"use strict"
class Cohort {
  constructor(name,id){
    this.name = name;
    this.id=id
  }
  static create(db,obj){
    let query = `INSERT into Cohorts (name) VALUES ('${obj.name}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Data added');
        }
      })
    })
  }

  static update(db,obj){
    let query = `Update Cohorts set name = '${obj.name}' where id = ${obj.id};`
    db.serialize(()=>{
      db.run(query, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(`Cohort ${obj.id} Updated!`);
        }
      })
    })
  }

  static delete(db,id){
    let query = `Delete from Cohorts where id = '${id}'`
    db.serialize(()=>{
      db.run(query,(err)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(`Cohort ${id} Deleted!`);
        }
      })
    })
  }

  static findAll(db,obj={limit:-1,offset:0}){
    let query = `Select * from Cohorts LIMIT ${obj.limit} OFFSET ${obj.offset}`
    db.serialize(()=>{
      db.all(query, function(err,rows){
        if(err){
          console.log(err);
        } else {
          console.log(`Table Cohorts list:\n`);
          rows.forEach((row)=>{
            console.log(`\n${row.id} | ${row.name} | `);
          })
        }
      })
    })
  }

  static findById(db,id){
    let query = `Select * from Cohorts where id = ${id}`
    db.serialize(()=>{
      db.all(query, function(err,rows){
        if(err){
          console.log(err);
        } else {
          console.log(`Table Cohorts list where id = ${id}:`);
          rows.forEach((row)=>{
            console.log(`\n${row.id} | ${row.name} `);
          })
        }
      })
    })
  }

}

// export default Cohort
module.exports = Cohort
