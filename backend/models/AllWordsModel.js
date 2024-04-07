const mongoose = require("mongoose")

const allWordsSchema = new mongoose.Schema({
    courseId: {
        type : String,
        required : true
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
    }]
})

module.exports = mongoose.model("AllWord", allWordsSchema);