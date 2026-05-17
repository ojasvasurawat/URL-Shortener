const { UrlMapModel } = require("../DB/db");
const mongoose = require("mongoose");
const axios = require("axios");
const ADLER32 = require("adler-32");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (err) {
    return false;
  }
}

async function isUrlLive(url){
    try{
        const response = await axios.head(url, {timeout:5000});
        return response.status >= 200 && response.status < 300;
    }
    catch(err){
        return false;
    }
}


async function shortUrl(req, res){

    try{
        let {longUrl} = req.body;
        if(isValidHttpUrl(longUrl)){
            longUrl = new URL(longUrl).href;
            if(isUrlLive(longUrl)){
                const hashUrl = ADLER32.str(longUrl);
                const shorturl = (hashUrl >>> 0).toString(16);
                const doc = await UrlMapModel.findOne({shortUrl:shorturl});
                if(!doc){
                    await UrlMapModel.create({
                        shortUrl: shorturl,
                        longUrls: [longUrl],
                    })
                    res.json({
                        message: "url shortned successfully",
                        shortUrl: shorturl+"-"+0,
                    })
                    return;
                }
                else{
                    const arr = doc.longUrls;
                    if(arr.includes(longUrl)){
                        const idx = arr.indexOf(longUrl);
                        res.json({
                            message: "url shortned successfully",
                            shortUrl: shorturl+"-"+idx,
                        })
                        return;
                    }
                    const len = doc.longUrls.length;
                    await UrlMapModel.updateOne(
                        {_id: doc._id},
                        { $push: { longUrls: longUrl}}
                    );
                    res.json({
                        message: "url shortned successfully",
                        shortUrl: shorturl+"-"+len,
                    })
                }
            }
            else{
                res.json({
                    message: "url is not live"
                })
            }
        }
        else{
            res.json({
                message: "invalid url format"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Failed to short url"
        });
    }
}

module.exports = {
    shortUrl,
}