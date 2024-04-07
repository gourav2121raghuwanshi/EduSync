const Word = require("../models/wordsModel");
const AllWord = require("../models/AllWordsModel");
const Course = require('../models/courseModel');

exports.addWord = async(req, res) => {
    try{
        const { word, hints } = req.body;
        const { courseId} = req.params;
        const newWord = new Word({ word, hints });

        await newWord.save();

        const course = await AllWord.findOne({courseId: courseId});
        if(!course){
            return res.status(404).json({
                message: "Course not found"
            });
        }
        course.words?.push(newWord);
        await course.save();
        
        return res.status(201).json(newWord);
    }
    catch (err) {
        console.log("Error ", err);
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
}

exports.getAllWordsById = async(req, res) => {
    try{
        const {courseId} = req.params;
        const course = await AllWord.find({courseId: courseId});
        return res.status(201).json(course);
    }
    catch(err) {
        console.log("Error ", err);
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}
exports.getWordById = async(req, res) => {
    try{
        const {id} = req.params;
        const word = await Word.findById(id);
        if (!word) {
            return res.status(404).json({
                message: "Word not found",
                success: false
            });
        }
        return res.status(201).json(word);
    }
    catch(err) {
        console.log("Error ", err);
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}