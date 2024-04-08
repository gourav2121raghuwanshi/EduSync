const Resource = require('../models/blogModel');
const {imageUpload} = require("../controllers/fileUpload")
exports.getResource = async (req,res) =>{
    const resources = await Resource.find({});
    return res.json(resources)
}
exports.createResource = async(req, res) =>{
    const {title, description, user, name, image} = req.body;
    const resource = new Resource({
        title,
        description,
        name,
        user,
        image
    })

    console.log(" image is "+ image);
    const savedRes = await resource.save();
    console.log(savedRes);
    return res.status(200).json(savedRes);
}

exports.getBlog = async (req, res) => {
    const id = req.params.id;
    const blog = await Resource.findById(id);
    return res.status(200).json(blog);
}

exports.addReply = async (req, res) => {
    const id = req.params.id;
    const {user, text, name } = req.body;
    const resource = await Resource.findById(id);
    if(resource){
        const obj = {
            user,
            name,
            text,
        }
        resource.replies.push(obj);
        const savedRes = await resource.save();
        console.log(savedRes);
        return res.status(200).json("Replied Successfully");
    }else{
        console.log("Resource Not Found");
        return res.status(404).json("Resource Not Found");
    }
}