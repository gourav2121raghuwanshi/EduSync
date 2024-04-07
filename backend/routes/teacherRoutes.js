const express= require('express');
const router=express.Router();
const {createTeacher,loginTeacher,getTeacher,getAllCourses}=require('../controllers/teacherController');

router.post('/sign-up',createTeacher);
router.post('/login',loginTeacher);
router.get('/getTeacher/:id',getTeacher);
router.get('/getAllcourses/:id',getAllCourses);

module.exports=router;