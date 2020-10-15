const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aa4321",
  insecureAuth : true,
  database: "dbhoras"
});

function accessDB(sqlString, callback) {
  con.query(sqlString, (err, result) => {
    console.log("Done");
    callback(result, err);
  });
};

module.exports = accessDB;