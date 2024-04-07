const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    ques: {
        type: String,
        trim: true,
        required: true,
    },
    ans : {
        type: String,
        required:true
    },
    options: {
        type: Array,
        required : true
    }
})
module.exports = mongoose.model("Question", questionSchema)