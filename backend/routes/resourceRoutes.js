const express= require('express');
const router=express.Router();
const {getResource, addReply, createResource}=require('../controllers/resourceControllers');


router.post('/createResource',createResource);
router.post('/reply/:id',addReply);
router.get('/get',getResource);

module.exports=router;