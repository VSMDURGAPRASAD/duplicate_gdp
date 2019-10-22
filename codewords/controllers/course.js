/**
 * @author VSMDURGAPRASAD<S533980@nwmissouri.edu>
 */

const _ = require('lodash');
const bcrypt = require('bcryptjs');
var async = require("async");
var { CourseUserModel } = require('../model/model.CourseUser');
var { CourseModel } = require('../model/model.Course');
var { mongoose } = require('../config/database')
var mailController = require('../config/user.mail.js')
let XLSX = require('xlsx')

//This function is for adding courses in the list
let addCourse = (req,res) => {
    var body = _.pick(req.body,['course_name',
    'codewordset_name','start_date','end_date','initial_survey','final_survey']);
    var courseModel = new CourseModel({
course_name : body.course_name,
email_course: req.session.email,
codewordset_name: body.codewordset_name,
start_date: body.start_date,
end_date: body.end_date,
initial_survey: body.initial_survey,
final_survey: body.final_survey,
// oldCodewords: []
});
    courseModel.save().then((course) => {
        if(course)
        return res.status(200).json({ message: "Course created successfully.", data: course});
    }).catch((error) => {
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(403).json({message:'There was a duplicate course error'});
        }
        return res.status(403).json({ message:error.message});
    })
}
module.exports.addCourse = addCourse;

//This function is for getting getting courses
let getCourses = (req,res) => {
    CourseModel.find({email_course: req.session.email}, function (err, courses) {
        if (courses) {
            async.forEach(courses, function(course, callback,index){
                CourseUserModel.find({$and: [{course_name: course.course_name}, {courseCreater: req.session.email}]}, function (err, CourseUsers){
                    console.log(CourseUsers);
                    courses[index]['CourseUser'] = CourseUsers;
                    callback();
                })
            });
            console.log(courses)
            return res.json({ code: 200, data: courses });
        }
        }).catch((e) => {
        return res.json({ code: 400, message: e });
        })
}
module.exports.getCourses = getCourses;

//This function is for deleting courses
let deleteCourse=(req,res) =>{
    var body = _.pick(req.body,['course_name']);  
    CourseModel.deleteOne({course_name: body.course_name,email_course: req.session.email }, function(err,deletecourse){
        if(err){
            return res.json({ code:200, message:'Deletion of course'});
        }
        CourseUserModel.remove({course_name: body.course_name, courseCreater: req.session.email}, function(err, deleteCourseUser){
            if(err){
                return res.json({ code:200, message:'Error in delete Course Student'});
            }   
            return res.json({ code: 400, message:true})
        })
        
    })
}

module.exports.deleteCourse=deleteCourse;

//this function is for updating courses
let updateCourse=(req,res) =>{
    var body = _.pick(req.body,['id','start_date','end_date','initial_survey','final_survey']);  
        CourseModel.updateOne({_id: body.id}, { $set: { "start_date" : new Date(body.start_date) && new Date(body.start_date).toISOString().split('T')[0],"end_date":new Date(body.end_date) && new Date(body.end_date).toISOString().split('T')[0] , "initial_survey":body.initial_survey, "final_survey": body.final_survey } }, function(err,updateCourseUser){
        if(err){
            return res.json({ code:200, message:err});
        }
        return res.json({ code: 400, message:true})
    })
}
module.exports.updateCourse = updateCourse;
