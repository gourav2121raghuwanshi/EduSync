const express= require('express');
const router=express.Router();
const {createParent,loginParent,signout,getAllCourses,setSingleCourse}=require('../controllers/parentController');


router.post('/sign-up',createParent);

router.post('/login',loginParent);
router.get('/signout',signout);
router.get('/getAllcourses/:id',getAllCourses);
router.get('/displaySingleCourse/:id',setSingleCourse);


module.exports=router;