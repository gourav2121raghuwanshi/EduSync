const Course = require('../models/courseModel');
// const Assignment = require('../models/assignmentModel');
const Parent = require('../models/parentModel');
const uuid = require('uuid');
const Teacher = require('../models/teacherModel');
const { countReset } = require('console');
exports.createCourse = async (req, res) => {
    try {
        const randomNumber = uuid.v4();
        const sixDigitNumber = randomNumber.substring(0, 6);
        // console.log(sixDigitNumber);

        const { teacher, title, description } = req.body;
        console.log(typeof (teacher));
        console.log(teacher, title, description);
        // Ensure teacher exists
        const teacherone = await Teacher.findOne({ _id: teacher });

        if (!teacherone) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        // console.log(teacherone._id);
        // Create a new course
        const idTeacher = teacherone._id;
        // console.log("teracher id is "+idTeacher);

        const newCourse = new Course({
            teacher: idTeacher,
            title,
            description,
            courseId: sixDigitNumber
        });
        await newCourse.save();
        // console.log(newCourse);
        // Push the course ObjectId to teacher's courses array
        const idCourse = newCourse._id;
        // console.log("course id is "+idCourse);

        teacherone.courses?.push(idCourse);
        await teacherone.save();
        // Save changes to the teacher and the new course
        // await Promise.all([teacherone.save(), newCourse.save()]);
        return res.status(201).json(newCourse);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};


exports.getCourseByCourseId = async (req, res) => {
    try {

        const course = await Course.findById(req.params.id);
        return res.status(200).json(course);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
// exports.fetchAllStudents = async (req, res) => {
//     try {
//         const {id}=req.params;

//         const students = await Parent.findAll(id);
//         console.log(course);
//         if (!course) {
//             return res.status(404).json({
//                 message: "Course not found"
//             });
//         }

//          console.log(students);
//         return res.status(200).json({
//             students: students
//         });

//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//         });
//     }
// };
exports.fetchAllStudents = async (req, res) => {
    try {
        const { id } = req.params;
       
        // Assuming you have a proper association between Parent and EnrolledCourses
        const students = await Parent.find({
             EnrolledCourses: id // This should be adjusted based on your actual association
        });

        if (!id) {
            return res.status(404).json({
                message: "Course ID not provided"
            });
        }

        if (!students || students.length === 0) {
            return res.status(202).json({
                data: []
            });
        }

        return res.status(200).json({
            students: students
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

exports.JoinCourseByCourseId = async (req, res) => {
    try {
        const { courseId, studentId } = req.body;
        console.log(courseId, studentId);
        const course = await Course.findOne({ courseId: courseId })
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const student = await Parent.findOne({ _id: studentId });
        student.EnrolledCourses.push(course._id);
        await student.save();
        course.EnrolledUser.push(student._id);
        await course.save();

        console.log(course);

        return res.status(200).json(
            { message: "successful", success: true, student }
        );


    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

