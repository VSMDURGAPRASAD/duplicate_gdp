const http = require('http')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const errorHandler = require('errorhandler')
const mongoose = require('mongoose')
const LOG = require('./utils/logger.js')
const flash = require('connect-flash');
var multer = require('multer');
var nodemailer = require('nodemailer');
var session = require('express-session')
var nodemailer = require('nodemailer');
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt-nodejs');
// var async = require('async');
// var crypto = require('crypto');

passport = require('passport')
require('./config/passport')(passport);


// Load environment variables from .env file, where port, API keys, and passwords are configured.
LOG.info('Environment variables loaded into process.env.')

// create express app ..................................
const app = express()


//app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());

// configure app.settings.............................
<<<<<<< HEAD
app.set('port', 8080 )
=======
 app.set('port', 8080 )
>>>>>>> 1855fa76115759ba12e6d7acbe124d890930e3a8
 app.set('host', '127.0.0.1' )


// set the root view folder
app.set('views', path.join(__dirname, 'views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

// configure middleware.....................................................
//\\app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// log every call and pass it on for handling
app.use((req, res, next) => {
  LOG.debug(`${req.method} ${ req.url}`)
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer({
//   dest: "./uploads/"
//   }));

// specify various resources and apply them to our application
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(expressLayouts)
app.use(errorHandler()) // load error handler




// Express session
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//app.use(express.session({ cookie: { maxAge: 60000 }}));
// Connect flash
app.use(flash())
console.log("flash")

// Global variables
app.use(function(req, res, next) {
  console.log("hoslsdlfns;dfjs")
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const routes = require('./routes/index.js')
app.use('/', routes)  // load routing to handle all requests
LOG.info('Loaded routing.')
require('./config/database.js')
app.use((req, res) => { res.status(404).render('404.ejs') }) // handle page not found errors
// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data by passing in the app

// call app.listen to start server
<<<<<<< HEAD
const port = app.get('port')
=======
 const port = app.get('port')
>>>>>>> 1855fa76115759ba12e6d7acbe124d890930e3a8
 const host = app.get('host')
 const env = app.get('env')

app.listen(process.env.PORT || 8080, host, () => {
  console.log(`\nApp running at http://${host}:${port}/ in ${env} mode`)
  console.log('Press CTRL-C to stop\n')
})

module.exports = app

