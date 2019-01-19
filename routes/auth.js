const express = require("express"),
      router  = express.Router(),
      User    = require("../models/user");

router.get("/login", (req, res) => res.render("auth/login"));
  
router.get("/register", (req, res) => res.render("auth/register"));

router.post("/register", (req, res) => {
      let username = req.body.username,
          password = req.body.password;

      User.findOne({username : username})
      .then(user => {
        if(user){
            res.redirect('back');
            alert("User already exists!!");
        } else {
        
            const newUser = {username : username, password : password};
            console.log(newUser);

            User.create(newUser, function(err, newlyCreated){
                if(err){
                    res.redirect(back);
                    console.log(err);
                } else {
                    res.redirect("login");
                    console.log("User succsesfully created!");
                }
            });
        }
    });
});
  

module.exports = router;