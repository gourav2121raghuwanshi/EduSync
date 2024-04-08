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
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/domheydkx/image/upload/v1705905528/gourav/uyb6ntwjcrxacztiw4iv.jpg"
    },
});

module.exports = mongoose.model("Parent", parentSchema);