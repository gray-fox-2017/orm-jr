class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
  }

  static create(db, user, callback) {
    db.serialize(function() {
      let query = `insert into users values (${user.id}, '${user.username}', '${user.password}')`;
      db.run(query, function(err) {
        if (!err) return callback();
        else return callback(err);
      });
    });
  }

  static read(db, callback) {
    db.serialize(function() {
      let query = 'select * from users';
      db.all(query, function(err, rows) {
        if (!err) return callback(null, rows.map(e => new Student(e)));
          else return callback(err, null);
        });
    });
  }

  convertPassword() {
    return hashMD5(this.password);
  }
}

module.exports = User;
