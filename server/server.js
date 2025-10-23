import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
dotenv.config();
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is running on ${5000}`);
});

// testing - function
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) {
      console.error("❌ Database test failed:", err);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: err,
      });
    }
    console.log("✅ Database test result:", results);
    res.json({
      success: true,
      message: "Database connected successfully!",
      data: results,
    });
  });
});
