const express = require("express");
const cors = require("cors");



require("dotenv").config();

const allowedOrigins = [
    "http://localhost:5173",
]

const app = express();

app.use(
    cors({
        origin: allowedOrigins,
    })
)

