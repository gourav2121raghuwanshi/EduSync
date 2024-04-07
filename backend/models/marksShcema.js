const mongoose = require("mongoose")

const markSchema = new mongoose.Schema({
    marks: {
        type: Number,
        default:0,
    },
    totalmarks: {
        type: Number,
        default:0,
    },
    course: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Course",
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
    }
})

module.exports = mongoose.model("Marks", markSchema)


