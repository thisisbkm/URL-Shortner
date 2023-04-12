const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })

let shortUrl = mongoose.Schema({
    "oriUrl":String,
    "shoUrl":String
});


exports.shorturl = mongoose.model("shorturl",shortUrl);