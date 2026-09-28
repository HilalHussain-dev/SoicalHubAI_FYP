const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "SocialHub AI API is running"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS connected");

        res.json({
            success: true,
            message: "MySQL connected successfully",
            data: rows
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "MySQL connection failed",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SocialHub AI API running on http://localhost:${PORT}`);
});