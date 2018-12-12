const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
      name : String,
      body : String
});

module.exports = mongoose.model("Comment", commentsSchema);