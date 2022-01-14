var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
  if (req.isAuthenticated()){
    console.log(req.user)
    res.render("secrets", {name: req.user.name, profile: req.user.profile});
  } else {
    res.redirect("/");
  }
});

module.exports = router;