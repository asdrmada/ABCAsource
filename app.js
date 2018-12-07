// NPM Packages and set up
const express     = require("express"),
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
seedDB();
  
// Routing
app.get("/", function(req, res){
      res.redirect("/blogs/1");
    });
    
app.get("/blogs/:page", function(req, res){
    const perPage = 2;
    const page = req.params.page || 1;
    
    Blog
        .find({})
        .sort('date')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, blogs) {
            Blog.count().exec(function(err, count){
            if(err){
               console.log(err);
            } else {
               res.render("index", {
                   blogs: blogs,
                   current: page,
                   pages: Math.ceil(count / perPage)
            });
        }
      });
    });
});

app.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("index");
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
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
            res.redirect("/blogs/1");
            console.log(newBlog);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server.....it's alive!!!");
});

