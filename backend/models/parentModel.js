const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    EnrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    marks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marks",
    },
    mode: {
        type: String,
        default: "parent",
    }
});

module.exports = mongoose.model("Parent", parentSchema);