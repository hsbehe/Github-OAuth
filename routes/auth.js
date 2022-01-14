var express = require('express');
var router = express.Router();
var { randomBytes } = require('crypto');
var passport = require('passport');

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});

module.exports = router;
