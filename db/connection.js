const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "rootRoot",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the movies_db database.`)
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
