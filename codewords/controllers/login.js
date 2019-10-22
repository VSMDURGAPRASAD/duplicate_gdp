const express = require('express')
const api = express.Router()
const Model = require('../models/sample.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'sample'

let signIn = (req,res) => {
    var body = _.pick(req.body,['email','password']);
    console.log(body.email+"Controller user signin");
    UserModel.findOne({emailKey: body.email}, function (err, User) {
        if(err){
            return res.json({ code: 200, message: 'Email id not registered!!'});
        }
        console.log(User.isInstructor+"Instructor status signIn controller user");
        return bcrypt.compare(body.password,User.password,(err,result) => {
            if(result){
                var newToken = jwt.sign({email: body.email, id: User.id },'codewordnwmsu',{expiresIn:  10000 * 3000 }).toString();
                UserModel.updateOne({emailKey: body.email},{$set: {token: newToken}}, (err) =>{
                    if(err){
                        return res.json({ code: 200, message: 'Unable to generate and update Token'});
                    }
                    return res.json({ code: 200, message: 'Signed in successfully. Redirecting.', token: newToken, isInstructor: User.isInstructor });
                })
            }else{
                return res.json({ code: 200, message: "Invalid User!!"})
            }
        })

    })
}

module.exports.validateEmail = validateEmail;
// this function is for getting temporary password
let tempPassword = (req, res ) => {
    var body = _.pick(req.body,['email']);
    var chars = "abcdefghijklmnopqrstuvwxyz@#$%&*ABCDEFGHIJKLMNOP123456789";
    var temporaryPassword = "";
    for (var x = 0; x < 5; x++) {
        var i = Math.floor(Math.random() * chars.length);
        temporaryPassword += chars.charAt(i);
    }
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(temporaryPassword,salt,(err,hash) => {
        hashPassword = hash;
        UserModel.updateOne({emailKey: body.email },{$set: {password: hashPassword}}, (err,result) =>{
        if(!res){
            return  res.status(400).send("Error");
        }
        mailController.sendMail(body.email,temporaryPassword);
        return res.json({ code: 200, message: true});
     });
     });
    });
}