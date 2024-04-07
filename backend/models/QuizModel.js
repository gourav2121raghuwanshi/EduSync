const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    courseId : {
        type: String,
        required : true
    },    
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    }]
})

module.exports = mongoose.model("Quiz", quizSchema);