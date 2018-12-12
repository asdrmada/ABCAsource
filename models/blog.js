const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
      title   : String,
      image   : String,
      opener  : String,
      body    : String,
      created : {type: Date, default: Date.now},
      comments: [
                       {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Comment"
                        }
                ]
      
});

module.exports = mongoose.model("Blog", postSchema);