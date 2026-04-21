const { UrlMap } = require("../DB/db");

const mongoose = require("mongoose");


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