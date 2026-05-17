const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UrlMap = new Schema({
    shortUrl: {
        type:String,
        index: true,
        unique: true,
    },
    longUrls: {
        type:[String]
    },
})

const urlMapModel = mongoose.model('urlmaps', UrlMap);

module.exports = {
    UrlMapModel: urlMapModel,
}