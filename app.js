const express = require('express');
const morgan = require('morgan');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const cookiePaser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const app = express();

const configs = require('./config/secret');
//set connection to session
const sessionStore = new MongoStore({ url: configs.database, autoReconnect: true });
//connection to database
mongoose.Promise = global.Promise;
mongoose.connect(configs.database, function (err) {
 if (err) console.log(err);
 console.log('Connection to database');
});

//set a session
const sessionMiddleware = session({
 resave: true,
 saveUninitialized: true,
 secret: configs.secret,
 store: new MongoStore({ url: configs.database, autoReconnect: true })
});

app.use(morgan('dev'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

//set json headering
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Authorization");
 if (req.method === "OPTION") {
  //will tell the brower to allow this header of methods will do it exp get post ....
  res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE');
  return res.status(200).json({});
 }
 next();
});

//set controller or router
const travelRoutes = require('./api/routes/travel');
const userRoutes = require('./api/routes/user');
//set path of target here
app.use('/travel', travelRoutes);
app.use('/accounts', userRoutes);

//check error
app.use((req, res, next) => {
 res.status(404).json({
   message:'this page not found'
 });
});
//set app and sen to server file to configure port
// export app for other file
module.exports = app;
