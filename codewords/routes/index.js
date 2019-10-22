/**
 * @index.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @requires express
 */

const express = require('express')
const LOG = require('../utils/logger.js')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var nodemailer= require('nodemailer');
var crypto= require('crypto');
var async= require('async');

LOG.debug('START routing')
const router = express.Router()
router.get('login/login.ejs', (req, res, next) => {
  LOG.debug('Request to /login')
  res.render('login.ejs', { title: 'Express App' })
})
// Code for a forgot password 
router.get('/forgot',(req,res, next) => {
  res.render('forgot');
})
//Manage top-level request first
router.get('/', ensureAuthenticated,(req, res, next) => {
  LOG.debug('Request to /')

  if(req.user.isAdmin){
    res.redirect('/admin')
  }
  else if(req.user.isInstructor){
    res.redirect('/instructor')
  }
  res.redirect('/student')

  //res.render('index.ejs', { title: 'Express App' })
})

// Defer path requests to a particular controller

router.use('/instructor',ensureAuthenticated, require('../controllers/instructor.js'))
router.use('/users', require('../controllers/users.js'))

router.use('/admin',ensureAuthenticated, require('../controllers/admin.js'))
router.use('/student',ensureAuthenticated, require('../controllers/student.js'))

LOG.debug('END routing')
module.exports = router
