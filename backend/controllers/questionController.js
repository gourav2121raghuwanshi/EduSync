const Question = require("../models/questionsModel");
const Quiz = require("../models/QuizModel");

exports.addQues = async(req, res) => {
    try{
        const { ques, ans, options } = req.body;
        const {courseId} = req.params;
        const newQues = new Question({ ques, ans, options });
        await newQues.save();
        console.log(courseId);

        const quiz = await Quiz.findOne({courseId : courseId});
        if(!quiz){
            const newquiz = new Quiz({
                courseId : courseId,
                question : newQues
            });
            console.log(newquiz);
            await newquiz.save();
            return res.status(201).json("new",newquiz);
        }
        console.log(quiz);
        quiz?.question.push(newQues);
        await quiz.save();
        return res.status(201).json(newQues);
    }
    catch (err) {
        console.log("Error ", err);
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
}

exports.getQuizById = async (req, res) => {
    try{
        const {courseId} = req.params;
        const questions = await Quiz.find({courseId : courseId});
        console.log(questions);
        return res.status(201).json(questions);
    }
    catch(err){
        console.log("Error ", err);
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
}

exports.getQuesById = async (req, res) => {
    try{
        const {courseId} = req.params;
        const question = await Question.findById(courseId);
        console.log(question);
        return res.status(201).json(question);
    }
    catch(err){
        console.log("Error ", err);
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
}