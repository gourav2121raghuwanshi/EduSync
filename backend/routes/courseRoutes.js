const express= require('express');
const router=express.Router();
const {createCourse,fetchAllStudents,getCourseByCourseId,JoinCourseByCourseId}=require('../controllers/courseController');

router.post('/createCourse',createCourse);
router.get('/getCourseByCourseId/:id',getCourseByCourseId);
router.get('/getAllStudents/:id',fetchAllStudents);
router.post('/JoinCourseByCourseId',JoinCourseByCourseId);
module.exports=router;
//