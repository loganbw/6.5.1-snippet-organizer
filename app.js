const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
session = require('express-session'),
flash = require('express-flash-messages');

const router = require('./routes.js');
const User = require('./models/user');
const app = express();
//-------------------------------------------------------------------//

//create engine
app.engine('handlebars', exphbs({'defaultLayout': 'base'}));
app.set('view engine', 'handlebars');
//
//database
var database = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(database);

//setting up logins


passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    User.authenticate(username, password, function(err, user) {
       if (err) {
           return done(err)
       }
       if (user) {
           return done(null, user)
       } else {
           return done(null, false, {
               message: "There is no user with that username and password."
           })
       }
   })
}));

passport.use('local-signup', new LocalStrategy(
  function(username, password, done){
    console.log('local-signup');
    console.log(username, password);
    User.signup(username, password, function(err, user){
      if (err) {
          return done(err)
      }
      if (user) {
          return done(null, user)
      } else {
          return done(null, false, {
              message: "There is already a user with that username."
          });
      }
    });
  }
));

 passport.serializeUser(function(user, done) {
     done(null, user.id);
 });

 passport.deserializeUser(function(id, done) {
     User.findById(id, function(err, user) {
         done(err, user);
     });
 });


//setting up session and bodyParser

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'Lionel Richie',
    resave: false,
    saveUninitialized: false,

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//



//router and heroku
router(app);
app.listen(process.env.PORT || 3000);
