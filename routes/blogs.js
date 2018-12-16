const express  = require("express"),
      router   = express.Router({mergerParams:true}),
      Blog     = require("../models/blog");
    //   Comments = require("../models/comments");

// Routing
router.get("/", function(req, res){
      res.redirect("/blogs/1");
    });
    
router.get("/blogs/:page", function(req, res){
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
                  res.render("blogs/index", {
                    blogs: blogs,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});

    
router.post("/blogs", function(req, res){
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

router.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("index");
            console.log(err);
        } else {
            res.render("blogs/show", {blog: foundBlog});
        }
    });
});
    
router.get("/new", function(req, res){
      res.render("blogs/new");
    });

module.exports = router;

