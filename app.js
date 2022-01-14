var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy
var path = require('path');
var createError = require('http-errors');
const User = require('./database/init')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var secretsRouter = require('./routes/secrets');
var authRouter = require('./routes/auth');

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: "ahyesgithubautomationnoice",
  secret: "IsItAboutDrive?IsItAboutPower?",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:5000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log(JSON.stringify(profile))
  User.findOrCreate({ githubId: profile.id }, {name: profile.displayName, profile: profile.profileUrl}, function (err, user) {
    return done(err, user);
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj)
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/secrets', secretsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
