const express = require('express')
const api = express.Router()
const Model = require('../models/sample.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'sample'

//This function is for sign up
let signUp = (req,res) => {
    var body = _.pick(req.body,['email','password','instructor']);
    var gen_token = jwt.sign({email: body.email },'codewordnwmsu',{expiresIn:  1* 300 }).toString();
    body.token = gen_token;
    console.log("controller signup"+ body.email+" "+body.password+" "+body.instructor);
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(body.password,salt,(err,hash) => {
            body.password = hash;
            var userModel = new UserModel({
                emailKey: body.email.charAt(0).toLowerCase() + body.email.slice(1),
                password: body.password,
                isInstructor: body.instructor
            });
            userModel.save().then((user) => {
                if(user)
                return res.json({ code: 200, message: true});           
            }).catch((e) => {
                console.log(e);
                return res.json({ code: 400, message: e});        
            })
        })
    })
}
module.exports.signUp = signUp;