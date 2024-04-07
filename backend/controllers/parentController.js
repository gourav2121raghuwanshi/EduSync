const Parent = require('../models/parentModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Course = require('../models/courseModel');
const Teacher = require('../models/teacherModel')
exports.createParent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const alreadyExists = await Parent.findOne({ email: email });

        if (alreadyExists) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newParent = new Parent({
            name: name,
            email: email,
            password: hashedPassword
        })
        const savedParent = await newParent.save();
        return res.status(201).json({ savedParent });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            success: false,
        })

    }
}



exports.signout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'user has been logged out !', success: true });
    }
    catch (err) {
        return res.status(500).json({
            message: "unable to log out"
        })
    }
}

exports.loginParent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const alreadyExists = await Parent.findOne({ email: email });
        console.log(alreadyExists)
        if (!alreadyExists) {
            return res.status(402).json({
                message: "Please login first"
            })
        }

        const validPassword = await bcrypt.compare(password, alreadyExists.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }

        const payload = {
            id: alreadyExists._id,
            email: email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(201).json(alreadyExists);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            success: false,
        })

    }
}


exports.getAllCourses = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("in");
        const getCourses = await Parent.findById({ _id: id }).populate("EnrolledCourses")
        // console.log("courses are " + getCourses);
        return res.status(200).json(getCourses?.EnrolledCourses || []);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message + " another one",
            success: false,
        })

    }
}


exports.setSingleCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const getCourses = await Course.findById({ _id: id }).populate("teacher")
        // console.log("course is"
        //     + getCourses);
        return res.status(200).json(getCourses);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message,
            success: false,
        })

    }
}


