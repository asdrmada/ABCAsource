const express = require("express"),
      router  = express.Router({mergerParams:true}),
      Comment = require("../models/comments"),
      Blog    = require("../models/blog");

// Comment Routing
router.get("/new", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
      if(err){
          res.redirect("back");
          console.log(err);
      } else {
          res.render("comments/new", {blog: foundBlog});
      }
  });
});

router.post("/", function(req, res){
   Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, req.name.comment, function(err, comment){
                if(err){
                    res.redirect("back");
                    console.log(err);
                } else {
                    console.log(comment);
                    comment.save();
                    blog.comment.push();
                    blog.save();
                    res.redirect("blog/" + blog._id);
                }
            });
        }
    });
});

module.exports = router;

