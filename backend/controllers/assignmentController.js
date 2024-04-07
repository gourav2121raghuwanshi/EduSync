const Course = require('../models/courseModel');
const Assignment = require('../models/assignmentModel');

exports.createAssignment = async (req, res) => {
    try {
        const { name,courseId } = req.body;
        const file  = req.file; 
        console.log(file);
        console.log(courseId);
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const newAssignment = new Assignment({
            name: name,
            file: file,
        });

        
        const savedAssignment = await newAssignment.save();

        course.Assignment.push(savedAssignment._id);
        await course.save();

        
        return res.status(201).json({ savedAssignment });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

exports.fetchAllAssignment = async (req, res) => {
    try {
     const {instructorId}=req;body;

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

