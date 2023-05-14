const mysql= require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xyz",
    database: "demoproject",
  });
connection.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});


module.exports= connection;

