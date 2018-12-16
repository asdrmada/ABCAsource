// NPM Packages and set up
const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),    
      mongoose    = require("mongoose"),
      faker       = require("faker"),
      seedDB      = require("./seeds"),
      Blog        = require("./models/blog"),
      Comment     = require("./models/comments");
      
const blogRoutes    = require("./routes/blogs"),
      commentRoutes = require("./routes/comments");
 
//Mongoose/Mongo set-up   
mongoose.connect("mongodb://localhost/alexs_jojo_blog", { useNewUrlParser: true });


//app set-up 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// faker/DB seed
seedDB();

app.use("/", blogRoutes);
app.use("/blog/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server.....it's alive!!!");
});

