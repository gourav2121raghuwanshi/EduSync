const express= require('express');
const { addWord, getAllWordsById,getWordById } = require('../controllers/wordController');
const router=express.Router();

router.post("/addWord/:courseId", addWord);
router.get("/getAllWordsById/:courseId", getAllWordsById);
router.get("/getWordById/:id", getWordById);

module.exports = router;