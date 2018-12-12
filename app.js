// NPM Packages and set up
const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),    
      mongoose    = require("mongoose"),
      faker       = require("faker"),
      seedDB      = require("./seeds"),
      Blog        = require("./models/blog"),
      Comment     = require("./models/comments");
 
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
    const perPage = 6;
    const page = req.params.page || 1;
    
    Blog.find({})
        .sort({created: 'desc'})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, blogs) {
            Blog.countDocuments()
                .exec(function(err, count){
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

app.post("blog/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    res.redirect("back");
                    console.log(err);
                } else {
                    comment.save();
                    blog.comment.push();
                    blog.save();
                    res.redirect("blog/" + blog._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server.....it's alive!!!");
});

