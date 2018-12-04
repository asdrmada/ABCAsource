var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title   : String,
    image   : String,
    opener  : String,
    body    : String,
    created : {type: Date, default: Date.now}
});

module.exports = mongoose.model("Blog", postSchema);