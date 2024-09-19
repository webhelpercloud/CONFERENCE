const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user:"",
  password:"",
  database:"icnhsbfo_database"
});


module.exports=con;