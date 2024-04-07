const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    file: {
        type: String,
    },
    course: [{
      
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }]
})
module.exports = mongoose.model("Assignment", assignmentSchema)


