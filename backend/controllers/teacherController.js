const Teacher = require('../models/teacherModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const alreadyExists = await Teacher.findOne({ email: email });

        if (alreadyExists) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({
            name: name,
            email: email,
            password: hashedPassword
        });

        const savedTeacher = await newTeacher.save();

        return res.status(201).json({ savedTeacher });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
};

exports.loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        const alreadyExists = await Teacher.findOne({ email: email });

        if (!alreadyExists) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const validPassword = await bcrypt.compare(password, alreadyExists.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const payload = {
            id: alreadyExists._id,
            email: email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(200).json(alreadyExists);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
};


exports.getTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log("i1")
        const teacher = await Teacher.findOne({ _id: id });
        console.log("i2")
        console.log(teacher);
        if (!teacher) {
            return res.status(402).json({
                message: "Teacher not found"
            });
        }

        return res.status(200).json(teacher);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
}
exports.getAllCourses = async (req, res) => {
    try {

        const { id } = req.params;

        const teacher = await Teacher.findOne({ _id: id }).populate('courses');

        if (!teacher) {
            return res.status(402).json({
                message: "Teacher not found"
            });
        }

        return res.status(200).json(teacher);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
}


exports.updateUser = async (req, res) => {
    try {
        if (req.user.id !== req.params.id)
            return res.status(401).json("You Can Only Update Your Own Account");

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await Teacher.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })

        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            message: "cannot upadae user"
        })
    }
};

exports.deleteUser = async (req, res) => {
    try {

        if (req.user.id !== req.params.id) {
            return res.status(401).json("You Can Delete Your Own Account");
        }

        await Teacher.findByIdAndDelete(req.params.id);
        res.clearCookie('token')
        res.status(200)
            .json('User Has been Deleted ')

    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            message: "cannot upadae user"
        })
    }
};



