const express= require('express');
const router=express.Router();
const {createMarks,updateMarks,getMarks}=require('../controllers/marksController.js');
router.post('/setMarks',createMarks);
router.post('/updateMarks',updateMarks);
router.post('/getMarks',getMarks);
module.exports=router;