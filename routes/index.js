var express = require('express');
var router = express.Router();
var { randomBytes } = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Github OAuth' });
});

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
})

module.exports = router;
