const express= require('express');
const router=express.Router();
const { Create, Get }=require('../controllers/webinarController');

router.post('/create',Create)
router.get('/get',Get);

module.exports=router;