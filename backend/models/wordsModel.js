const mongoose = require("mongoose")

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        trim: true,
        required: true,
    },
    hints: {
        type: Array,
        required : true
    }
})
module.exports = mongoose.model("Word", wordSchema)