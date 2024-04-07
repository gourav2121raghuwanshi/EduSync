const express= require('express');
const { addQues, getQuizById, getQuesById } = require('../controllers/questionController');
const router=express.Router();

router.post("/addQuizQuestion/:courseId", addQues);
router.get("/getQuizById/:courseId", getQuizById);
router.get("/getQuesById/:courseId", getQuesById);

module.exports = router;