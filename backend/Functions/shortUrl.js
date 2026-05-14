const { UrlMap } = require("../DB/db");

const mongoose = require("mongoose");

const crypto = require('crypto');


function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}


async function checkUrl(url){
    try{
        const response = await axios.head(url);
        return response.status >= 200 && response.status < 300;
    }
    catch(err){
        return false;
    }
}

async function shortUrl(req, res){
    try{
        const longUrl = req.body;
        if(isValidUrl(longUrl)){
            if(checkUrl(longUrl)){
                //shortining url logic;
                const shortUrl = crypto.createHash("md5").update(longUrl).digest("hex");
                if(!UrlMap.shortenedUrl.has(shortUrl)){
                    UrlMap.shortenedUrl.set(shortUrl, [longUrl]);
                    res.json({
                        shortUrl: shortUrl
                    })
                }
                else{
                    //collision logic;
                    const currArray = UrlMap.shortenedUrl.get(shortUrl);
                    len = currArray.length;
                    currArray.push(longUrl);
                    UrlMap.shortenedUrl.set(shortUrl, currArray);
                    res.json({
                        shortUrl: shortUrl+"/"+len
                    })
                }
            }
            else{
                res.json({
                    message: "url is down or not working"
                })
            }
        }
        else{
            res.json({
                message: "url format is incorrect"
            })
        }
    }
    catch(err){
        res.json({
            message: "failure occure during shortning the url"
        })
    }
}