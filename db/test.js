import DBModel from "../models/db_model.js";
import Student from "../models/student.js";


describe('READ promise', function() {
  it('should resolve and invoke callback done', function(done) {
    db.read()
    .then(function() {
      done()
    })
    .catch(function(err) {
      done(err)
    })
  })
})
