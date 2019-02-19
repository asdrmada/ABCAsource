const express        = require("express"),
      router         = express.Router(),
      { isLoggedIn } = require('../config/index'),
      Blog           = require("../models/blog");


// Routing
router.get("/", (req, res) => {
    res.redirect("/blogs/1");
});  

router.get("/blogs/:page", (req, res) => {

        const perPage = 6;
        const page = req.params.page || 1;
    
        Blog.find({})
            .sort({created: 'desc'})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, blogs) => {
                Blog.countDocuments()
                    .exec((err, count) => {
                        if (err) {
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

router.get('/blogs/', (req, res) => {

    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    console.log(regex);

    Blog.find({ 'title': regex })
        .exec((err, foundBlogs) => {
            if(err){
                res.redirect('/blogs/1');
            } else {
                if(foundBlogs.length < 1){
                    req.flash('error_msg', 'No Posts found!');
                    res.redirect('back');
                } else {
                console.log(foundBlogs);
                res.render("blogs/searchIndex", { blogs: foundBlogs });
                }
            }
        });

});


router.post("/blogs", (req, res) => {
    let title = req.body.blog.title,
        image = req.body.blog.image,
        opener = req.body.blog.opener,
        body = req.body.blog.body,
        created = req.body.blog.created;

    const newBlog = {
        title: title,
        image: image,
        opener: opener,
        body: body,
        created: created
    };
    Blog.create(newBlog, (err, newlyCreated) => {
        if (err) {
            res.render("/new");
            console.log(err);
        } else {
            res.redirect("/blogs/1");
            console.log(newlyCreated);
        }
    });
});

router.get("/blog/:id", (req, res) => {
    Blog.findById(req.params.id).populate("comments").exec((err, foundBlog) => {
        if (err) {
            res.redirect("index");
            console.log(err);
        } else {
            res.render("blogs/show", {
                blog: foundBlog
            });
            console.log(foundBlog);
        }
    });
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("blogs/new");
});

router.get('/blog/:id/edit', isLoggedIn, (req,res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        console.log(foundBlog.body);
        res.render('blogs/edit', {blog : foundBlog});
    });
});

router.put("/blog/:id", isLoggedIn, (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err){
            req.flash('error_msg', 'An error has occured!')
            res.redirect('/')        
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});

router.delete("/blog/:id", isLoggedIn, (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            req.flash('error_msg', 'An error has occured!');
            res.redirect('/');
        } else {
            req.flash('success_msg', 'Blog has been Deleted!');
            res.redirect('/');
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;