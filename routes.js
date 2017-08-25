var express = require('express');
var passport = require('passport');
//controllers
var HomeController = require('./controllers/home');
var UserController = require('./controllers/user');
var CdseController = require('./controllers/cdse');
//requering log in
const requireLogin = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
//
//exporting
module.exports = function(app){
  var homeRouter = express.Router();
  var userRouter = express.Router();
  var cdseRouter = express.Router();
// Home routes
  homeRouter.get('/' , HomeController.home);


  // User Routes
    userRouter.get('/login', UserController.login);
    userRouter.post('/login', passport.authenticate('local-login', {
      successRedirect: '/cdse',
      failureRedirect: '/login',
      failureFlash: true
    }));

    userRouter.get('/signup', UserController.signup);
    userRouter.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/cdse',
      failureRedirect: '/signup',
      failureFlash: true
    }));


  app.use('/', homeRouter);
    app.use('/', userRouter);
    app.use('/', cdseRouter);

};
