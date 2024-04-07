const express= require('express');
const router=express.Router();
const {createAssignment,fetchAllAssignment}=require('../controllers/assignmentController');

router.post('/createAssignment',createAssignment);
module.exports=router;