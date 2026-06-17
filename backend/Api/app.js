const express = require("express");
const cors = require("cors");
const { shortUrl } = require("../Functions/shortUrl");
const { getLongUrl } = require("../Functions/getLongUrl");

const rateLimit = require('express-rate-limit');

require("dotenv").config();

const APP_PORT = process.env.APP_PORT;


const allowedOrigins = [
  "https://url-shortener-gamma-bay.vercel.app/",
  "http://localhost:5173"
];

const app = express();

const limiter = rateLimit({
  windowMs: 15*60*1000,// 15 min window
  max: 100,
  message: {
    status: 429,
    error: 'Too many requests from this IP, please try again after 15 minutes.'} 
})

app.use("/", limiter);

app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // server-to-server, Postman

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  }));

// app.use(cors()); // only for dev


app.use(express.json());

app.post('/shortUrl', shortUrl);
app.get('/:shorturl', getLongUrl);

app.listen(APP_PORT, ()=>{
    console.log("listening on port: ",APP_PORT);
});