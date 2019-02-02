const express = require("express"),
      router  = express.Router({mergeParams:true}),
      Blog    = require("../models/blog"),
      Comment = require("../models/comments");

// Comment Routing
router.get("/new", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
      if(err){
          res.redirect("back");
          console.log(err);
      } else {
          res.render("./comments/new", {blog: blog});
          console.log(blog);
      }
  });
});

router.post("/", (req, res) => {
   Blog.findById(req.params.id, (err, blog) => {
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    res.redirect("back");
                    console.log(err);
                } else {
                    console.log(comment);
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blog/" + blog._id);
                }
            });
        }
    });
});

module.exports = router;

