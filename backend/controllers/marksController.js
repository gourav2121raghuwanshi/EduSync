const Marks = require('../models/marksShcema');
const Parent = require('../models/parentModel')
const Course = require('../models/courseModel')
// const Assignment = require('../models/assignmentModel');
exports.createMarks = async (req, res) => {
    try {
        console.log("in");
        const { marks, courseId, userId, totalmarks } = req.body;
        const course = await Course.findById({ _id: courseId });
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const student = await Parent.findById({ _id: userId });
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const newMarks = new Marks({
            marks: marks, course: courseId, student: userId, totalmarks
        })

        const savedMarks = await newMarks.save();

        return res.status(201).json(savedMarks);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

exports.updateMarks = async (req, res) => {
    try {

        console.log("in");
        const { marks, courseId, userId, totalmarks } = req.body;
        const course = await Course.findById({ _id: courseId });
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        const currMarks = await Marks.findOne({
            course: courseId,
            student: userId
        });
        if (!currMarks) {
            return res.status(404).json({
                message: "Marks not found"
            });
        }

        const newMarks = new Marks({
            marks: marks + currMarks.marks, course: courseId, student: userId, totalmarks: totalmarks + currMarks.totalmarks
        })
        const savedMarks = await newMarks.save();
        await Marks.findByIdAndDelete({ _id: currMarks._id })

        const student = await Parent.findById({ _id: userId });
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        return res.status(201).json(savedMarks);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}




exports.getMarks = async (req, res) => {
    try {
        const { courseId, userId } = req.body;
        console.log("in")
        console.log({ courseId, userId, })
        const course = await Course.findById({ _id: courseId });
    
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const currMarks = await Marks.findOne({
            course: courseId,
            student: userId
        });

        console.log(currMarks);

        if (!currMarks) {
            return res.status(200).json({
                marks: 0, totalmarks: 0,
            });
        }

        console.log(currMarks);
        if(currMarks!==null)
        return res.status(200).json(currMarks ); // Use status code 200 for successful retrieval
        return res.status(200).json( {marks: 0, totalmarks: 0}); // Use status code 200 for successful retrieval
   
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
};
