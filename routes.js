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


    // make cdse routes
    userRouter.get('/cdse', CdseController.list);
    // userRouter.get('/cdse', (res, req) => {
    //   console.log("REQ:::" + req);
    //   res.status(200).json({ message: 'Connected!' });
    // });
    // cdseRouter.post('/cdse', CdseController.add);



    app.use('/', homeRouter);
    app.use('/', userRouter);
    app.use('/cdse', userRouter);

};
