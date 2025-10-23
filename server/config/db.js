import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log("mysql connection failed", err.stack);
    return;
  }
  console.log("mysql database successfully connected");
});

export default connection;
