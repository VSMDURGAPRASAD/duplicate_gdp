/** 
*  Instructor Course controller
*  Handles requests related to instructors (see routes)

*  Vinukonda Sai Manikanta Durga Prasad
* 
*x
*/
const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const Model = require('../models/studentcourse.js')
const Course = require('../models/instructor.js')
const Codeword = require('../models/codeword.js')
var mongoose = require('mongoose');
const Usermodel = mongoose.model('User')
const notfoundstring = 'student not found'
const _ = require('lodash');
let XLSX = require('xlsx')
const formidable = require('formidable')
var fs = require('fs');
var path = require('path');
const ObjectId = require('mongodb').ObjectID;

//var util = require("util");
//var fs = require("fs"); 

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall',async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = await Model.find({})

  var contents = fs.readFileSync("jsoncontent.json");
  // Define to JSON type
  var jsonContent = JSON.parse(contents);
   console.log(jsonContent)
  res.send(JSON.stringify(data))
})

api.get('/',async (req, res) => {

  const data = await Model.find();

  const uidata= [];




  console.log(data);

  

  res.redirect('admin/addinstructor')
})

api.get('/addinstructor',async (req, res) => {

    const data = await Usermodel.find({requestforInstructorAcess:true});
  
    const uidata= data;
    
   // console.log(data);
  
    
  
    res.render('admin/addinstructor.ejs',{layout:false,val:uidata})
  })

  api.get('/removeinstructor',async (req, res) => {

    const data = await Model.find();
  
    const uidata= [];
  
  
  
  
    console.log(data);
  
    
  
    res.render('admin/removeinstructor.ejs',{layout:false,val:uidata})
})
api.get('/inactiveaccount',async (req, res) => {

})


api.get('/codewords',async (req, res) => {

  const data = await Codeword.find({})

  res.render('admin/codewords.ejs',{layout:false,val:data})

})                        

api.get('/codewords/edit/:codeWordSetName',async (req, res) => {

  const cordwordsetname = req.params.codeWordSetName
  const data = await Codeword.find({codeWordSetName:cordwordsetname})
  console.log("edit")
  console.log(data[0])

  res.render('admin/codewordedit.ejs',{layout:false,val:data[0]})

})  

api.get('/codewords/add',async (req, res) => {

  const data =  new Codeword()

  res.render('admin/codewordadd.ejs',{layout:false,val:data})

}) 

api.get('/codewords/delete/:codeWordSetName',async (req, res) => {

  const data = await Codeword.find({})

  res.render('admin/codeworddelete.ejs',{layout:false,val:data})

})  

api.post('/save', async (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  
  const item = new Codeword()
  var data = {};
  console.log('form')
  new formidable.IncomingForm().parse(req, async(err, fields, files) =>  {
    if (err) {
      console.error('Error', err)
      throw err
    }
  console.log('Fields', fields)
  console.log(req.body)
 
  temps = await Codeword.find({ _id: fields._id })
  data = temps[0]
  console.log(data)

  data.codeWordSetName= fields.codeWordSetName
  data.codewords=fields.codewords.split(",")
 
  try {
    console.log(data);
     await data.save();
    // res.send(item);
   } catch (err) {
     res.status(500).send(err);
   }

  })

 

 // LOG.info(`SAVING NEW e ${JSON.stringify(item)}`)
  return res.redirect('codewords')
})



api.post('/requestForInstructorAcess',async(req,res)=>{

  //console.log(req.body.IsAgreed)

  var items = await Usermodel.find({email:req.body.InstructorEmail}) 

  console.log(req.body.IsAgreed)
  var item = items[0]
  if(req.body.IsAgreed=="true"){

    item.requestforInstructorAcess = false;
    item.isInstructor = true;

    console.log(item)
    try{
      await item.save()
    }
    catch (err) {
      res.status(500).send(err);
    }
  }
  else{
    item.requestforInstructorAcess = false;
    item.isInstructor = false;

    console.log(item)
    try{
      await item.save()
    }
    catch (err) {
      res.status(500).send(err);
    }
    
  }
 
  //console.log(req.body.InstructorEmail)
  // Instructor Email

  res.send('admin/addinstructor')


})

module.exports = api
