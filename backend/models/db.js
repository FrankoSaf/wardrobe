const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: "Wardrobe",
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});


module.exports = connection;
