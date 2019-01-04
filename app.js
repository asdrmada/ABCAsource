// NPM Packages and set up
const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),    
      mongoose      = require("mongoose"),
      passport      = require("passport"),
    //   localStragety = require("passport-local").Stragety,
      faker         = require("faker"),
      seedDB        = require("./seeds"),
      Blog          = require("./models/blog"),
      Comment       = require("./models/comments");
      
const blogRoutes    = require("./routes/blogs"),
      commentRoutes = require("./routes/comments");
 
//Mongoose/Mongo set-up   
mongoose.connect("mongodb://localhost/alexs_jojo_blog", { useNewUrlParser: true });


//app set-up 
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// faker/DB seed
seedDB();

app.use("/", blogRoutes);
app.use("/blog/:id/comments", commentRoutes);


app.listen(3001, "localhost", function(){
    console.log("The server.....it's alive!!!");
});

