const express  = require("express"),
      router   = express.Router(),
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
    let title   = req.body.blog.title,
        image   = req.body.blog.image,
        opener  = req.body.blog.opener,
        body    = req.body.blog.body,
        created = req.body.blog.created;
    
    const newBlog = {title: title, image: image, opener: opener, body: body, created: created};
    Blog.create(newBlog, function(err, newlyCreated){
        if(err){
            res.render("/new");
            console.log(err);
        } else {
            res.redirect("/blogs/1");
            console.log(newlyCreated);
        }
    });
});

router.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
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

