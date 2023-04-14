const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })

let shortUrl = mongoose.Schema({
    "oriUrl":{
        type:String,
        required: true
    },
    "shoUrl":{
        type:String,
        required:true
    },
    "clicks":{
        default:0,
        type:Number,
    }
});


exports.shorturl = mongoose.model("shorturl",shortUrl);