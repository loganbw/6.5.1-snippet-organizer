const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
session = require('express-session'),
flash = require('express-flash-messages');

const router = require('./routes.js');
const app = express();
//-------------------------------------------------------------------//

//create engine
app.engine('handlebars', handlebars({'defaultLayout': 'base'}));
app.set('view engine', 'handlebars');
//
//setting up session and bodyParser

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'Lionel Richie',
    resave: false,
    saveUninitialized: false,
}));
//



//router and heroku
router(app);
app.listen(3000);
