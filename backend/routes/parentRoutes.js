const express= require('express');
const router=express.Router();
const {verifyToken}=require('../utils/verifyUser')
const {createParent,loginParent,signout,getAllCourses,updateUser,deleteUser,setSingleCourse}=require('../controllers/parentController');


router.post('/sign-up',createParent);

router.post('/login',loginParent);
router.get('/signout',signout);
router.get('/getAllcourses/:id',getAllCourses);
router.get('/displaySingleCourse/:id',setSingleCourse);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports=router;