const express= require('express');
const router=express.Router();
const {getResource, addReply, createResource, getBlog}=require('../controllers/blogController');


router.post('/createResource',createResource);
router.post('/reply/:id',addReply);
router.get('/get',getResource);
router.get('/get/:id',getBlog);

module.exports=router;