const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UrlMap = new Schema({
    shortenedUrl: {
        type: Map,
        of: String,
        index: true,
    }
})

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true
    },

    validator: {
        $jsonSchema:{
            bsonType: "object",
            anyOf: [
                {required: ["password"]},
                {required: ["sub"]}
            ]
        }
    },

    password: {
        type: String,
    },
    sub: {
        type: String,
    },
    avatarUrl: {
        type: String,
    },
    saved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'urlMap'
        }
    ]
})

const urlMapModel = mongoose.model('urlMap', UrlMap);
const userModel = mongoose.model('users', User);

module.exports={
    UrlMapModel: urlMapModel,
    UserModel: userModel,
}