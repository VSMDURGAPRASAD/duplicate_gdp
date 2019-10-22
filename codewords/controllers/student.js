/** 
*  Instructor Course controller
*  Handles requests related to instructors (see routes)

*  Vinukonda Sai Manikanta Durga Prasad
* 
*
*/
const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const Model = require('../models/studentcourse.js')
const Course = require('../models/instructor.js')
const notfoundstring = 'student not found'
var mongoose = require('mongoose');
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

  const data = await Model.find({studentEmail:req.user.email});

  const uidata= [];




  console.log(data);

  for (var i = 0; i < data.length; i++) {

    var tempdata = data[i];
    
    
    if(tempdata.courseId.length>3){

      
      const course =await Course.findOne({_id:tempdata.courseId});
      if(course){
        var check = {};
        check.studentEmail= tempdata.studentEmail;
        check.codeword=tempdata.codeword;
        check.coursename=course.coursename;
        check.intiallink= course.intiallink;
        check.finallink=course.intiallink;
        check.isRead=tempdata.isRead;
        check.courseId=tempdata.courseId;
        
        //change to final link after data is reset
       
      uidata.push(check);
      console.log(course);
      console.log("check");
      console.log(check);
      }
       

    }
    
     

  }

  res.render('student/student.ejs',{val:uidata})
})

api.post('/revealCode',async(req,res)=>{

  //console.log(req.body.IsAgreed)


  console.log(req.body.courseId)

  var items = await Model.find({courseId:req.body.courseId,studentEmail:req.user.email}) 
 
  var item = items[0]
  
  item.isRead = true;
    
    console.log(item)
    try{
      await item.save()
    }
    catch (err) {
      res.status(500).send(err);
    }
  
  //console.log(req.body.InstructorEmail)
  // Instructor Email
  res.send('student/')


})

api.get('/requestForInstructorAcess', async (req, res) => {
 
    console.log(req.user)

    var tempUser = req.user;

    tempUser.requestforInstructorAcess = true;

    try{

      await tempUser.save()
    }
    catch{

      res.status(500).send(err);
    }

   

    console.log('request sent')
    res.send('ok')
})



module.exports = api
