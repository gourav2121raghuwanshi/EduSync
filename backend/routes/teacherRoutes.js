const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/verifyUser');
const { createTeacher, loginTeacher, updateUser, deleteUser, getTeacher, getAllCourses } = require('../controllers/teacherController');


router.post('/sign-up', createTeacher);
router.post('/login', loginTeacher);
router.get('/getTeacher/:id', getTeacher);
router.get('/getAllcourses/:id', getAllCourses);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
module.exports = router;