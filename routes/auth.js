const express = require("express"),
      router  = express.Router();

router.get("/login", (req, res) => res.render("auth/login"));
  
router.get("/register", (req, res) => res.render("auth/register"));

router.post("/register", (req, res) => {
      let username = req.body.username,
          password = req.body.password;
      
      const newUser = {username : username, password : password};
});
  

module.exports = router;