"use strict"
const sqlite = require('sqlite3').verbose();
let {createTable,seedData} = require('./setup.js');

class DBModel {
  constructor(filename) {
    console.log(filename)
    this.connection = new sqlite.Database(filename);
  }
  setup() {
    createTable();
    seedData();
  }
}

module.exports = DBModel;
