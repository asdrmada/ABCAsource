// NPM Packages and set up
var express     = require("express"),
        app     = express(),
    bodyParser  = require("body-parser"),    
    mongoose    = require("mongoose"),
    faker       = require("faker");
 
//Mongoose/Mongo set-up   
mongoose.connect("mongodb://localhost/alexs_jojo_blog", { useNewUrlParser: true });
var postSchema = new mongoose.Schema({
    title   : String,
    image   : String,
    opener  : String,
    body    : String,
    created : {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", postSchema);

//app set-up 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// faker test
console.log(faker.fake("{{name.title}}, {{image.image}}, {{lorem.sentence}}, {{lorem.paragraph}}, {{date.recent}}"));
    
// Routing
app.get("/", function(req, res){
      res.render("show");
    });
    
app.get("/index", function(req, res){
      res.render("index");
    });
    
app.get("/new", function(req, res){
      res.render("new");
    });
    
app.post("/index", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("/new");
            console.log(err);
        } else {
            res.redirect("/index");
        }
    });
});

// app.get("/", function(req, res){
    
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server.....it's alive!!!");
});

