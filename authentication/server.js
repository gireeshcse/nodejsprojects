var express = require('express');
var app = express();

//to parse cookie headers
var cookieParser = require('cookie-parser');

//To Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var bodyParser = require('body-parser');

//to Create a session middleware with the given options.
var session = require('express-session');

//Passport is authentication middleware for Node.js.
//different authentication mechanisms are known as Strategies which can be installed and used modularly as desired
var passport = require('passport');

funct = require('./passwords.js'); //funct file contains our helper functions for our Passport and database work

//This module lets us authenticate using a username and password in your Node.js applications
var LocalStrategy = require('passport-local');

//configuring the express
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'samplekey', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(4000);
//static resourses like css,js,images etc
app.use(express.static('./web/'));

//to set view engine
app.set('view engine','ejs');


app.get('/',function(req,res){
    res.render('home',{user: req.user});
});
app.get('/login',function(req,res){
    error = req.session.error;
    req.session.error = '';
    res.render('login',{user: req.user,error:error});
});
app.get('/profile',function(req,res){
     if (req.isAuthenticated()) 
        res.render('profile',{user: req.user});
        else
        res.redirect('login');
});


//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login'
  })
);
//generate passwords
app.get('/passwords',function(req,res){
var bcrypt = require('bcryptjs');
passwords = ['123456','dharma','warrior','machine'];
html="";
for(i=0;i<passwords.length;i++)
html += '<br>'+passwords[i]+":"+bcrypt.hashSync(passwords[i], 8);
res.send(html);
});

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

//===============PASSPORT=================
// Use the LocalStrategy within Passport to login/"signin" users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    user=funct.localAuth(username, password)
    
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Invalid Username or Password.'; //inform user could not log them in
        done(null, user);
      }
  }
));

//===============PASSPORT=================
// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

console.log('Server is ready at port 4000');