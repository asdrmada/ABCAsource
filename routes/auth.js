const express = require("express"),
      router  = express.Router();

router.get("/login", function(req, res) {
      res.render("auth/login");
});
  
router.get("/register", function(req, res) {
      res.render("auth/register");
});
  

module.exports = router;