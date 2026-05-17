const express = require("express");
const cors = require("cors");
const { shortUrl } = require("../Functions/shortUrl");
const { getLongUrl } = require("../Functions/getLongUrl");

require("dotenv").config();

const APP_PORT = process.env.APP_PORT;


const app = express();

app.use(cors());
app.use(express.json());

app.post('/shortUrl', shortUrl);
app.get('/:shorturl', getLongUrl);

app.listen(APP_PORT, ()=>{
    console.log("listening on port: ",APP_PORT);
});