// NPM Packages and set up
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),    
    mongoose    = require("mongoose"),
    faker       = require("faker"),
    seedDB      = require("./seeds"),
    Blog        = require("./models/blog");
 
//Mongoose/Mongo set-up   
mongoose.connect("mongodb://localhost/alexs_jojo_blog", { useNewUrlParser: true });

//app set-up 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// faker/DB seed
var testData = {
    title:   faker.name.title(),
    image:   faker.image.image(),
    opener:  faker.lorem.sentence(),
    body  :  faker.lorem.paragraph(),
    created: faker.date.recent()
};

console.log(testData);

    
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
            console.log(newBlog);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server.....it's alive!!!");
});

