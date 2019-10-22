const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
// Load User model
const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login',{layout:false}));
// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
router.post('/register', (req, res) => {
    const { name, email, password, password2, isInstructor, isAdmin } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            isInstructor,
            isAdmin

          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  // req.flash(
                  //   'success_msg',
                  //   'You are now registered and can log in'
                  // );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  
    console.log(res)
  });
  router.post('/reset',(req,res) =>{
    console.log("came to reset page");
    console.log(req.body.email);
var temp = {
  host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
  auth: {
         user: 'dpyuvasena@gmail.com',
         pass: '08814276842'
     }
 };
    var transporter = nodemailer.createTransport(temp);
     const mailOptions = {
      from: 'dp.vinukonda@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: 'Subject of your email', // Subject line
      html: '<p>Your html here</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });


//     async.waterfall([

//       function(done){
//         crypto.randomBytes(20, function(err,buf){
//           var token= buf.toString('hex');
//           done(err,token);
//         })
//       },
//       function(token,done){
//         User.findOne({email: req.body.email}, function(err,user){
//           if(!user) {
//             req.flash('error','No  account with email address exist.');
//             return res.redirect('/forgot');
//           }
//           user.resetPasswordToken =token;
//           user.resetPasswordExpires =Date.now( ) +3600000;
//           user.save(function(err){
//             done (err,token,user);
//           })
//         })

//       },
//       function(token,user,done) {
//         var smtpTransport =nodemailer.createTransport({
//           service:'Gmail',
//           auth:{
//             user:'learntocodeinfo@gmail.com',
//             pass: process.env.GMAILPW

//           }
//         });
//         var mailOptions ={
//           to: user.email,
//           from:'learntocodeinfo@gmail.com',
//           subject:"Nodejs Password Reset",
//           text:'You are reciving this because you forgotten password'+
//           'http://'+ req.headers.host + token +'\n\n'+
//           'If you didnit get'

//         };
//         smtpTransport.sendMail(mailOptions,function(err){
//           console.log('mail sent');
//           req.flash('success','An email has been  sent to '+user.email +' with further instrcutions');
//           done(err, 'done');
//         });

//       }
//     ], function (err){
//       if(err) return next(err);
//       res.redirect('/forgot');
//     });
//   });
//   router.get('/reset/:token', function(req,res){
//     user.findOne({ resetPasswordToken: req.params.token,resetPasswordExpires: {$gt: Date.now() } }, function(err,user){
//     if(!user) {
//       req.flash('error','Password reset token is  invalid or has exprired');
//       return res.redirect('/forgot');
//     }
//     res.render('reset',{token: req.params.token});
//   });
// })

// router.post('reset/:token', function(req,res){
//   async.waterfall([
//     function(done) {
//       user.findOne({ resetPasswordToken: req.params.token,resetPasswordExpires: {$gt: Date.now() } }, function(err,user){
//         if(!user) {
//           req.flash('error','Password reset token is  invalid or has exprired');
//           return res.redirect('back');
//         }
//         if(req.body.password === req.body.confirm) {
//           user.setPassword(req.body.password,function(err){
//             user.resetPasswordToken= undefined;
//             user.resetPasswordExpires =undefine;
//             user.save(function(err){
//               req.logIn(user,function(err){
//                 done(err,user);
//               });
//             });
//           });
//         } else {
//           req.flash("error","Passwords do not match");
//           return  res.redirect('back');
//         }
//       });
//     },
//     function(user,done) {
//       var  smtpTransport =nodemailer.createTransport({
//         service:"Gmail",
//         auth :{
//           user:'dp@gmail.com',
//           pass:'password'
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from:'dpyuvasena@gmail.com',
//         subject:'your password changed',
//         text:'Hello,\n\n'+
//         'This is a confirmation that password ' + user.email +'has just changed'
//       };
//       smtpTransport.sendMail(mailOptions,function(err) {
//         req.flash('Success','Sucess your passord has been changed ');
//         done(err);
//       })
//     }
//   ], function(err) {
//     res.redirect('/index');
//   });

  });
  // Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
  
  //Code for a node mailer 
  router.post('/forgot',(req,res) => {
    res.render('forgot.ejs');
    
});
  module.exports = router;
    