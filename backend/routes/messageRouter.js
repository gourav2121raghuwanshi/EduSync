const express= require('express');
const router=express.Router();
const Chat = require('../models/chatModel')

router.post('/get', async (req, res) => {
    const {course} = req.body;
    const response = await Chat.find({course:course});

    if(response.length==0)return res.json([])
    const messages = response[0].chats;
    return res.json(messages);
})

module.exports=router