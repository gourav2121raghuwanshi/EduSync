const mongoose=require("mongoose")

const resourceSchema =new mongoose.Schema({
   course:{
    type: String,
   },
   chats: [
    {
     user:{
        type:mongoose.Schema.Types.ObjectId,
     },
     name:{
        type:String,
     },
     text:{
        type:String,
     },
     date:{
        type: Date,
        default : Date.now(),
     }
    }
    ],
} , { timestamps: true }
)
module.exports=mongoose.model("Chat",resourceSchema)


