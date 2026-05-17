const { UrlMapModel } = require("../DB/db");
const mongoose = require("mongoose");
const { shortUrl } = require("./shorturl");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

async function getLongUrl(req, res){

    try{
        const shortUrl = req.params.shorturl;
        const arr = shortUrl.split("-");
        const map = await UrlMapModel.findOne({shortUrl: arr[0]});
        const longUrlsArr = map.longUrls;
        return res.redirect(301, longUrlsArr[arr[1]]);
    }
    catch(err){
        res.send(500).json({
            message: "Invalid Shortned url"
        })
    }
}

module.exports = {
    getLongUrl,
}