const DBModel = require('./models/db_model.js');
const Cohort = require('./models/cohort.js');
const Student = require('./models/student.js');
const repl = require('repl');

var argv = process.argv
var command = argv[2]
var file = './db/student.db'
var dbModel = new DBModel(file);

let callbackAll = (err, rows) => {
  if (!err) {
    for (let i = 0; i < rows.length; i++)
      console.log(rows[i]);
  } else console.log(err);
}

let callback= (err,rows) => {
  if(err)
  console.log(err);
  else console.log('done');
}


if (command === 'playtime') {

  var replServer = repl.start({
    prompt: '$ '
  });

  replServer.context.dbModel = dbModel;
  replServer.context.Cohort = Cohort;
  replServer.context.Student = Student;
  replServer.context.callbackAll = callbackAll;
  replServer.context.callback = callback;

} else console.log("Cant Play!");
