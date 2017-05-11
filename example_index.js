var sqlite3 = require('sqlite3').verbose();
var User = require('./user.js');
var repl = require('repl');

var replServer = repl.start();

class DB {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename);
  }
}

var db = new DB('data.db');

replServer.context.db = db;
replServer.context.User = User;
