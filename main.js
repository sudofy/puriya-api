let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let database = require('@common/database');

let passport = require('passport');
let cors = require('cors');

let app = express();
database.connect();
// view engine setup
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `jade`);



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, `public`, `favicon.ico`)));
app.use(cors());
app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, `public`)));

//Setup Passport.js for token based user auth
require('@common/auth');
app.use(passport.initialize());



module.exports = app;
