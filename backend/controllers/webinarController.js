
const Webinar = require('../models/webinarModel')

exports.Create = async(req, res) => {
    const {title, description, host, user, name,link, topics, time} = req.body
    const webinar = new Webinar({
        title,
        description,
        host,
        name,
        user,
        topics,
        time,
        link
    })
    
    const saved = await webinar.save();
    console.log(saved);
    return res.status(200).json(saved);
}

exports.Get = async (req, res) => {
    const webinars = await Webinar.find({});
    return res.status(200).json(webinars);
}
